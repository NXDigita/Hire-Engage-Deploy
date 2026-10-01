import { Reveal } from "./Reveal";

const STOPS = ["College", "Onboarding", "Live Project", "Certified", "Corporate"];

export function Journey() {
  return (
    <section className="bg-surface py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="text-center">
            <p className="text-sm font-medium tracking-wide text-primary">
              THE BRIDGE
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              College to Corporate
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Built to give graduates from Tier 2 and Tier 3 cities the same direct
              path into product companies — through shipped work, not referrals.
            </p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <ol className="relative mt-16 flex flex-col gap-8 md:flex-row md:items-start md:gap-0">
            {/* connecting line (desktop) */}
            <div
              className="absolute left-0 right-0 top-[9px] hidden h-px bg-border md:block"
              aria-hidden="true"
            />
            {STOPS.map((stop, i) => (
              <li
                key={stop}
                className="relative flex items-center gap-4 md:flex-1 md:flex-col md:text-center"
              >
                <span
                  className={
                    "relative z-10 inline-flex size-[19px] shrink-0 items-center justify-center rounded-full border-2 " +
                    (i === STOPS.length - 1
                      ? "border-primary bg-primary"
                      : "border-primary/60 bg-background")
                  }
                >
                  {i === STOPS.length - 1 && (
                    <span className="size-1.5 rounded-full bg-primary-foreground" />
                  )}
                </span>
                <div className="md:mt-4">
                  <p className="text-sm font-semibold text-foreground">{stop}</p>
                  <p className="text-xs text-muted-foreground">
                    Step {i + 1} of {STOPS.length}
                  </p>
                </div>
                {/* connecting line (mobile) */}
                {i < STOPS.length - 1 && (
                  <span
                    className="h-px w-10 flex-1 bg-border md:hidden"
                    aria-hidden="true"
                  />
                )}
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
