import { Link } from "@tanstack/react-router";
import { BadgeCheck } from "lucide-react";
import { Reveal } from "./Reveal";

const TRUST_CHIPS = [
  "250+ Hiring Partners",
  "100% Live Project Experience",
  "1 Verified Internship Certificate Each",
];

export function Hero() {
  return (
    <section className="dark-panel relative overflow-hidden pt-16">
      <div className="bg-grid absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-4 pb-10 pt-12 sm:px-6 sm:pb-16 sm:pt-24 lg:pb-24">
        <div className="grid items-center gap-8 sm:gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/35 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary">
                <span className="size-1.5 rounded-full bg-primary" aria-hidden="true" />
                Internship-to-placement platform for engineering graduates
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="text-4xl font-extrabold leading-[1.08] text-dark-foreground sm:text-5xl lg:text-[3.6rem]">
                Real Internships. Live Projects.{" "}
                <span className="text-gradient-accent">
                  Real Placements.
                </span>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-dark-muted">
                NxDigita AI Technologies connects engineering graduates to 250+ MSME
                and startup hiring partners through live, shipped work — not
                simulations.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  to="/signup"
                  search={{ mode: "signup" }}
                  className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Sign Up Free
                </Link>
                <a
                  href="#how-it-works"
                  className="inline-flex h-11 items-center justify-center rounded-md border border-dark-foreground/20 px-6 text-sm font-medium text-dark-foreground transition-colors hover:border-cyan/60 hover:bg-cyan/10"
                >
                  See How It Works
                </a>
              </div>
            </Reveal>
            <Reveal delay={320}>
              <div className="mt-8 hidden flex-wrap gap-x-2 gap-y-2 border-t border-dark-foreground/10 pt-6 sm:flex">
                {TRUST_CHIPS.map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full border border-dark-foreground/10 bg-dark-foreground/5 px-3 py-1 text-xs font-medium text-dark-muted"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={200}>
              <HeroVisual />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Stylized certificate + deploy visual — no stock photography. */
function HeroVisual() {
  return (
    <div className="hero-orbits relative mx-auto h-60 w-full max-w-md rounded-full sm:aspect-square sm:h-auto">
      {/* Terminal / deploy card behind */}
      <div
        className="absolute right-0 top-2 hidden w-64 rounded-lg border border-dark-foreground/10 bg-charcoal p-4 font-mono text-[11px] leading-relaxed text-dark-muted shadow-xl sm:block"
        aria-hidden="true"
      >
        <div className="mb-2 flex gap-1.5">
          <span className="size-2 rounded-full bg-muted-foreground/40" />
          <span className="size-2 rounded-full bg-muted-foreground/40" />
          <span className="size-2 rounded-full bg-muted-foreground/40" />
        </div>
        <p>
          <span className="text-glow">$</span> nx deploy --production
        </p>
        <p className="mt-1">✓ build passed in 14.2s</p>
        <p>✓ shipped to live URL</p>
        <p>
          <span className="text-primary">✓ verified contribution logged</span>
        </p>
      </div>

      {/* Verified certificate card in front */}
      <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 rounded-xl border border-dark-foreground/15 bg-slate-navy p-5 shadow-2xl sm:inset-x-8 sm:p-6">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold text-dark-foreground">
            NxDigita AI Technologies
          </p>
          <span className="rounded-full border border-primary/40 px-2.5 py-0.5 text-[10px] font-medium text-primary">
            Verified
          </span>
        </div>
        <p className="mt-6 font-heading text-3xl font-bold text-dark-foreground">Aarav Sharma</p>
        <p className="mt-1 text-sm text-dark-muted">
          Live Project Contribution — Credited
        </p>
        <div className="mt-6 flex items-center justify-between border-t border-dark-foreground/10 pt-4 text-[11px] text-dark-muted">
          <span className="font-mono tracking-wider">CRED ID · NX-2026-AI-9482</span>
          <span className="inline-flex items-center gap-1 text-primary">
            <BadgeCheck className="size-3.5" aria-hidden="true" />
            Certified
          </span>
        </div>
      </div>
    </div>
  );
}
