import { Check } from "lucide-react";
import { Reveal } from "./Reveal";

const POINTS = [
  "Interns ship software deployed to a public URL, with real users",
  "Team-based delivery — sprints, code review, standups",
  "Mentored by practising engineers throughout",
  "Portfolio-ready work interns can show and explain",
];

export function LiveProjects() {
  return (
    <section id="live-projects" className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div>
              <p className="text-sm font-medium tracking-wide text-primary">
                PRODUCT
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Live Projects, Not Simulations
              </h2>
              <ul className="mt-8 space-y-4">
                {POINTS.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/15">
                      <Check className="size-3 text-primary" aria-hidden="true" />
                    </span>
                    <span className="text-[15px] leading-relaxed text-foreground/90">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <CodeVisual />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/** Deployment-pipeline style visual. */
function CodeVisual() {
  const lines: { prompt?: boolean; text: string; dim?: boolean }[] = [
    { prompt: true, text: "git push origin intern/payment-service" },
    { text: "→ CI: tests passed (48/48) · lint clean", dim: true },
    { text: "→ review approved by senior engineer", dim: true },
    { prompt: true, text: "nx deploy --env production" },
    { text: "✓ live at https://app.partner-msme.in", dim: true },
    { text: "✓ contribution credited to intern record", dim: true },
  ];

  return (
    <div className="dark-panel overflow-hidden rounded-xl border border-slate-navy shadow-2xl">
      <div className="flex items-center gap-1.5 border-b border-dark-foreground/10 px-4 py-3">
        <span className="size-2.5 rounded-full bg-primary" />
        <span className="size-2.5 rounded-full bg-cyan" />
        <span className="size-2.5 rounded-full bg-dark-muted/40" />
        <span className="ml-3 font-mono text-[11px] text-dark-muted">
          intern@nxdigita — deploy
        </span>
      </div>
      <div className="space-y-2.5 p-5 font-mono text-[12.5px] leading-relaxed sm:text-[13px]">
        {lines.map((line, i) => (
          <p key={i} className={line.dim ? "text-dark-muted" : "text-dark-foreground"}>
            {line.prompt && <span className="mr-2 text-glow">$</span>}
            {line.text}
          </p>
        ))}
      </div>
    </div>
  );
}
