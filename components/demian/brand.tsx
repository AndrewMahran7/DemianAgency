import Link from "next/link";

const logoByVariant = {
  header: {
    src: "/images/brand/demian-logo-header-compact.svg",
    desktopSrc: "/images/brand/demian-logo-header.svg",
    width: 2380,
    height: 920,
  },
  drawer: {
    src: "/images/brand/demian-logo-drawer.svg",
    width: 2380,
    height: 920,
  },
  footer: {
    src: "/images/brand/demian-logo-footer.svg",
    width: 2370,
    height: 1000,
  },
} as const;

export function Brand({ variant = "header", priority = false }: {
  variant?: keyof typeof logoByVariant;
  priority?: boolean;
}) {
  const logo = logoByVariant[variant];

  return (
    <Link className={`brand brand--${variant}`} href="/" aria-label="Demian Insurance Agency">
      <picture>
        {"desktopSrc" in logo ? <source media="(min-width: 1360px)" srcSet={logo.desktopSrc} /> : null}
        <img
          alt=""
          decoding="async"
          fetchPriority={priority ? "high" : undefined}
          height={logo.height}
          loading={priority ? "eager" : "lazy"}
          src={logo.src}
          width={logo.width}
        />
      </picture>
    </Link>
  );
}
