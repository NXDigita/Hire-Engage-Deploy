import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";
const TRACKS = [
  "Full-Stack Web Development",
  "AI/ML Engineering",
  "Data Analytics",
  "Cloud & DevOps",
  "Mobile App Development",
  "UI/UX Design",
  "Digital Marketing & Growth",
] as const;

export type CareerRecommendation = {
  recommendedTrack: string;
  fitSummary: string;
  skillGaps: string[];
  nextSteps: string[];
};

function extractJson(text: string): unknown {
  const cleaned = text
    .trim()
    .replace(/^```json\s*/i, "")
    .replace(/\s*```$/, "");

  return JSON.parse(cleaned);
}

export async function createCareerRecommendation(input: {
  apiKey: string;
  skills: string;
  goals: string;
  education: string;
  availability: string;
  preferredTrack: string;
}): Promise<CareerRecommendation> {
  const provider = createOpenAI({
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
    apiKey: input.apiKey,
  });

 const result = await generateText({
    model: provider.chat("gemini-3.7-flash"),
    maxRetries: 3,
   system: `You are NxDigita AI Technologies' career advisor. Follow the Hire · Engage · Deploy model and never describe training as a phase.

Choose exactly one primary internship track from this list:
${TRACKS.join(", ")}.

The candidate's Preferred track is important and should normally be used as the recommended track when it matches one of the available tracks.

Use the candidate's skills, career goals, education, availability, and project experience to explain why the preferred track fits.

Examples:
- Data Analytics: SQL, databases, financial reports, data analysis, Excel, Power BI, Tableau, statistics, dashboards, and data-related projects.
- Full-Stack Web Development: JavaScript, TypeScript, React, HTML, CSS, Node.js, APIs, and web application projects.
- AI/ML Engineering: Python, machine learning, deep learning, NLP, computer vision, and AI projects.
- Cloud & DevOps: AWS, Azure, GCP, Docker, Kubernetes, CI/CD, Linux, and infrastructure.
- Mobile App Development: Flutter, React Native, Android, iOS, Kotlin, Swift, and mobile applications.
- UI/UX Design: Figma, wireframes, UX research, prototypes, interaction design, and interface design.
- Digital Marketing & Growth: SEO, social media, advertising, content marketing, campaigns, and growth analytics.

Do not recommend Full-Stack Web Development merely because the candidate has an Information Technology degree or knows SQL.

Return only valid JSON with this exact shape:
{"recommendedTrack":"one listed track","fitSummary":"2 concise sentences","skillGaps":["item","item","item"],"nextSteps":["item","item","item"]}

Be specific, practical, and encouraging.`,
    prompt: `Education: ${input.education}
Skills: ${input.skills}
Career goals: ${input.goals}
Availability: ${input.availability}
Preferred track: ${input.preferredTrack}`,
  });

  const raw = result.text;
 const parsed = extractJson(raw) as Partial<CareerRecommendation>;

if (
  typeof parsed.recommendedTrack !== "string" ||
  !TRACKS.includes(parsed.recommendedTrack as (typeof TRACKS)[number]) ||
  typeof parsed.fitSummary !== "string" ||
  !Array.isArray(parsed.skillGaps) ||
  !parsed.skillGaps.every((item) => typeof item === "string") ||
  !Array.isArray(parsed.nextSteps) ||
  !parsed.nextSteps.every((item) => typeof item === "string")
) {
  throw new Error("The recommendation was incomplete. Please try again.");
}

const preferredTrack = input.preferredTrack.trim();

const recommendedTrack = TRACKS.includes(
  preferredTrack as (typeof TRACKS)[number],
)
  ? preferredTrack
  : parsed.recommendedTrack;

return {
  recommendedTrack,
  fitSummary: parsed.fitSummary,
  skillGaps: parsed.skillGaps,
  nextSteps: parsed.nextSteps,
};
}
