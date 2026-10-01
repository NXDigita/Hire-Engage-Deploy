import { useEffect, useRef, useState } from "react";
import { BrainCircuit, Target, UserCheck } from "lucide-react";
import { Reveal } from "./Reveal";

const STATS = [
  { value: 250, suffix: "+", label: "Hiring Partners" },
  { value: 100, suffix: "%", label: "Live Project Experience" },
  { value: 1, suffix: "", label: "Verified Certificate Each" },
  // Placeholder figure — confirm the real number of interns placed.
  { value: 500, suffix: "+", label: "Interns Placed" },
];

const AI_POINTS = [
  {
    icon: Target,
    title: "Skill mapping",
    text: "AI-assisted assessment places every intern in the role where they'll contribute fastest.",
  },
  {
    icon: BrainCircuit,
    title: "Project evaluation",
    text: "Contributions are scored on real outcomes, making the certificate trustworthy evidence.",
  },
  {
    icon: UserCheck,
    title: "Hiring-partner matching",
    text: "The platform pairs interns with employers whose live needs match demonstrated skills.",
  },
];

export function Metrics() {
  return (
    <section className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 90}>
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <Counter value={stat.value} suffix={stat.suffix} />
                <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={150}>
          <div className="mt-16 rounded-xl border border-border bg-card p-8 sm:p-10">
            <p className="text-sm font-medium tracking-wide text-primary">
              POWERED BY AI
            </p>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
              The evaluation framework, in plain language
            </h3>
            <div className="mt-8 grid gap-8 sm:grid-cols-3">
              {AI_POINTS.map((point) => (
                <div key={point.title}>
                  <point.icon className="size-5 text-primary" aria-hidden="true" />
                  <h4 className="mt-3 text-sm font-semibold text-foreground">
                    {point.title}
                  </h4>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {point.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        const duration = 1200;
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplay(Math.round(eased * value));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <p
      ref={ref}
      className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl"
    >
      {display}
      <span className="text-gradient-accent">{suffix}</span>
    </p>
  );
}
