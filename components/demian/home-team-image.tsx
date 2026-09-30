import Image from "next/image";

export const homeTeamImage = {
  src: "/images/home/florida-seven-mile-bridge.jpg",
  alt: "Seven Mile Bridge crossing coastal water in Marathon, Florida",
} as const;

export function HomeTeamImage({ className = "" }: { className?: string }) {
  return (
    <div className={`home-team-image ${className}`.trim()}>
      <Image
        src={homeTeamImage.src}
        alt={homeTeamImage.alt}
        fill
        quality={82}
        sizes="(max-width: 760px) calc(100vw - 44px), (max-width: 1100px) calc(100vw - 12vw), 54vw"
      />
    </div>
  );
}
