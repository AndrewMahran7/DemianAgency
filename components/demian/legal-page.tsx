import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

export function LegalPage({ eyebrow, title, introduction, children }: {
  eyebrow: string;
  title: string;
  introduction: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      <main className="legal-page">
        <header className="legal-hero">
          <p className="eyebrow"><span />{eyebrow}</p>
          <h1>{title}</h1>
          <p className="legal-introduction">{introduction}</p>
          <p className="legal-updated">Last updated: September 23, 2026</p>
        </header>
        <article className="legal-article">{children}</article>
      </main>
      <SiteFooter />
    </>
  );
}

export function LegalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return <section><h2>{title}</h2>{children}</section>;
}
