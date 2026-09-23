import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Clock3, Phone, ShieldCheck } from "lucide-react";
import { MotionReveal } from "@/components/demian/motion-reveal";
import { QuoteRequestForm } from "@/components/demian/quote-request-form";
import { SiteFooter } from "@/components/demian/site-footer";
import { SiteHeader } from "@/components/demian/site-header";
import { StructuredData } from "@/components/demian/structured-data";
import { createAgencySchema, createPageMetadata } from "@/lib/seo";
import { services, siteConfig } from "@/lib/site-config";
import { teamMembers } from "@/lib/team";
import { TrackedLink, TrackedPhoneLink } from "@/components/demian/analytics-link";

export const metadata: Metadata = createPageMetadata({
  title: "Florida Insurance Guidance | Demian Insurance Agency",
  description: "Personal Florida insurance guidance for your vehicles, home, family, and small business from a family-owned agency you can call.",
  path: "/",
  image: "/images/home/coastal-family-home.jpg",
});

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="concise-home">
        <section className="home-hero" id="top">
          <MotionReveal className="home-hero-copy" immediate>
            <p className="eyebrow"><span /> Welcome to Demian Insurance Agency</p>
            <h1>Insurance should feel personal.</h1>
            <p className="home-hero-intro">
              A family-owned Florida agency helping you make sense of Auto, Home, Life, and Business insurance—with real guidance from people you can call.
            </p>
            <div className="home-hero-actions">
              <TrackedLink event="quote_cta_click" properties={{ location: "homepage_hero" }} className="button" href={siteConfig.requestQuoteHref}>Request a Quote <ArrowRight aria-hidden="true" size={18} /></TrackedLink>
              <TrackedLink event="service_cta_click" properties={{ location: "homepage_hero" }} className="text-link" href={siteConfig.clientServiceHref}>Client Service <span aria-hidden="true">↗</span></TrackedLink>
            </div>
            <p className="home-hero-region"><ShieldCheck aria-hidden="true" size={18} /> Serving {siteConfig.serviceRegion}</p>
          </MotionReveal>

          <div className="home-hero-visual">
            <div className="home-hero-photo">
              <Image
                src="/images/home/coastal-family-home.jpg"
                alt="Family outside a coastal Florida home"
                fill
                priority
                quality={88}
                sizes="(max-width: 600px) 0px, (max-width: 900px) 100vw, 46vw"
              />
            </div>
            <aside className="home-hero-welcome">
              <span>A local relationship</span>
              <strong>Clear answers. Thoughtful options. A real person to call.</strong>
            </aside>
          </div>
        </section>

        <section className="home-promise">
          <MotionReveal className="home-promise-heading">
            <p className="eyebrow light"><span /> A family-owned approach</p>
            <h2>Good guidance starts by knowing who you&apos;re helping.</h2>
          </MotionReveal>
          <MotionReveal className="home-promise-copy" delay={0.08}>
            <p>We take time to listen, explain the options clearly, and stay available as life changes—the kind of attention and care we would want for our own family.</p>
            <ul aria-label="What clients can expect">
              <li><span>01</span> Clear explanations</li>
              <li><span>02</span> Thoughtful choices</li>
              <li><span>03</span> Someone you can call</li>
            </ul>
          </MotionReveal>
        </section>

        <section className="home-offerings" id="insurance">
          <MotionReveal className="home-section-heading">
            <div>
              <p className="eyebrow"><span /> What we offer</p>
              <h2>What can we help you protect?</h2>
            </div>
            <p>Start with the part of life that brought you here. Each page offers a focused look at the coverage and questions that matter.</p>
          </MotionReveal>
          <div className="home-offering-list">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <MotionReveal delay={index * 0.05} key={service.name}>
                  <Link className="home-offering" href={service.href} aria-label={`Explore ${service.name} insurance`}>
                    <span className="home-offering-index">{service.index}</span>
                    <Icon aria-hidden="true" size={22} strokeWidth={1.5} />
                    <h3>{service.name}</h3>
                    <p>{service.description}</p>
                    <ArrowUpRight className="home-offering-arrow" aria-hidden="true" size={22} />
                  </Link>
                </MotionReveal>
              );
            })}
          </div>
        </section>

        <section className="home-team" id="team">
          <div className="home-team-list">
            {teamMembers.map((member, index) => (
              <div className="home-team-member" key={member.slug}>
                <MotionReveal className="home-team-portrait">
                  <Image
                    src={member.portrait}
                    alt={member.portraitAlt}
                    fill
                    sizes="(max-width: 900px) 100vw, 43vw"
                  />
                  <span aria-hidden="true">{member.title.split(",")[0]} / {String(index + 1).padStart(2, "0")}</span>
                </MotionReveal>
                <MotionReveal className="home-team-copy" delay={0.08}>
                  <p className="eyebrow light"><span /> Meet the person behind the agency</p>
                  <h2>A real relationship starts with a real introduction.</h2>
                  <div className="home-team-identity">
                    <h3>{member.name}</h3>
                    <p>{member.title}</p>
                  </div>
                  <p className="home-team-bio">A husband, father, and Florida-licensed insurance professional, Mina brings more than a decade of experience across insurance, financial services, employee benefits, banking, and client advisory work—along with a long-standing commitment to serving his community.</p>
                  <TrackedLink event="meet_team_click" properties={{ location: "homepage" }} className="text-link home-team-link" href="/about/team">Meet the Team <span aria-hidden="true">↗</span></TrackedLink>
                </MotionReveal>
              </div>
            ))}
          </div>
        </section>

        <section className="home-quote" id="request-quote">
          <MotionReveal className="home-quote-intro">
            <p className="eyebrow light"><span /> Let&apos;s talk</p>
            <h2>What are you looking to protect?</h2>
            <p>Share a few basics to start a conversation. This is a first-contact request, not a full insurance application.</p>
            <div className="home-contact-cue">
              <Phone aria-hidden="true" size={20} />
              <div>
                <span>Prefer to talk to someone?</span>
                <TrackedPhoneLink location="homepage" href={siteConfig.phoneHref}>{siteConfig.phone}</TrackedPhoneLink>
              </div>
            </div>
            <div className="home-hours">
              <Clock3 aria-hidden="true" size={20} />
              <div>
                <span>Agency hours</span>
                {siteConfig.hours.map((entry) => <p key={entry.days}><strong>{entry.days}</strong> {entry.time}</p>)}
              </div>
            </div>
          </MotionReveal>
          <MotionReveal className="home-quote-form" delay={0.08}>
            <QuoteRequestForm compact source="homepage" />
          </MotionReveal>
        </section>
      </main>
      <StructuredData data={createAgencySchema()} />
      <SiteFooter />
    </>
  );
}
