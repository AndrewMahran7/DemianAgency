import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, BarChart3, BriefcaseBusiness, Building2, Network } from "lucide-react";
import { AgencyContactStrip, ExistingCustomerCTA, QuoteActions } from "@/components/demian/insurance-conversion";
import { TrackedLink } from "@/components/demian/analytics-link";
import { MotionReveal } from "@/components/demian/motion-reveal";
import { SiteFooter } from "@/components/demian/site-footer";
import { SiteHeader } from "@/components/demian/site-header";
import { StructuredData } from "@/components/demian/structured-data";
import { businessInsurance } from "@/lib/insurance";
import { createInsuranceServiceSchema, createPageMetadata } from "@/lib/seo";

const description = "Florida small-business insurance guidance for general liability, property, commercial auto, workers' compensation, E&O, cyber, BOP, umbrella, and EPLI.";

export const metadata: Metadata = createPageMetadata({
  title: "Florida Business Insurance | Demian Insurance Agency",
  description,
  path: "/insurance/business",
});

export default function BusinessPage() {
  return (
    <>
      <SiteHeader />
      <main className="insurance-line business-page">
        <section className="line-hero business-hero">
          <MotionReveal className="business-hero-copy" immediate>
            <p className="eyebrow light"><span /> Business insurance</p>
            <h1>Look at the business as a whole before looking at the policy.</h1>
            <p>A contractor, restaurant, medical office, professional firm, and real-estate business operate differently. The coverage conversation should begin by understanding the operation behind the name.</p>
            <QuoteActions label={businessInsurance.quoteLabel} line="Business" />
          </MotionReveal>
          <MotionReveal className="business-hero-visual" delay={0.08} immediate>
            <div className="line-hero-photo business-hero-photo">
              <Image src={businessInsurance.imageSrc} alt={businessInsurance.imageAlt} fill priority sizes="(max-width: 1280px) 100vw, 48vw" />
            </div>
          </MotionReveal>
        </section>

        <section className="business-exposures section">
          <MotionReveal className="business-exposures-heading"><Network aria-hidden="true" size={26} /><p className="eyebrow"><span /> Understand the operation</p><h2>Six places to begin the conversation.</h2><p>These are discussion areas—not underwriting conclusions. The relevant insurance categories depend on the business and carrier terms.</p></MotionReveal>
          <div className="business-exposure-grid">
            {businessInsurance.exposures.map((exposure, index) => <MotionReveal delay={index * 0.05} key={exposure}><span>0{index + 1}</span><strong>{exposure}</strong></MotionReveal>)}
          </div>
        </section>

        <section className="business-coverages">
          <MotionReveal className="business-coverages-title">
            <p className="eyebrow light"><span /> Commercial coverage categories</p>
            <h2>Build the conversation around the business—not a generic checklist.</h2>
          </MotionReveal>
          <div className="business-coverage-grid">
            {businessInsurance.products.map((product, index) => <MotionReveal className={`business-coverage${"secondary" in product ? " is-secondary" : ""}`} delay={index * 0.035} key={product.name}><small>{String(index + 1).padStart(2, "0")}</small><BriefcaseBusiness aria-hidden="true" size={18} /><strong>{product.name}</strong><p>{product.description}</p></MotionReveal>)}
          </div>
          <p className="business-coverage-note">Availability, eligibility, limits, exclusions, and policy terms vary by business and carrier.</p>
        </section>

        <section className="business-industries section">
          <MotionReveal className="business-industries-intro"><Building2 aria-hidden="true" size={25} /><p className="eyebrow"><span /> Small-business focus</p><h2>Different operations bring different exposures.</h2><p>Examples of businesses Demian can help protect include the following. This is not an exclusive list or a claim of specialized industry expertise.</p></MotionReveal>
          <div className="business-industry-list">{businessInsurance.industries.map((industry, index) => <MotionReveal delay={index * 0.05} key={industry}><span>0{index + 1}</span><strong>{industry}</strong></MotionReveal>)}</div>
        </section>

        <section className="business-perspective">
          <MotionReveal className="business-perspective-mark"><BarChart3 aria-hidden="true" size={29} /><span>Insurance + small-business perspective</span></MotionReveal>
          <MotionReveal className="business-perspective-copy" delay={0.08}>
            <p className="eyebrow light"><span /> A broader view</p>
            <h2>Experience from both insurance and small-business advisory environments.</h2>
            <p>Mina&apos;s prior work spans small-business consulting, insurance, employee-benefits consulting, and client advisory roles. That background informs a holistic conversation about the business, but Demian Insurance Agency does not currently offer employee benefits or management consulting.</p>
          </MotionReveal>
        </section>

        <section className="business-review section">
          <div><p className="eyebrow"><span /> Review the whole operation</p><h2>Changes in the business can change the insurance conversation.</h2></div>
          <div><p>New property, vehicles, employees, services, customer interactions, contracts, or digital dependencies may create new questions. A review is an opportunity to understand what changed and what insurance categories may be relevant.</p><TrackedLink event="quote_cta_click" properties={{ location: "business_page", insuranceType: "Business" }} className="text-link" href="/request-quote?type=Business">Talk About Your Business <span aria-hidden="true">↗</span></TrackedLink></div>
        </section>

        <section className="line-final-cta business-final-cta">
          <div><p className="eyebrow light"><span /> Start with the operation</p><h2>Bring the full business into view.</h2></div>
          <div><p>Share what the business does, where it operates, and what has changed.</p><TrackedLink event="quote_cta_click" properties={{ location: "business_page", insuranceType: "Business" }} className="button button-light" href="/request-quote?type=Business">Request a Business Quote <ArrowRight aria-hidden="true" size={18} /></TrackedLink></div>
        </section>
        <AgencyContactStrip />
        <ExistingCustomerCTA />
      </main>
      <StructuredData data={createInsuranceServiceSchema("Florida Small-Business Insurance", description, "/insurance/business")} />
      <SiteFooter />
    </>
  );
}
