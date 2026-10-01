import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/landing/Nav";
import { Hero } from "@/components/landing/Hero";
import { WhyUs } from "@/components/landing/WhyUs";
import { Process } from "@/components/landing/Process";
import { LiveProjects } from "@/components/landing/LiveProjects";
import { Journey } from "@/components/landing/Journey";
import { Partners } from "@/components/landing/Partners";
import { PlacementCards } from "@/components/landing/PlacementCards";
import { Metrics } from "@/components/landing/Metrics";
import { CertificateShowcase } from "@/components/landing/CertificateShowcase";
import { CareerAdvisor } from "@/components/landing/CareerAdvisor";
import { FinalCta } from "@/components/landing/FinalCta";
import { Footer } from "@/components/landing/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "NxDigita AI Technologies — Real Internships. Real Placements.",
      },
      {
        name: "description",
        content:
          "NxDigita AI Technologies connects engineering graduates to 250+ MSME and startup hiring partners through live, shipped work — Hire · Engage · Deploy.",
      },
      {
        property: "og:title",
        content: "NxDigita AI Technologies — Real Internships. Real Placements.",
      },
      {
        property: "og:description",
        content:
          "Live internships where every graduate ships real production work, earns a verified certificate, and enters a 250+ MSME & startup placement pipeline.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main>
        <Hero />
        <WhyUs />
        <Process />
        <LiveProjects />
        <Journey />
        <Partners />
        <PlacementCards />
        <Metrics />
        <CertificateShowcase />
        <CareerAdvisor />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
