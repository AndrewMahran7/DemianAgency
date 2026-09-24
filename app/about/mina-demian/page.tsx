import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, CarFront, GraduationCap, Heart, Home, MapPin, Paintbrush, ShieldCheck, Users } from "lucide-react";
import { MotionReveal } from "@/components/demian/motion-reveal";
import { SiteFooter } from "@/components/demian/site-footer";
import { SiteHeader } from "@/components/demian/site-header";
import { StructuredData } from "@/components/demian/structured-data";
import { absoluteUrl, createPageMetadata } from "@/lib/seo";
import { minaDemian } from "@/lib/team";
import { TrackedLink } from "@/components/demian/analytics-link";

export const metadata: Metadata = createPageMetadata({
  title: "Meet Mina Demian | Demian Insurance Agency",
  description: "Meet Mina Demian, Principal of Demian Insurance Agency, and learn about the personal perspective behind his approach to insurance guidance.",
  path: "/about/mina-demian",
});

const credibility = [
  ["12+ Years", "Insurance, financial services & client advisory experience"],
  ["Family Owned", "Personal guidance rooted in real relationships"],
  ["SDSU Graduate", "B.S. Business Administration & Management"],
  ["10+ Years Giving Back", "Community volunteer since 2015"],
] as const;

export default function MinaDemianPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: minaDemian.name,
    jobTitle: "Principal",
    worksFor: {
      "@type": "InsuranceAgency",
      name: "Demian Insurance Agency",
      ...(absoluteUrl("/") ? { url: absoluteUrl("/") } : {}),
    },
    alumniOf: { "@type": "CollegeOrUniversity", name: minaDemian.education.institution },
    ...(absoluteUrl(minaDemian.portrait) ? { image: absoluteUrl(minaDemian.portrait) } : {}),
  };

  return (
    <>
      <SiteHeader />
      <main className="team-page">
        <section className="team-hero">
          <MotionReveal className="founder-portrait-wrap" immediate>
            <div className="founder-portrait-frame">
              <Image
                src={minaDemian.portrait}
                alt={minaDemian.portraitAlt}
                fill
                priority
                sizes="(max-width: 760px) 100vw, 48vw"
                className="founder-portrait"
              />
              <span className="portrait-index" aria-hidden="true">01 / Principal</span>
            </div>
          </MotionReveal>
          <MotionReveal className="founder-intro" delay={0.08} immediate>
            <p className="eyebrow"><span /> Meet the principal</p>
            <div className="founder-name-row">
              <h1>{minaDemian.name}</h1>
            </div>
            <p className="founder-role">{minaDemian.title}</p>
            <h2>A personal approach to protecting what matters.</h2>
            <p className="founder-lede">
              With more than a decade across insurance, employee benefits, banking, and client advisory work, Mina brings broad perspective to every conversation. As a husband and father, he understands that the decisions behind a policy are deeply personal.
            </p>
            <div className="hero-actions founder-actions">
              <TrackedLink event="quote_cta_click" properties={{ location: "team_page" }} className="button" href="/request-quote">Request a Quote <ArrowRight size={18} aria-hidden="true" /></TrackedLink>
              <Link className="text-link" href="/about/team">Meet the Team <span aria-hidden="true">↗</span></Link>
            </div>
            <p className="founder-location"><MapPin size={16} aria-hidden="true" /> Serving Southwest Florida</p>
          </MotionReveal>
        </section>

        <section className="credibility-strip" aria-label="Mina Demian credentials and experience">
          {credibility.map(([value, label], index) => (
            <MotionReveal className="credibility-item" delay={index * 0.06} key={value}>
              <strong>{value}</strong>
              <span>{label}</span>
            </MotionReveal>
          ))}
        </section>

        <section className="founder-story section">
          <MotionReveal className="story-heading">
            <p className="section-index">01 / His story</p>
            <p className="eyebrow"><span /> A broader perspective</p>
            <h2>More than a policy. A relationship built on trust.</h2>
          </MotionReveal>
          <MotionReveal className="story-body" delay={0.08}>
            <p className="story-lead">Mina founded Demian Insurance Agency with a simple belief: insurance should feel personal.</p>
            <p>Across more than a decade of work in insurance, employee benefits, banking, small-business consulting, and client advisory roles, he has built a career around helping people navigate consequential decisions with greater clarity.</p>
            <p>That range gives Mina perspective beyond matching a customer with a policy. He understands the business context, the family considerations, and the value of taking time to see how the pieces connect.</p>
            <div className="experience-organizations" aria-label="Organizations in Mina Demian's professional background">
              {minaDemian.experience.slice(0, 5).map((item) => <span key={item.organization}>{item.organization}</span>)}
            </div>
          </MotionReveal>
          <div className="story-mark" aria-hidden="true"><strong>12+</strong><span>years of relevant<br />professional experience</span></div>
        </section>

        <section className="family-perspective">
          <MotionReveal className="family-heading">
            <p className="section-index light-index">02 / Family perspective</p>
            <p className="eyebrow light"><span /> Personal by nature</p>
            <h2>Family first, in life and in business.</h2>
          </MotionReveal>
          <MotionReveal className="family-copy" delay={0.08}>
            <p>As a husband and father himself, Mina understands that insurance decisions are rarely just about numbers. They are about the life those numbers represent—and the people relying on you to make thoughtful choices.</p>
            <p>That perspective shapes an approach grounded in care, clear explanations, and respect for the seriousness of what customers are working to protect.</p>
          </MotionReveal>
          <div className="family-stakes" aria-label="The things insurance helps protect">
            {[
              [Home, "The home your family lives in"],
              [CarFront, "The vehicles that keep life moving"],
              [Building2, "The business you have spent years building"],
              [Heart, "The people who depend on you"],
            ].map(([Icon, label], index) => (
              <MotionReveal className="family-stake" delay={index * 0.06} key={String(label)}>
                <Icon aria-hidden="true" size={20} strokeWidth={1.5} />
                <span>{String(label)}</span>
              </MotionReveal>
            ))}
          </div>
        </section>

        <section className="qualifications-section">
          <MotionReveal className="qualification-panel education-panel">
            <div className="qualification-icon"><GraduationCap aria-hidden="true" size={25} strokeWidth={1.5} /></div>
            <p className="section-index">03 / Education</p>
            <h2>{minaDemian.education.institution}</h2>
            <p>{minaDemian.education.degree}</p>
          </MotionReveal>
          <MotionReveal className="qualification-panel perspective-panel" delay={0.08}>
            <div className="qualification-icon"><Users aria-hidden="true" size={25} strokeWidth={1.5} /></div>
            <p className="section-index">04 / Perspective</p>
            <h2>Experience across insurance and client advisory work.</h2>
            <p>{minaDemian.experienceSummary}</p>
          </MotionReveal>
        </section>

        <section className="community-section">
          <div className="community-mark" aria-hidden="true"><span>Since</span><strong>2015</strong></div>
          <MotionReveal className="community-copy">
            <p className="section-index">05 / Community</p>
            <p className="eyebrow"><span /> Giving back</p>
            <h2>Service doesn&apos;t stop at the office.</h2>
            <p>Helping people has been part of Mina&apos;s life outside the office, too. Since February 2015, he has volunteered with The Compton Initiative, contributing to hands-on neighborhood restoration and cleanup efforts.</p>
            <p>His long-term involvement reflects a steady commitment to showing up for communities and doing practical work that makes shared spaces better.</p>
          </MotionReveal>
          <div className="community-activities">
            <div className="community-activity-icon"><Paintbrush aria-hidden="true" size={22} strokeWidth={1.5} /></div>
            <ul>{minaDemian.community.activities.map((activity) => <li key={activity}>{activity}</li>)}</ul>
            <p>Volunteer with<br /><strong>{minaDemian.community.organization}</strong></p>
          </div>
        </section>

        <section className="philosophy-section section">
          <MotionReveal>
            <p className="section-index">06 / Philosophy</p>
            <p className="eyebrow"><span /> The Demian approach</p>
            <h2>Clear guidance.<br />Real relationships.<br />Long-term trust.</h2>
            <p className="philosophy-intro">Insurance should feel personal. The agency&apos;s approach is built around giving people the clarity and space to make informed decisions.</p>
          </MotionReveal>
          <div className="philosophy-principles">
            {[
              [Users, "A real point of contact", "Someone you know you can reach when questions or changes arise."],
              [ShieldCheck, "Thoughtful guidance", "Time to understand your options without pressure or unnecessary complexity."],
              [ArrowRight, "Clear communication", "Straightforward conversations centered on what you are working to protect."],
            ].map(([Icon, title, copy], index) => (
              <MotionReveal className="philosophy-principle" delay={index * 0.07} key={String(title)}>
                <Icon aria-hidden="true" size={20} strokeWidth={1.5} />
                <h3>{String(title)}</h3>
                <p>{String(copy)}</p>
              </MotionReveal>
            ))}
          </div>
        </section>

        <section className="final-cta team-final-cta">
          <div><p className="eyebrow light"><span /> Start a conversation</p><h2>Ready to talk about what you&apos;re protecting?</h2></div>
          <div><p>Share what you need help with and start a more personal insurance conversation.</p><TrackedLink event="quote_cta_click" properties={{ location: "team_page" }} className="button button-light" href="/request-quote">Request a Quote <ArrowRight size={18} aria-hidden="true" /></TrackedLink></div>
        </section>
      </main>
      <StructuredData data={structuredData} />
      <SiteFooter />
    </>
  );
}
