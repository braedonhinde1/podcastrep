import type { Metadata } from "next";
import "./globals.css";
import ShaderBackground from "@/components/ShaderBackground";

export const metadata: Metadata = {
  title: "PodcastRep — We Sell Your Ad Inventory",
  description:
    "Independent podcast ad sales representation. We find premium advertisers so you can focus on creating great content.",
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
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
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
