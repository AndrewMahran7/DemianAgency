import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MotionReveal } from "@/components/demian/motion-reveal";
import { SiteFooter } from "@/components/demian/site-footer";
import { SiteHeader } from "@/components/demian/site-header";
import { StructuredData } from "@/components/demian/structured-data";
import { TrackedLink } from "@/components/demian/analytics-link";
import { absoluteUrl, createPageMetadata } from "@/lib/seo";
import { teamMembers } from "@/lib/team";

export const metadata: Metadata = createPageMetadata({
  title: "Meet the Team | Demian Insurance Agency",
  description: "Meet the people behind Demian Insurance Agency, including Principal Mina Demian and Licensed Insurance Professional Matt Alexander.",
  path: "/about/team",
});

export default function MeetTheTeamPage() {
  const agency = {
    "@type": "InsuranceAgency",
    name: "Demian Insurance Agency",
    ...(absoluteUrl("/") ? { url: absoluteUrl("/") } : {}),
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Demian Insurance Agency team",
    itemListElement: teamMembers.map((member, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Person",
        name: member.name,
        jobTitle: member.jobTitle,
        worksFor: agency,
        ...(absoluteUrl(member.portrait) ? { image: absoluteUrl(member.portrait) } : {}),
        ...(member.profilePath && absoluteUrl(member.profilePath) ? { url: absoluteUrl(member.profilePath) } : {}),
      },
    })),
  };

  return (
    <>
      <SiteHeader />
      <main className="team-directory-page">
        <section className="team-directory-hero">
          <MotionReveal immediate>
            <p className="eyebrow"><span /> Our team</p>
            <h1>Real people.<br />Personal guidance.</h1>
          </MotionReveal>
          <MotionReveal className="team-directory-intro" delay={0.08} immediate>
            <p>Demian Insurance Agency is built around real relationships, clear guidance, and people customers can actually reach.</p>
          </MotionReveal>
        </section>

        <section className="team-directory" aria-labelledby="team-directory-title">
          <MotionReveal className="team-directory-heading">
            <p className="section-index">01 / The people behind the agency</p>
            <h2 id="team-directory-title">Meet the team.</h2>
          </MotionReveal>

          <div className="team-directory-grid">
            {teamMembers.map((member, index) => (
              <MotionReveal className={`team-directory-card team-directory-card-${member.slug}`} delay={index * 0.08} key={member.slug}>
                <div className="team-directory-portrait">
                  <Image
                    src={member.portrait}
                    alt={member.portraitAlt}
                    fill
                    sizes="(max-width: 760px) 100vw, 46vw"
                  />
                  <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                </div>
                <div className="team-directory-copy">
                  <p className="team-directory-role">{member.jobTitle}</p>
                  <h3>{member.name}</h3>
                  {member.shortBio ? <p className="team-directory-bio">{member.shortBio}</p> : null}
                  {member.profilePath ? (
                    <Link className="text-link team-directory-link" href={member.profilePath} aria-label={`Meet ${member.name}`}>
                      Meet {member.name.split(" ")[0]} <span aria-hidden="true">↗</span>
                    </Link>
                  ) : null}
                </div>
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
