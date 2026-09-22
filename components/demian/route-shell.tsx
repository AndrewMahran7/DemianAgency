import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";

export function RouteShell({ eyebrow, title, description, children }: { eyebrow: string; title: string; description: string; children?: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main className="route-main">
        <section className="route-hero">
          <div><p className="eyebrow"><span />{eyebrow}</p><h1>{title}</h1></div>
          <div><p>{description}</p><Link className="button" href="/#request-service">Request Service <ArrowRight size={18} /></Link></div>
        </section>
        {children && <section className="route-content">{children}</section>}
      </main>
      <SiteFooter />
    </>
  );
}
