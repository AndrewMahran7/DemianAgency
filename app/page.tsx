import Link from "next/link";
import { ArrowRight, Check, Compass, Layers3, ShieldCheck, Sparkles } from "lucide-react";
import { SiteHeader } from "@/components/demian/site-header";
import { ImagePlaceholder } from "@/components/demian/image-placeholder";
import { MotionReveal } from "@/components/demian/motion-reveal";
import { InsuranceServices } from "@/components/demian/insurance-services";
import { ServiceRequestForm } from "@/components/demian/service-request-form";
import { FAQ } from "@/components/demian/faq";
import { SiteFooter } from "@/components/demian/site-footer";
import { services } from "@/lib/site-config";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="hero" id="top">
          <div className="hero-copy">
            <MotionReveal>
              <p className="eyebrow"><span /> Serving Southwest Florida</p>
              <h1>Protect what<br />you&apos;ve built.</h1>
              <p className="hero-intro">Your home, vehicles, family, and business deserve more than a policy. They deserve a local agency that sees the whole picture.</p>
              <div className="hero-actions">
                <Link className="button" href="#request-service">Request Service <ArrowRight aria-hidden="true" size={18} /></Link>
                <Link className="text-link" href="#insurance">Explore Coverage <span aria-hidden="true">↘</span></Link>
              </div>
            </MotionReveal>
            <div className="hero-note"><ShieldCheck aria-hidden="true" size={19} /><span>Personal guidance for the things that matter most.</span></div>
          </div>
          <div className="hero-visual">
            <ImagePlaceholder className="hero-placeholder" label="Southwest Florida homeowner lifestyle" detail="Photography direction" />
            <aside className="hero-callout"><span>One relationship</span><strong>Thoughtful coverage across every chapter.</strong></aside>
          </div>
        </section>

        <section className="intro-strip" aria-label="Insurance categories">
          <p>Coverage, considered together.</p>
          <div className="intro-categories">{services.map((service) => <span key={service.name}>{service.name}</span>)}</div>
        </section>

        <section className="section services-section" id="insurance">
          <MotionReveal className="section-heading split-heading">
            <div><p className="eyebrow"><span /> Insurance</p><h2>Protection for the life you&apos;re living.</h2></div>
            <p>Clear guidance for each part of your world—considered on its own and as part of a bigger picture.</p>
          </MotionReveal>
          <InsuranceServices />
        </section>

        <section className="protection-section">
          <div className="protection-visual">
            <div className="protection-rings" aria-hidden="true"><span /><span /><span /><span /></div>
            <div className="protection-center"><Layers3 size={24} aria-hidden="true" /><strong>One view.<br />More clarity.</strong></div>
          </div>
          <MotionReveal className="protection-copy">
            <p className="eyebrow light"><span /> The bigger picture</p>
            <h2>Your life doesn&apos;t fit into separate boxes. Your guidance shouldn&apos;t either.</h2>
            <p>When one agency understands your home, vehicles, family, and business, conversations become simpler and your coverage can be considered as a whole.</p>
            <ul>
              <li><Check size={16} /> One trusted point of contact</li>
              <li><Check size={16} /> Guidance across changing needs</li>
              <li><Check size={16} /> A clearer view of what matters</li>
            </ul>
          </MotionReveal>
        </section>

        <section className="section why-section" id="about">
          <MotionReveal className="section-heading centered-heading">
            <p className="eyebrow"><span /> Why Demian</p>
            <h2>Insurance should feel personal.</h2>
            <p>Good guidance starts with listening—then helping you understand the options around what you value.</p>
          </MotionReveal>
          <div className="value-grid">
            {[
              [Compass, "Personal guidance", "Conversations shaped around your needs, not a generic checklist."],
              [ShieldCheck, "Local understanding", "An agency grounded in the Southwest Florida community it serves."],
              [Layers3, "Connected coverage", "Help across home, auto, life, and business in one relationship."],
              [Sparkles, "A real agency relationship", "A human point of contact when questions or changes come up."],
            ].map(([Icon, title, copy], index) => (
              <MotionReveal className="value-item" delay={index * .06} key={String(title)}>
                <Icon aria-hidden="true" size={22} strokeWidth={1.5} />
                <h3>{String(title)}</h3><p>{String(copy)}</p>
              </MotionReveal>
            ))}
          </div>
        </section>

        <section className="section process-section">
          <div className="process-intro">
            <p className="eyebrow"><span /> How it works</p>
            <h2>A simple start.<br />A personal follow-up.</h2>
          </div>
          <ol className="process-list">
            {[
              ["01", "Tell us what you need", "Share the kind of help you are looking for and how to reach you."],
              ["02", "We review your request", "The agency can take a thoughtful look before starting the conversation."],
              ["03", "A team member follows up", "You will hear from a person—not be pushed into an automated quote flow."],
            ].map(([step, title, copy]) => <li key={step}><span>{step}</span><div><h3>{title}</h3><p>{copy}</p></div></li>)}
          </ol>
        </section>

        <section className="request-section" id="request-service">
          <div className="request-intro">
            <p className="eyebrow light"><span /> Request service</p>
            <h2>Tell us what you need.</h2>
            <p>Start with a few details. This frontend preview lets you experience the complete flow without sending or storing personal information.</p>
            <div className="request-assurance"><ShieldCheck aria-hidden="true" size={20} /><span>A secure agency connection will replace the isolated demo handler in the next backend phase.</span></div>
          </div>
          <ServiceRequestForm />
        </section>

        <section className="section agency-section">
          <ImagePlaceholder className="agency-placeholder" label="Demian Insurance Agency team" detail="Future agency photography" />
          <MotionReveal className="agency-copy">
            <p className="eyebrow"><span /> Close to home</p>
            <h2>A local relationship for what matters here.</h2>
            <p>Demian Insurance Agency serves Southwest Florida with a personal approach to insurance. This space is ready for the agency&apos;s authentic story, team introduction, and approved photography.</p>
            <Link className="text-link" href="/about">Meet the agency <span aria-hidden="true">↗</span></Link>
          </MotionReveal>
        </section>

        <section className="section faq-section" id="resources">
          <div className="faq-heading"><p className="eyebrow"><span /> Common questions</p><h2>A little clarity, right from the start.</h2></div>
          <FAQ />
        </section>

        <section className="final-cta" id="contact">
          <div><p className="eyebrow light"><span /> Here when you need us</p><h2>Have something you need help with?</h2></div>
          <div><p>Tell us what you need and the Demian team can follow up.</p><Link className="button button-light" href="#request-service">Request Service <ArrowRight size={18} /></Link></div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
