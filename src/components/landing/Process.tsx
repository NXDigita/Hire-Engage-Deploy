import { ClipboardCheck, Rocket, GraduationCap } from "lucide-react";
import { Reveal } from "./Reveal";

/**
 * The core brand motif: Hire · Engage · Deploy.
 * (Formerly Hire · Train · Deploy — training step replaced by live engagement.)
 */
const STEPS = [
  {
    icon: ClipboardCheck,
    step: "01 · HIRE",
    title: "Onboard & Assess",
    text: "AI-assisted skill mapping and role fit for every intern from day one.",
  },
  {
    icon: Rocket,
    step: "02 · ENGAGE",
    title: "Live Project Delivery",
    text: "Interns work on real, in-production software with real users — sprints, standups and code review.",
  },
  {
    icon: GraduationCap,
    step: "03 · DEPLOY",
    title: "Certify & Place",
    text: "A verified internship certificate, then direct introduction to 250+ hiring partners.",
  },
];

export function Process() {
  return (
    <section id="how-it-works" className="bg-surface py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="text-center">
            <p className="text-sm font-medium tracking-wide text-primary">
              THE MODEL
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Hire · Engage · Deploy
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              One connected path from campus to placement — every stage produces
              verifiable evidence of real work.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <Reveal key={step.title} delay={i * 120}>
              <div className="relative h-full rounded-xl border border-border bg-card p-7">
                <div className="flex items-center justify-between">
                  <span className="inline-flex size-11 items-center justify-center rounded-lg border border-border bg-background">
                    <step.icon className="size-5 text-primary" aria-hidden="true" />
                  </span>
                  <span className="text-xs font-medium tracking-[0.2em] text-muted-foreground">
                    {step.step}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.text}
                </p>
                {/* Connector line to next step */}
                {i < STEPS.length - 1 && (
                  <div
                    className="absolute -right-3 top-1/2 hidden h-px w-6 bg-border md:block"
                    aria-hidden="true"
                  />
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
