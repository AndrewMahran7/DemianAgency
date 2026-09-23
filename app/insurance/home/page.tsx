import type { Metadata } from "next";
import { ArrowRight, Building2, Home as HomeIcon, Layers3, Search, SunMedium } from "lucide-react";
import { AgencyContactStrip, ExistingCustomerCTA, QuoteActions } from "@/components/demian/insurance-conversion";
import { TrackedLink } from "@/components/demian/analytics-link";
import { ImagePlaceholder } from "@/components/demian/image-placeholder";
import { MotionReveal } from "@/components/demian/motion-reveal";
import { SiteFooter } from "@/components/demian/site-footer";
import { SiteHeader } from "@/components/demian/site-header";
import { StructuredData } from "@/components/demian/structured-data";
import { homeInsurance } from "@/lib/insurance";
import { createInsuranceServiceSchema, createPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

const description = "Florida home insurance guidance with multiple carrier options for homeowners, condos, renters, landlords, flood, wind, and hurricane considerations.";

export const metadata: Metadata = createPageMetadata({
  title: "Florida Home Insurance | Demian Insurance Agency",
  description,
  path: "/insurance/home",
});

export default function HomeInsurancePage() {
  return (
    <>
      <SiteHeader />
      <main className="insurance-line home-page">
        <section className="line-hero home-hero">
          <MotionReveal className="home-hero-visual" immediate>
            <ImagePlaceholder className="line-hero-placeholder" label={homeInsurance.imageLabel} detail={homeInsurance.imageDetail} />
            <span className="home-visual-label"><SunMedium aria-hidden="true" size={18} /> Florida homes. Florida considerations.</span>
          </MotionReveal>
          <MotionReveal className="line-hero-copy" delay={0.08} immediate>
            <p className="eyebrow"><span /> Home insurance</p>
            <h1>Your home is more than an address. Its coverage should be built for Florida.</h1>
            <p>Property details, carrier eligibility, selected options, and a changing insurance market all matter. Demian helps homeowners understand those considerations and evaluate available choices.</p>
            <QuoteActions label={homeInsurance.quoteLabel} line="Home" />
          </MotionReveal>
        </section>

        <section className="home-local-strip">
          <p><span>Serving households across</span>{siteConfig.serviceRegion}</p>
          <div>{siteConfig.serviceAreas.map((county) => <span key={county}>{county}</span>)}</div>
        </section>

        <section className="home-market">
          <MotionReveal className="home-market-title">
            <Search aria-hidden="true" size={27} />
            <p className="eyebrow light"><span /> Independent home brokerage</p>
            <h2>One home.<br />More than one place to look.</h2>
          </MotionReveal>
          <MotionReveal className="home-market-copy" delay={0.08}>
            <p className="home-market-lead">Demian can shop multiple carriers across Florida for eligible home-insurance needs.</p>
            <p>That broader view can be useful when premiums increase, a carrier changes eligibility or exits, a homeowner wants alternatives, or the property itself changes.</p>
            <p>More options to evaluate does not promise a lower rate, carrier acceptance, or a particular outcome. It creates a more informed place to start.</p>
            <TrackedLink event="quote_cta_click" properties={{ location: "home_page", insuranceType: "Home" }} className="button button-light" href="/request-quote?type=Home">Explore Home Insurance Options <ArrowRight aria-hidden="true" size={18} /></TrackedLink>
          </MotionReveal>
        </section>

        <section className="home-categories section">
          <MotionReveal className="home-categories-heading"><p className="eyebrow"><span /> Different properties. Different questions.</p><h2>A home conversation can take more than one form.</h2></MotionReveal>
          <div className="home-category-grid">
            {homeInsurance.categories.map((category, index) => (
              <MotionReveal className={`home-category home-category-${(index % 3) + 1}`} delay={index * 0.035} key={category}>
                <span>0{index + 1}</span>{index % 2 === 0 ? <HomeIcon aria-hidden="true" size={19} /> : <Building2 aria-hidden="true" size={19} />}<strong>{category}</strong>
              </MotionReveal>
            ))}
          </div>
        </section>

        <section className="home-considerations section">
          <MotionReveal className="home-considerations-intro">
            <Layers3 aria-hidden="true" size={25} />
            <p className="eyebrow"><span /> Florida property context</p>
            <h2>Understand the details before assuming what a policy includes.</h2>
            <p>Coverage depends on the policy, carrier, property, selected options, exclusions, and terms. Flood coverage, hurricane-related protections, and replacement-cost treatment should never be assumed.</p>
          </MotionReveal>
          <div className="home-consideration-list">
            {homeInsurance.considerations.map((item, index) => <MotionReveal delay={index * 0.045} key={item}><span>0{index + 1}</span><strong>{item}</strong></MotionReveal>)}
          </div>
        </section>

        <section className="home-review">
          <div className="home-review-mark"><small>Coverage review</small><strong>Annual</strong></div>
          <MotionReveal className="home-review-copy">
            <p className="eyebrow"><span /> Your home changes</p>
            <h2>Your coverage deserves another look.</h2>
            <p>Renovations, roof changes, possessions, replacement costs, liability exposure, and the insurance market can all shift. The agency&apos;s annual home-coverage review practice creates a regular opportunity to revisit the fit.</p>
          </MotionReveal>
        </section>

        <section className="line-final-cta home-final-cta">
          <div><p className="eyebrow light"><span /> Start with the property</p><h2>See which home-insurance options may be available.</h2></div>
          <div><p>Share a few details and begin a Florida-focused coverage conversation.</p><TrackedLink event="quote_cta_click" properties={{ location: "home_page", insuranceType: "Home" }} className="button button-light" href="/request-quote?type=Home">Request a Home Quote <ArrowRight aria-hidden="true" size={18} /></TrackedLink></div>
        </section>
        <AgencyContactStrip />
        <ExistingCustomerCTA />
      </main>
      <StructuredData data={createInsuranceServiceSchema("Florida Home Insurance", description, "/insurance/home")} />
      <SiteFooter />
    </>
  );
}
