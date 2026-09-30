import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MotionReveal } from "@/components/demian/motion-reveal";
import { RouteShell } from "@/components/demian/route-shell";
import { StructuredData } from "@/components/demian/structured-data";
import { createAgencySchema, createPageMetadata } from "@/lib/seo";
import { teamMembers } from "@/lib/team";

export const metadata: Metadata = createPageMetadata({
  title: "About Demian Insurance Agency | Florida Insurance Team",
  description: "Learn about Demian Insurance Agency, a family-owned Florida insurance team focused on clear guidance, personal service, and lasting relationships.",
  path: "/about",
});

const principles = [
  ["01", "People you can reach", "A real team stays available when questions, changes, or decisions arise."],
  ["02", "Guidance made clear", "Straightforward explanations help you understand your options without unnecessary complexity."],
  ["03", "Relationships that last", "The agency is built to support people through more than a single policy conversation."],
] as const;

export default function AboutPage() {
  return (
    <>
      <RouteShell
        eyebrow="About the agency"
        title="Insurance guidance built around people."
        description="Demian Insurance Agency brings a personal, considered approach to protecting homes, vehicles, families, and businesses across Florida's Gulf Coast and nearby inland counties."
        quoteLocation="about_page"
      >
        <section className="about-agency-story" aria-labelledby="about-agency-title">
          <MotionReveal className="about-agency-heading">
            <p className="section-index">01 / Who we are</p>
            <p className="eyebrow"><span /> A team-first agency</p>
            <h2 id="about-agency-title">A team you know.<br />A conversation that stays personal.</h2>
          </MotionReveal>
          <MotionReveal className="about-agency-copy" delay={0.08}>
            <p>Insurance decisions are connected to real homes, families, vehicles, and businesses. The Demian team takes time to understand that wider picture before helping customers consider their options.</p>
            <p>That approach is grounded in clear communication, dependable service, and an agency relationship that gives customers real people to call.</p>
          </MotionReveal>
          <div className="about-principles">
            {principles.map(([index, title, copy], position) => (
              <MotionReveal className="about-principle" delay={position * 0.06} key={title}>
                <span>{index}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </MotionReveal>
            ))}
          </div>
        </section>

        <section className="about-team-preview" aria-labelledby="about-team-title">
          <MotionReveal className="about-team-heading">
            <div>
              <p className="section-index light-index">02 / The people behind the agency</p>
              <p className="eyebrow light"><span /> Meet the team</p>
              <h2 id="about-team-title">Here when you need us.</h2>
            </div>
            <div>
              <p>Meet the people who listen, explain options clearly, and help keep the details moving.</p>
              <Link className="button button-light" href="/about/team">Meet the Team <ArrowRight size={18} aria-hidden="true" /></Link>
            </div>
          </MotionReveal>
          <div className="about-team-grid">
            {teamMembers.map((member, index) => (
              <MotionReveal className={`about-team-member about-team-member-${member.slug}`} delay={index * 0.06} key={member.slug}>
                <div className="about-team-portrait">
                  <Image src={member.image} alt={member.imageAlt} fill sizes="(max-width: 760px) 100vw, (max-width: 1100px) 46vw, 30vw" />
                </div>
                <div className="about-team-identity">
                  <p>{member.role}</p>
                  <h3>{member.name}</h3>
                </div>
              </MotionReveal>
            ))}
          </div>
        </section>
      </RouteShell>
      <StructuredData data={createAgencySchema()} />
    </>
  );
}
