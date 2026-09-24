import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, CarFront, Gauge, RefreshCcw, ShieldCheck } from "lucide-react";
import { AgencyContactStrip, ExistingCustomerCTA, QuoteActions } from "@/components/demian/insurance-conversion";
import { TrackedLink } from "@/components/demian/analytics-link";
import { MotionReveal } from "@/components/demian/motion-reveal";
import { SiteFooter } from "@/components/demian/site-footer";
import { SiteHeader } from "@/components/demian/site-header";
import { StructuredData } from "@/components/demian/structured-data";
import { autoInsurance } from "@/lib/insurance";
import { createInsuranceServiceSchema, createPageMetadata } from "@/lib/seo";

const description = "Florida auto insurance guidance for standard personal auto, plus motorcycles, classic cars, RVs, boats, and special-risk options where available.";

export const metadata: Metadata = createPageMetadata({
  title: "Florida Auto Insurance | Demian Insurance Agency",
  description,
  path: "/insurance/auto",
});

export default function AutoPage() {
  return (
    <>
      <SiteHeader />
      <main className="insurance-line auto-page">
        <section className="line-hero auto-hero">
          <MotionReveal className="line-hero-copy" immediate>
            <p className="eyebrow"><span /> Auto insurance</p>
            <h1>Protect the vehicles that keep your life moving.</h1>
            <p>Good auto coverage starts with the household—not a generic vehicle profile. Drivers, mileage, routines, vehicles, and financial priorities all shape the conversation.</p>
            <QuoteActions label={autoInsurance.quoteLabel} line="Auto" />
          </MotionReveal>
          <MotionReveal className="auto-hero-visual" delay={0.08} immediate>
            <div className="line-hero-photo auto-hero-photo">
              <Image src={autoInsurance.imageSrc} alt={autoInsurance.imageAlt} fill priority sizes="(max-width: 1280px) 100vw, 53vw" />
            </div>
            <div className="auto-motion-note"><Gauge aria-hidden="true" size={19} /><span>Built around how you actually drive</span></div>
          </MotionReveal>
        </section>

        <section className="auto-context-band" aria-label="Auto coverage considerations">
          {["Household", "Vehicles", "Drivers", "Mileage", "Daily routines"].map((item, index) => <span key={item}><small>0{index + 1}</small>{item}</span>)}
        </section>

        <section className="auto-coverage section">
          <MotionReveal className="auto-coverage-heading">
            <p className="eyebrow"><span /> Coverage that fits</p>
            <h2>Start with the way the vehicle is used.</h2>
            <p>Coverage options may include the protections below, depending on the vehicle, driver, carrier, selected limits, and policy terms.</p>
          </MotionReveal>
          <div className="auto-coverage-list">
            {autoInsurance.coverageOptions.map((coverage, index) => (
              <MotionReveal className="auto-coverage-item" delay={index * 0.045} key={coverage}><span>0{index + 1}</span><strong>{coverage}</strong></MotionReveal>
            ))}
          </div>
        </section>

        <section className="auto-vehicles">
          <div className="auto-vehicle-intro"><CarFront aria-hidden="true" size={28} /><p className="eyebrow"><span /> More than one kind of road</p><h2>From the everyday vehicle to the less everyday risk.</h2></div>
          <div className="auto-vehicle-track">
            {autoInsurance.vehicleTypes.map((vehicle, index) => <MotionReveal className="auto-vehicle-type" delay={index * 0.05} key={vehicle}><small>0{index + 1}</small><strong>{vehicle}</strong></MotionReveal>)}
          </div>
        </section>

        <section className="auto-market section">
          <MotionReveal className="auto-market-copy">
            <p className="eyebrow"><span /> The right path for the risk</p>
            <h2>A dedicated relationship for standard auto. Another path for special situations.</h2>
          </MotionReveal>
          <MotionReveal className="auto-market-details" delay={0.08}>
            <div><span>Standard personal auto</span><h3>A dedicated carrier relationship for eligible personal-auto needs.</h3><p>Demian guides eligible standard personal-auto customers through available coverage options while keeping the advice centered on the household and policy details.</p></div>
            <div><span>Special-risk auto</span><h3>Independent brokerage options may be available.</h3><p>For situations outside a standard personal-auto profile, the agency can explore broader-market options where available.</p></div>
          </MotionReveal>
        </section>

        <section className="auto-review">
          <MotionReveal className="auto-review-mark"><span>Every</span><strong>6</strong><span>months</span></MotionReveal>
          <MotionReveal className="auto-review-copy" delay={0.08}>
            <RefreshCcw aria-hidden="true" size={24} />
            <p className="eyebrow light"><span /> Semiannual coverage reviews</p>
            <h2>Your driving life doesn&apos;t stand still.</h2>
            <p>Vehicles, drivers, mileage, household needs, and insurance costs can change. A semiannual review gives auto customers a regular moment to revisit whether their coverage still fits; coverage does not update itself automatically.</p>
          </MotionReveal>
        </section>

        <section className="auto-discounts section">
          <MotionReveal><ShieldCheck aria-hidden="true" size={25} /><p className="eyebrow"><span /> Available opportunities</p><h2>Ask what you may qualify for.</h2></MotionReveal>
          <div><p>Discount opportunities may include the following when available and when eligibility requirements are met. No specific discount or savings amount is promised.</p><ul>{autoInsurance.discountExamples.map((discount) => <li key={discount}>{discount}</li>)}</ul><TrackedLink event="quote_cta_click" properties={{ location: "auto_page", insuranceType: "Auto" }} className="text-link" href="/request-quote?type=Auto">Discuss an Auto Quote <span aria-hidden="true">↗</span></TrackedLink></div>
        </section>

        <section className="line-final-cta auto-final-cta">
          <div><p className="eyebrow light"><span /> Ready when you are</p><h2>Put the whole household into the auto conversation.</h2></div>
          <div><p>Start with the vehicles, drivers, and questions you have today.</p><TrackedLink event="quote_cta_click" properties={{ location: "auto_page", insuranceType: "Auto" }} className="button button-light" href="/request-quote?type=Auto">Request an Auto Quote <ArrowRight aria-hidden="true" size={18} /></TrackedLink></div>
        </section>
        <AgencyContactStrip />
        <ExistingCustomerCTA />
      </main>
      <StructuredData data={createInsuranceServiceSchema("Florida Auto Insurance", description, "/insurance/auto")} />
      <SiteFooter />
    </>
  );
}
