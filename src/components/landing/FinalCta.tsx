import { Link } from "@tanstack/react-router";
import { Reveal } from "./Reveal";

export function FinalCta() {
  return (
    <section id="get-started" className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="dark-panel rounded-xl border border-slate-navy px-6 py-16 text-center sm:px-12">
            <h2 className="mx-auto max-w-2xl text-3xl font-bold text-dark-foreground sm:text-4xl">
              Ready to build your verified track record?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-dark-muted">
              Join the program and start shipping live work that hiring partners
              can actually see.
            </p>
            <Link
              to="/signup"
              search={{ mode: "signup" }}
              className="mt-8 inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Sign Up Free
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
