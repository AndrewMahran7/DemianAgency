import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { siteUrl } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: siteUrl ?? undefined,
  title: "Demian Insurance Agency | Personal Insurance Guidance in Florida",
  description: "Personal guidance for Florida auto, home, life, and small-business insurance from Demian Insurance Agency.",
  robots: { index: true, follow: true },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
