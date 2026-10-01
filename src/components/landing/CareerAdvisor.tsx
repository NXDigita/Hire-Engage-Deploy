import { useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Compass, Loader2 } from "lucide-react";
import { Reveal } from "./Reveal";

function renderInline(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i} className="font-semibold text-foreground">{part.slice(2, -2)}</strong>
    ) : (
      part
    ),
  );
}

function Markdown({ text }: { text: string }) {
  return (
    <div className="space-y-2 text-sm leading-relaxed text-muted-foreground">
      {text.split("\n").map((line, i) => {
        const t = line.trim();
        if (!t) return null;
        if (t.startsWith("#")) {
          return (
            <h3 key={i} className="pt-3 text-base font-bold text-foreground first:pt-0">
              {t.replace(/^#+\s*/, "")}
            </h3>
          );
        }
        const bullet = t.match(/^([-*]|\d+\.)\s+(.*)$/);
        if (bullet) {
          return (
            <div key={i} className="flex gap-2 pl-1">
              <span className="shrink-0 font-semibold text-primary">
                {/^\d/.test(bullet[1] ?? "") ? bullet[1] : "•"}
              </span>
              <span>{renderInline(bullet[2] ?? "")}</span>
            </div>
          );
        }
        return <p key={i}>{renderInline(t)}</p>;
      })}
    </div>
  );
}

export function CareerAdvisor() {
  const [skills, setSkills] = useState("");
  const [goals, setGoals] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setOutput("");
    setError("");
    try {
      const res = await fetch("/api/recommend", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ skills, goals }),
      });
      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Something went wrong. Please try again.");
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let text = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        text += decoder.decode(value, { stream: true });
        const idx = text.indexOf("[[ERROR]]");
        if (idx >= 0) {
          setOutput(text.slice(0, idx).trim());
          setError(text.slice(idx + 9));
        } else setOutput(text);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  const field =
    "mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring";

  return (
    <section id="career-advisor" className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-soft-orange px-3 py-1 text-xs font-semibold text-primary">
              <Compass className="size-3.5" /> AI Career Advisor
            </span>
            <h2 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl">
              Find your internship track in seconds
            </h2>
            <p className="mt-3 text-muted-foreground">
              Tell us what you know and where you want to go. We'll recommend tracks and clear next steps.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <form onSubmit={submit} className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <label className="block text-sm font-semibold text-foreground">
              Your skills
              <textarea
                required
                rows={4}
                maxLength={2000}
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="e.g. Python, basic React, SQL, built a college attendance app"
                className={field}
              />
            </label>
            <label className="mt-5 block text-sm font-semibold text-foreground">
              Your career goals
              <textarea
                required
                rows={4}
                maxLength={2000}
                value={goals}
                onChange={(e) => setGoals(e.target.value)}
                placeholder="e.g. Become a backend engineer at a product startup within a year"
                className={field}
              />
            </label>
            <button
              type="submit"
              disabled={loading || skills.trim().length < 3 || goals.trim().length < 3}
              className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
            >
              {loading && <Loader2 className="size-4 animate-spin" />}
              {loading ? "Analyzing your profile…" : "Get my recommendations"}
            </button>
          </form>

          <div className="flex flex-col rounded-xl border border-border bg-card p-6 shadow-sm" aria-live="polite">
            {output ? (
              <Markdown text={output} />
            ) : loading ? (
              <div className="flex flex-1 items-center justify-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="size-4 animate-spin" /> Matching you with tracks…
              </div>
            ) : !error ? (
              <div className="flex flex-1 items-center justify-center text-center text-sm text-muted-foreground">
                Your personalized tracks and next steps will appear here.
              </div>
            ) : null}
            {error && <p className="mt-3 rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</p>}
            {output && !loading && (
              <Link
                to="/signup"
                search={{ mode: "signup" }}
                className="mt-6 inline-flex h-10 items-center justify-center self-start rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                Start this track — Sign Up Free
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
