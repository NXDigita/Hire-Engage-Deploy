import {
  Award,
  Building2,
  Code2,
  Sparkles,
} from "lucide-react";
import { Reveal } from "./Reveal";

const DIFFERENTIATORS = [
  {
    icon: Award,
    title: "Verified certification",
    text: "An official internship certificate credited for real, deployed work.",
  },
  {
    icon: Code2,
    title: "Live production work",
    text: "Every intern builds and ships software with real users — never a sandbox exercise.",
  },
  {
    icon: Building2,
    title: "Direct MSME & startup pipeline",
    text: "A structured path into 250+ employers hiring on demonstrated evidence.",
  },
  {
    icon: Sparkles,
    title: "AI-driven skill assessment",
    text: "Skill mapping and project evaluation that make every contribution verifiable.",
  },
];

export function WhyUs() {
  return (
    <section id="why-us" className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div>
              <p className="text-sm font-medium tracking-wide text-primary">
                WHAT WE ARE
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                What is NxDigita AI Technologies?
              </h2>
              <p className="mt-6 max-w-md leading-relaxed text-muted-foreground">
                An AI &amp; talent-tech company running hands-on internships where
                every intern builds and ships a live production project — then
                enters a placement pipeline of MSMEs and startups hiring on
                evidence, not just resumes.
              </p>
            </div>
          </Reveal>

          <div>
            <p className="text-sm font-medium tracking-wide text-primary">WHY NXDIGITA</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Built for outcomes
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {DIFFERENTIATORS.map((item, i) => (
                <Reveal key={item.title} delay={i * 80}>
                  <div className="h-full rounded-lg border border-border bg-card p-5">
                    <item.icon className="size-5 text-primary" aria-hidden="true" />
                    <h3 className="mt-3 text-sm font-semibold text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {item.text}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
