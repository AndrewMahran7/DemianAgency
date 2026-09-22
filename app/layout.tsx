import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Demian Insurance Agency | Southwest Florida",
  description:
    "Personal insurance guidance for homes, vehicles, families, and businesses across Southwest Florida.",
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
      <body>{children}</body>
    </html>
  );
}
