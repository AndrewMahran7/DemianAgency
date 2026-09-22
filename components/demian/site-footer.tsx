import Link from "next/link";
import { Brand } from "./brand";
import { services, siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-brand"><Brand /><p>Personal guidance for homes, vehicles, families, and businesses across {siteConfig.region}.</p></div>
      <div className="footer-links">
        <div><span>Insurance</span>{services.map((service) => <Link key={service.name} href={service.href}>{service.name}</Link>)}</div>
        <div><span>Agency</span>{siteConfig.navigation.slice(1).map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}</div>
        <div><span>Information</span><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></div>
      </div>
      <div className="footer-bottom"><p>© {new Date().getFullYear()} Demian Insurance Agency</p><p>{siteConfig.region}</p></div>
    </footer>
  );
}
