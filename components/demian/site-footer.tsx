import Link from "next/link";
import { Brand } from "./brand";
import { services, siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-brand"><Brand /><p>Personal guidance for homes, vehicles, families, and businesses across {siteConfig.serviceRegion}.</p></div>
      <div className="footer-links">
        <div><span>Insurance</span>{services.map((service) => <Link key={service.name} href={service.href}>{service.name} Insurance</Link>)}</div>
        <div><span>Agency</span><Link href={siteConfig.clientServiceHref}>Client Service</Link>{siteConfig.navigation.slice(1).map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}</div>
        <div><span>Get started</span><Link href={siteConfig.requestQuoteHref}>Request a Quote</Link><Link href={siteConfig.requestServiceHref}>Request Service</Link><a href={siteConfig.phoneHref}>{siteConfig.phone}</a></div>
        <div><span>Information</span><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></div>
      </div>
      <div className="footer-hours"><span>Agency hours</span><p>{siteConfig.hours[0].days}: {siteConfig.hours[0].time}</p><p>{siteConfig.hours[1].days}: {siteConfig.hours[1].time}</p></div>
      <div className="footer-bottom"><p>© {new Date().getFullYear()} Demian Insurance Agency</p><p>{siteConfig.serviceRegion}</p></div>
    </footer>
  );
}
