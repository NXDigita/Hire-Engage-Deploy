import { Building2, Search, Users, BriefcaseBusiness } from "lucide-react";
import { Reveal } from "./Reveal";

const POINTS = [
  {
    icon: Building2,
    text: "Direct placement pipeline into 250+ MSME & startup employers",
  },
  {
    icon: Search,
    text: "Interns get discovered through demonstrated, verifiable work",
  },
  {
    icon: Users,
    text: "Structured introductions and interview opportunities",
  },
  {
    icon: BriefcaseBusiness,
    text: "Employers hire on evidence, not just resumes",
  },
];

// Placeholder marks — swap for real partner logos when available.
const LOGO_PLACEHOLDERS = [
  "PARTNER",
  "MSME CORP",
  "STARTUP X",
  "TECHFIRM",
  "CLOUDBASE",
  "DATANEST",
];

export function Partners() {
  return (
    <section id="partners" className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div>
              <p className="text-sm font-medium tracking-wide text-primary">
                NETWORK
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                <span className="text-5xl font-semibold text-gradient-accent sm:text-6xl">
                  250+
                </span>
                <br />
                MSME &amp; Startup Hiring Partners
              </h2>
              <p className="mt-6 max-w-md leading-relaxed text-muted-foreground">
                A live hiring network that watches the work, not the resume. Every
                shipped project is visible to employers looking for exactly that
                skill.
              </p>
            </div>
          </Reveal>

          <div className="space-y-4">
            {POINTS.map((point, i) => (
              <Reveal key={point.text} delay={i * 80}>
                <div className="flex items-start gap-4 rounded-lg border border-border bg-card p-4">
                  <point.icon
                    className="mt-0.5 size-5 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  <p className="text-[15px] leading-relaxed text-foreground/90">
                    {point.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={150}>
          <div className="mt-16">
            <p className="text-center text-xs font-medium tracking-[0.2em] text-muted-foreground">
              HIRING FROM NETWORKS LIKE
            </p>
            <div className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-6">
              {LOGO_PLACEHOLDERS.map((mark) => (
                <div
                  key={mark}
                  className="flex h-14 items-center justify-center rounded-md border border-border bg-card text-[10px] font-semibold tracking-[0.15em] text-muted-foreground/50"
                >
                  {mark}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
