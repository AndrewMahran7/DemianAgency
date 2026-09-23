import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { AgencyContactStrip, ExistingCustomerCTA, QuoteActions } from "@/components/demian/insurance-conversion";
import { TrackedLink } from "@/components/demian/analytics-link";
import { MotionReveal } from "@/components/demian/motion-reveal";
import { SiteFooter } from "@/components/demian/site-footer";
import { SiteHeader } from "@/components/demian/site-header";
import { insuranceLines } from "@/lib/insurance";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Insurance Coverage | Demian Insurance Agency",
  description: "Explore Florida auto, home, life, and small-business insurance with direct carrier relationships and broader market access where available.",
  path: "/insurance",
});

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
          <MotionReveal className="overview-approach-intro">
            <p className="eyebrow light"><span /> One agency / Two paths</p>
            <h2>The market path should fit the risk.</h2>
            <p>Every conversation begins with Demian Insurance Agency. From there, the coverage need determines how the agency reaches the market.</p>
            <p className="overview-origin"><span aria-hidden="true">D</span><strong>One agency relationship guiding both paths.</strong></p>
          </MotionReveal>

          <div className="overview-market-paths">
            <MotionReveal className="overview-market-path" delay={0.06}>
              <div className="overview-path-heading"><span>01 / Dedicated relationship</span><strong>Select personal lines</strong></div>
              <p>A direct carrier relationship for select personal insurance needs.</p>
              <ul>
                <li><span>Standard personal auto</span><small>For eligible Florida drivers and households</small></li>
                <li><span>Renters</span><small>Personal property and liability conversations</small></li>
                <li><span>Umbrella</span><small>Additional personal liability options</small></li>
              </ul>
            </MotionReveal>

            <MotionReveal className="overview-market-path" delay={0.12}>
              <div className="overview-path-heading"><span>02 / Broader market access</span><strong>Multiple carrier options</strong></div>
              <p>Broader access where the coverage need calls for more than one place to look.</p>
              <ul>
                <li><span>Home</span><small>Multiple Florida carriers</small></li>
                <li><span>Life</span><small>Multiple carriers</small></li>
                <li><span>Special-risk auto</span><small>Independent brokerage options may be available</small></li>
              </ul>
            </MotionReveal>
          </div>
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
          <div><p>A short first-contact request gives the agency enough context to begin the right conversation without turning the website into a full insurance application.</p><TrackedLink event="quote_cta_click" properties={{ location: "insurance_page" }} className="button button-light" href="/request-quote">Start a Quote Request <ArrowRight aria-hidden="true" size={18} /></TrackedLink></div>
        </section>

        <AgencyContactStrip />
        <ExistingCustomerCTA />
      </main>
      <SiteFooter />
    </>
  );
}
