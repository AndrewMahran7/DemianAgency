"use client";

import Link from "next/link";
import { ArrowRight, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { siteConfig } from "@/lib/site-config";
import { Brand } from "./brand";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <Brand />
      <nav className="desktop-nav" aria-label="Primary navigation">
        {siteConfig.navigation.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
      </nav>
      <div className="header-actions">
        <Link className="header-service-link" href={siteConfig.requestServiceHref}>Client Service</Link>
        <Link className="button button-small header-cta" href={siteConfig.requestQuoteHref}>
          Request a Quote <ArrowRight aria-hidden="true" size={16} />
        </Link>
      </div>
      <Sheet>
        <SheetTrigger className="menu-trigger" aria-label="Open navigation menu">
          <Menu aria-hidden="true" size={21} />
        </SheetTrigger>
        <SheetContent className="mobile-sheet" side="right">
          <SheetHeader className="mobile-sheet-header">
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            <SheetDescription className="sr-only">Demian Insurance Agency site navigation</SheetDescription>
            <Brand />
          </SheetHeader>
          <nav className="mobile-nav" aria-label="Mobile navigation">
            {siteConfig.navigation.map((item, index) => (
              <SheetClose key={item.href} asChild>
                <Link href={item.href}><span>0{index + 1}</span>{item.label}</Link>
              </SheetClose>
            ))}
          </nav>
          <div className="mobile-sheet-footer">
            <p>Looking for coverage or help with an existing policy?</p>
            <SheetClose asChild><Link className="button" href={siteConfig.requestQuoteHref}>Request a Quote <ArrowRight aria-hidden="true" size={17} /></Link></SheetClose>
            <SheetClose asChild><Link className="mobile-service-link" href={siteConfig.requestServiceHref}>Already a client? Request Service</Link></SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
