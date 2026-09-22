import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { AgencyContactStrip, ExistingCustomerCTA, QuoteActions } from "@/components/demian/insurance-conversion";
import { MotionReveal } from "@/components/demian/motion-reveal";
import { SiteFooter } from "@/components/demian/site-footer";
import { SiteHeader } from "@/components/demian/site-header";
import { insuranceLines } from "@/lib/insurance";

export const metadata: Metadata = {
  title: "Insurance Coverage | Demian Insurance Agency",
  description: "Explore personal auto, home, life, and small-business insurance guidance from Demian Insurance Agency in Florida.",
};

const lines = Object.values(insuranceLines);

export default function InsurancePage() {
  return (
    <>
      <SiteHeader />
      <main className="insurance-overview">
        <section className="insurance-overview-hero">
          <MotionReveal immediate>
            <p className="eyebrow"><span /> Insurance</p>
            <h1>Coverage for the things you&apos;ve worked to build.</h1>
          </MotionReveal>
          <MotionReveal className="overview-hero-aside" delay={0.08} immediate>
            <p>Start with the part of your life or business that needs attention. Each conversation is shaped around the people, property, responsibilities, and circumstances behind the policy.</p>
            <QuoteActions label="Request a Quote" />
          </MotionReveal>
        </section>

        <section className="overview-approach">
          <p>One agency. Different ways to reach the right market.</p>
          <h2>Dedicated carrier relationships where appropriate. Broader market access where available.</h2>
        </section>

        <section className="overview-lines" aria-label="Insurance categories">
          {lines.map((line, index) => (
            <MotionReveal className="overview-line-reveal" delay={index * 0.05} key={line.key}>
              <Link className="overview-line" href={line.href}>
                <span className="overview-line-index">0{index + 1}</span>
                <div className="overview-line-title"><p>{line.audience}</p><h2>{line.name}</h2></div>
                <p className="overview-line-summary">{line.summary}</p>
                <span className="overview-line-arrow" aria-hidden="true"><ArrowUpRight size={19} /></span>
              </Link>
            </MotionReveal>
          ))}
        </section>

        <section className="overview-decision">
          <div><p className="eyebrow light"><span /> Not sure where to begin?</p><h2>Tell us what you need to protect.</h2></div>
          <div><p>A short first-contact request gives the agency enough context to begin the right conversation without turning the website into a full insurance application.</p><Link className="button button-light" href="/request-quote">Start a Quote Request <ArrowRight aria-hidden="true" size={18} /></Link></div>
        </section>

        <AgencyContactStrip />
        <ExistingCustomerCTA />
      </main>
      <SiteFooter />
    </>
  );
}
