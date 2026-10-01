import { ArrowUpRight, BadgeCheck } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Reveal } from "./Reveal";

const CARDS = [
  {
    icon: ArrowUpRight,
    title: "Placement-First",
    text: "Every intern completing the program is actively connected with hiring partners from the 250+ MSME & startup network — turning internship work directly into job opportunities.",
  },
  {
    icon: BadgeCheck,
    title: "Certified & Credited",
    text: "Every intern receives an official NxDigita Internship Certificate, credited for their live project contribution — verifiable proof of real, deployed work.",
  },
];

export function PlacementCards() {
  return (
    <section className="bg-surface py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-6 md:grid-cols-2">
          {CARDS.map((card, i) => (
            <Reveal key={card.title} delay={i * 120}>
              <div className="h-full rounded-xl border border-border bg-card p-8 sm:p-10">
                <card.icon className="size-6 text-primary" aria-hidden="true" />
                <h3 className="mt-5 text-2xl font-semibold tracking-tight text-foreground">
                  {card.title}
                </h3>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  {card.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={200}>
          <p className="mt-10 text-center text-sm text-muted-foreground">
            Both outcomes are built into the program —{" "}
            <Link
              to="/signup"
              search={{ mode: "signup" }}
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              start with a free account
            </Link>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}
