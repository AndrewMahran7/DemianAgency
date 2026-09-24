import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, HeartHandshake, Users } from "lucide-react";
import { AgencyContactStrip, ExistingCustomerCTA, QuoteActions } from "@/components/demian/insurance-conversion";
import { TrackedLink } from "@/components/demian/analytics-link";
import { MotionReveal } from "@/components/demian/motion-reveal";
import { SiteFooter } from "@/components/demian/site-footer";
import { SiteHeader } from "@/components/demian/site-header";
import { StructuredData } from "@/components/demian/structured-data";
import { lifeInsurance } from "@/lib/insurance";
import { createInsuranceServiceSchema, createPageMetadata } from "@/lib/seo";
import { minaDemian } from "@/lib/team";

const description = "Florida life insurance guidance through multiple carriers, including term, whole, universal, final expense, and key-person or business life coverage.";

export const metadata: Metadata = createPageMetadata({
  title: "Florida Life Insurance | Demian Insurance Agency",
  description,
  path: "/insurance/life",
});

export default function LifePage() {
  return (
    <>
      <SiteHeader />
      <main className="insurance-line life-page">
        <section className="life-hero">
          <MotionReveal className="life-hero-copy" immediate>
            <p className="eyebrow"><span /> Life insurance</p>
            <h1>Protect the people who depend on you.</h1>
            <p>Life insurance begins with responsibility, continuity, and the plans that should remain possible. The policy conversation comes after understanding who and what relies on you.</p>
            <QuoteActions label={lifeInsurance.quoteLabel} line="Life" />
          </MotionReveal>
          <MotionReveal className="life-hero-image" delay={0.1} immediate>
            <div className="line-hero-photo life-insurance-photo">
              <Image src={lifeInsurance.imageSrc} alt={lifeInsurance.imageAlt} fill priority sizes="(max-width: 760px) 100vw, 78vw" />
            </div>
          </MotionReveal>
        </section>

        <section className="life-family">
          <MotionReveal className="life-family-portrait">
            <Image src={minaDemian.portrait} alt={minaDemian.portraitAlt} fill sizes="(max-width: 760px) 100vw, 34vw" />
          </MotionReveal>
          <MotionReveal className="life-family-copy" delay={0.08}>
            <p className="eyebrow light"><span /> Family owned and operated</p>
            <h2>Clarity is part of taking care of people.</h2>
            <p>As a husband and father, Mina approaches life-insurance conversations with the education and care he would want for his own family: understand what the coverage means, consider the wider picture, and make an informed decision without pressure.</p>
            <p>This is agency philosophy—not a substitute for legal, tax, or financial advice.</p>
          </MotionReveal>
        </section>

        <section className="life-dependents section">
          <MotionReveal className="life-dependents-question">
            <Users aria-hidden="true" size={25} />
            <p className="eyebrow"><span /> Begin with people</p>
            <h2>Who depends on the life you are building?</h2>
          </MotionReveal>
          <div className="life-dependents-copy">
            <p>A spouse or partner. Children. Aging parents. A business partner. Employees whose work depends on continuity. The right starting point is not a product name—it is a clear view of the responsibilities that would continue.</p>
            <TrackedLink event="quote_cta_click" properties={{ location: "life_page", insuranceType: "Life" }} className="text-link" href="/request-quote?type=Life">Start a Life Insurance Conversation <span aria-hidden="true">↗</span></TrackedLink>
          </div>
        </section>

        <section className="life-needs">
          <MotionReveal className="life-needs-intro">
            <p className="eyebrow light"><span /> Needs analysis</p>
            <h2>Look beyond the asset being insured.</h2>
            <p>A needs analysis can consider the wider family and asset-protection picture without turning this page into a financial-planning calculator.</p>
          </MotionReveal>
          <div className="life-needs-map">
            {lifeInsurance.needs.map((need, index) => <MotionReveal delay={index * 0.055} key={need}><span>0{index + 1}</span><strong>{need}</strong></MotionReveal>)}
          </div>
        </section>

        <section className="life-products section">
          <MotionReveal className="life-products-heading"><HeartHandshake aria-hidden="true" size={25} /><p className="eyebrow"><span /> Policy conversations</p><h2>Different structures for different needs.</h2><p>Demian works with multiple life insurance carriers. Product suitability and availability depend on the customer, carrier, underwriting, and policy terms.</p></MotionReveal>
          <ol className="life-product-list">
            {lifeInsurance.products.map((product, index) => <MotionReveal delay={index * 0.05} key={product}><li><strong>{product}</strong></li></MotionReveal>)}
          </ol>
        </section>

        <section className="life-coordination">
          <div><p className="eyebrow"><span /> When the conversation extends further</p><h2>Coordinate expertise where appropriate.</h2></div>
          <div><p>When planning extends into broader financial or estate considerations, the agency can coordinate with a financial-advisor partner where appropriate. Demian does not present that coordination as legal, tax, or financial advice.</p></div>
        </section>

        <section className="line-final-cta life-final-cta">
          <div><p className="eyebrow light"><span /> A thoughtful first step</p><h2>Start with the people and plans behind the policy.</h2></div>
          <div><p>Share what has you considering life insurance and begin a personal conversation.</p><TrackedLink event="quote_cta_click" properties={{ location: "life_page", insuranceType: "Life" }} className="button button-light" href="/request-quote?type=Life">Request a Life Insurance Quote <ArrowRight aria-hidden="true" size={18} /></TrackedLink></div>
        </section>
        <AgencyContactStrip />
        <ExistingCustomerCTA />
      </main>
      <StructuredData data={createInsuranceServiceSchema("Florida Life Insurance", description, "/insurance/life")} />
      <SiteFooter />
    </>
  );
}
