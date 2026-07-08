"use client";

import { memo, useEffect, useRef } from "react";
import { FadeUp } from "@/components/ui/motion";

interface Brand {
  name: string;
  slug: string;
  ext: "svg" | "png";
}

// Pre-determined extensions — matches what's actually on disk in public/brands.
// Eliminates the runtime probe + failed-request retries that were causing jank.
const brands: Brand[] = [
  { name: "Shopify", slug: "shopify", ext: "png" },
  { name: "BetterHelp", slug: "betterhelp", ext: "png" },
  { name: "DraftKings", slug: "draftkings", ext: "png" },
  { name: "FanDuel", slug: "fanduel", ext: "png" },
  { name: "HelloFresh", slug: "hellofresh", ext: "png" },
  { name: "Factor", slug: "factor", ext: "svg" },
  { name: "PrizePicks", slug: "prizepicks", ext: "svg" },
  { name: "Acorns", slug: "acorns", ext: "svg" },
  { name: "Greenlight", slug: "greenlight", ext: "svg" },
  { name: "Quince", slug: "quince", ext: "png" },
  { name: "Aura Frames", slug: "aura-frames", ext: "png" },
  { name: "Underdog Fantasy", slug: "underdog-fantasy", ext: "png" },
  { name: "Dutch Pets", slug: "dutch-pets", ext: "svg" },
  { name: "Rula", slug: "rula", ext: "svg" },
];

// Memoized so React doesn't re-render 42 instances when a sibling hovers.
const BrandLogo = memo(function BrandLogo({ brand }: { brand: Brand }) {
  return (
    <div
      className="brand-pill group flex-shrink-0 inline-flex items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] transition-[border-color,background-color,box-shadow] duration-300 ease-out hover:border-[rgba(249,112,102,0.35)] hover:bg-[rgba(249,112,102,0.06)] hover:shadow-[0_0_25px_-5px_rgba(249,112,102,0.12)]"
      style={{
        minWidth: 140,
        height: 60,
        padding: "14px 28px",
        boxSizing: "border-box",
        contain: "paint",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/brands/${brand.slug}.${brand.ext}`}
        alt={brand.name}
        loading="eager"
        decoding="async"
        draggable={false}
        className="opacity-75 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          height: 28,
          width: "auto",
          maxWidth: 180,
          objectFit: "contain",
          userSelect: "none",
        }}
      />
    </div>
  );
});

function MarqueeRow({
  items,
  direction = "left",
  duration = 35,
}: {
  items: Brand[];
  direction?: "left" | "right";
  duration?: number;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Respect users with reduced-motion preference — don't animate at all.
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) return;

    const keyframes =
      direction === "left"
        ? [
            { transform: "translate3d(0, 0, 0)" },
            { transform: "translate3d(-33.3333%, 0, 0)" },
          ]
        : [
            { transform: "translate3d(-33.3333%, 0, 0)" },
            { transform: "translate3d(0, 0, 0)" },
          ];

    const anim = track.animate(keyframes, {
      duration: duration * 1000,
      iterations: Infinity,
      easing: "linear",
    });

    // Pause when tab is hidden — saves CPU and prevents a jump on return.
    const onVis = () => {
      if (document.hidden) anim.pause();
      else anim.play();
    };
    document.addEventListener("visibilitychange", onVis);

    // Slow down (not stop) on hover.
    const pause = () => {
      anim.playbackRate = 0.3;
    };
    const resume = () => {
      anim.playbackRate = 1;
    };
    track.addEventListener("mouseenter", pause);
    track.addEventListener("mouseleave", resume);

    return () => {
      anim.cancel();
      document.removeEventListener("visibilitychange", onVis);
      track.removeEventListener("mouseenter", pause);
      track.removeEventListener("mouseleave", resume);
    };
  }, [direction, duration]);

  const tripled = [...items, ...items, ...items];

  return (
    <div style={{ overflow: "hidden" }}>
      <div
        ref={trackRef}
        style={{
          display: "flex",
          gap: "1rem",
          width: "max-content",
          willChange: "transform",
          // Promote to its own compositor layer.
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
        }}
      >
        {tripled.map((brand, i) => (
          <BrandLogo key={`${brand.slug}-${i}`} brand={brand} />
        ))}
      </div>
    </div>
  );
}

export default function BrandStrip() {
  const row1 = brands.slice(0, 7);
  const row2 = brands.slice(7);

  return (
    <section className="relative pt-6 pb-16 sm:pt-8 sm:pb-20 overflow-hidden">
      {/* Top divider */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "12rem",
          height: "1px",
          background:
            "linear-gradient(to right, transparent, rgba(249,112,102,0.2), transparent)",
        }}
      />

      {/* Heading */}
      <FadeUp>
        <div className="text-center mb-10 px-6">
          <p className="eyebrow eyebrow--rules mb-3">Brand Partners</p>
          <h2
            className="text-2xl sm:text-3xl font-bold tracking-tight"
            style={{ color: "rgba(255,255,255,0.9)" }}
          >
            Direct access to brands{" "}
            <span className="serif-accent text-[var(--color-brand-400)] text-[1.15em]">
              actively buying
            </span>{" "}
            podcast ads
          </h2>
        </div>
      </FadeUp>

      {/* Carousel */}
      <div
        className="relative"
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        {/* Fade edges */}
        <div
          style={{
            pointerEvents: "none",
            position: "absolute",
            inset: "0",
            right: "auto",
            width: "8rem",
            zIndex: 10,
            background:
              "linear-gradient(to right, var(--color-surface), transparent)",
          }}
        />
        <div
          style={{
            pointerEvents: "none",
            position: "absolute",
            inset: "0",
            left: "auto",
            width: "8rem",
            zIndex: 10,
            background:
              "linear-gradient(to left, var(--color-surface), transparent)",
          }}
        />

        <MarqueeRow items={row1} direction="left" duration={35} />
        <MarqueeRow items={row2} direction="right" duration={40} />
      </div>

      {/* Bottom divider */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "12rem",
          height: "1px",
          background:
            "linear-gradient(to right, transparent, rgba(139,92,246,0.2), transparent)",
        }}
      />
    </section>
  );
}
