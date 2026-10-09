import Image from "next/image";
import Link from "next/link";

const logoByVariant = {
  compact: {
    src: "/images/brand/demian-logo-horizontal.png",
    width: 2380,
    height: 920,
  },
  full: {
    src: "/images/brand/demian-logo-full.png",
    width: 2370,
    height: 1000,
  },
} as const;

export function Brand({ variant = "compact", priority = false }: {
  variant?: keyof typeof logoByVariant;
  priority?: boolean;
}) {
  const logo = logoByVariant[variant];
  const accessibleName = variant === "full"
    ? "Demian Insurance Agency — Family owned, serving Southwest Florida; home"
    : "Demian Insurance Agency home";

  return (
    <Link className={`brand brand--${variant}`} href="/" aria-label={accessibleName}>
      <Image
        alt=""
        height={logo.height}
        priority={priority}
        sizes={variant === "compact" ? "(max-width: 760px) 200px, 170px" : "(max-width: 760px) 330px, 420px"}
        src={logo.src}
        width={logo.width}
      />
    </Link>
  );
}
