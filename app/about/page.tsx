import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MotionReveal } from "@/components/demian/motion-reveal";
import { RouteShell } from "@/components/demian/route-shell";
import { createPageMetadata } from "@/lib/seo";
import { minaDemian } from "@/lib/team";

export const metadata: Metadata = createPageMetadata({
  title: "About Demian Insurance Agency | Florida",
  description: "Meet the family-owned Florida insurance agency built around clear explanations, thoughtful options, and a real relationship with Principal Mina Demian.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <RouteShell eyebrow="About" title="An agency relationship, built around people." description="Demian Insurance Agency brings a personal, considered approach to protecting homes, vehicles, families, and businesses across Florida's Gulf Coast and nearby inland counties." quoteLocation="about_page">
      <MotionReveal className="about-founder-card">
        <div className="about-founder-image">
          <Image src={minaDemian.portrait} alt={minaDemian.portraitAlt} fill sizes="(max-width: 760px) 100vw, 40vw" />
        </div>
        <div className="about-founder-copy">
          <p className="eyebrow"><span /> Meet the principal</p>
          <h2>{minaDemian.name}</h2>
          <p>{minaDemian.title}</p>
          <p>More than a decade of relevant professional experience, a family perspective, and a belief that insurance guidance should always feel personal.</p>
          <Link className="button" href="/about/mina-demian">Meet Mina <ArrowRight size={18} aria-hidden="true" /></Link>
        </div>
      </MotionReveal>
    </RouteShell>
  );
}
