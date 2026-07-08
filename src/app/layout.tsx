import type { Metadata } from "next";
import "./globals.css";
import ShaderBackground from "@/components/ShaderBackground";

export const metadata: Metadata = {
  title: "PodcastRep — Podcast Ad Sales Representation",
  description:
    "Independent podcast ad sales representation. Direct relationships with the agencies buying podcast inventory right now — you keep creating, we close the deals.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Instrument+Serif:ital@0;1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="noise">
        <ShaderBackground />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
