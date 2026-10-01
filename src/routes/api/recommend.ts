import { createFileRoute } from "@tanstack/react-router";
import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";
import { z } from "zod";

const Input = z.object({
  skills: z.string().trim().min(3).max(2000),
  goals: z.string().trim().min(3).max(2000),
});

const SYSTEM = `You are the career advisor for NxDigita AI Technologies, an internship-to-placement program following the Hire · Engage · Deploy model (never mention "training" as a phase). Interns ship live production work and get placed with 250+ MSME and startup partners.
Available tracks: Full-Stack Web Development, AI/ML Engineering, Data Analytics, Cloud & DevOps, Mobile App Development, UI/UX Design, Digital Marketing & Growth.
Given a candidate's skills and goals, reply in concise Markdown (under 300 words):
## Recommended tracks — top 2-3 tracks, each with one line on why it fits.
## Skill gaps — 3 short bullets.
## Next steps — 3-4 numbered, concrete actions (include "Sign up and take the onboarding assessment").
Be warm, specific, and practical.`;

export const Route = createFileRoute("/api/recommend")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const parsed = Input.safeParse(await request.json().catch(() => null));
        if (!parsed.success) {
          return Response.json({ error: "Please describe your skills and goals in a bit more detail." }, { status: 400 });
        }
        const apiKey = process.env['GEMINI_API_KEY'];
        if (!apiKey) return Response.json({ error: "AI is not configured." }, { status: 500 });

        const provider = createOpenAI({
          baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
          apiKey,
        });

        let upstreamError: unknown;
        const result = streamText({
          model: provider.chat("gemini-3.8-flash"),
          system: SYSTEM,
          prompt: `Skills:\n${parsed.data.skills}\n\nCareer goals:\n${parsed.data.goals}`,
          abortSignal: request.signal,
          providerOptions: {
            openai: {
              forceReasoning: true,
              reasoningEffort: "low",
              reasoningSummary: "auto",
              store: false,
              include: ["reasoning.encrypted_content"],
            },
          },
          onError: ({ error }) => {
            upstreamError = error;
            console.error(error);
          },
        });

        const encoder = new TextEncoder();
        const stream = new ReadableStream({
          async start(controller) {
            try {
              for await (const chunk of result.textStream) controller.enqueue(encoder.encode(chunk));
              if (upstreamError) {
                const status = (upstreamError as { statusCode?: number }).statusCode;
                const msg =
                  status === 429
                    ? "Too many requests right now — please try again in a minute."
                    : status === 402
                      ? "AI credits are exhausted. Please try again later."
                      : "Something went wrong generating recommendations.";
                controller.enqueue(encoder.encode(`\n\n[[ERROR]]${msg}`));
              }
            } catch {
              controller.enqueue(encoder.encode("\n\n[[ERROR]]Something went wrong generating recommendations."));
            } finally {
              controller.close();
            }
          },
        });
        return new Response(stream, { headers: { "content-type": "text/plain; charset=utf-8" } });
      },
    },
  },
});
