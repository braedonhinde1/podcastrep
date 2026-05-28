"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  type Transition,
} from "framer-motion";
import { useRef, type MouseEvent, type ReactNode } from "react";

export type GlassIntensity = "premium" | "subtle" | "minimal";

interface GlassCardProps {
  children: ReactNode;
  accent?: string;
  intensity?: GlassIntensity;
  index?: number;
  className?: string;
  innerClassName?: string;
  /** When true the card animates in via whileInView. Default true. */
  animateIn?: boolean;
}

/**
 * GlassCard — frosted-glass card with three intensities.
 *
 * premium  : rotating conic-gradient borders + cursor tilt (WhyUs / Results feature cards)
 * subtle   : static gradient border + cursor tilt (HowItWorks steps)
 * minimal  : frosted bg + hover lift + accent on hover (FAQ items, lightweight surfaces)
 */
export function GlassCard({
  children,
  accent = "var(--color-brand-500)",
  intensity = "premium",
  index = 0,
  className = "",
  innerClassName = "",
  animateIn = true,
}: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springConfig = { stiffness: 180, damping: 22 };
  const rotateXSpring = useSpring(rotateX, springConfig);
  const rotateYSpring = useSpring(rotateY, springConfig);

  const tiltEnabled = intensity !== "minimal";
  const maxTilt = intensity === "premium" ? 5 : 3;

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!tiltEnabled || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    rotateY.set(((x - cx) / cx) * maxTilt);
    rotateX.set(((cy - y) / cy) * maxTilt);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  const entrance = animateIn
    ? {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-60px" },
        transition: {
          duration: 0.55,
          delay: index * 0.08,
          ease: "easeOut" as const,
        } satisfies Transition,
      }
    : {};

  return (
    <motion.div
      {...entrance}
      style={tiltEnabled ? { perspective: 1200 } : undefined}
      className={`h-full ${className}`}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={
          tiltEnabled
            ? {
                rotateX: rotateXSpring,
                rotateY: rotateYSpring,
                transformStyle: "preserve-3d",
              }
            : undefined
        }
        whileHover={
          intensity === "minimal" ? { y: -2 } : undefined
        }
        className={
          "relative rounded-3xl overflow-hidden h-full group" +
          (intensity === "minimal"
            ? " transition-transform duration-300"
            : "")
        }
      >
        {/* Border layer */}
        {intensity === "premium" ? (
          <>
            <motion.div
              aria-hidden
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[-100%] pointer-events-none"
              style={{
                background: `conic-gradient(from 0deg at 50% 50%, transparent 0deg, ${accent} 50deg, transparent 110deg, transparent 360deg)`,
                opacity: 0.55,
              }}
            />
            <motion.div
              aria-hidden
              animate={{ rotate: -360 }}
              transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[-100%] pointer-events-none"
              style={{
                background: `conic-gradient(from 180deg at 50% 50%, transparent 0deg, ${accent} 35deg, transparent 80deg, transparent 360deg)`,
                opacity: 0.25,
              }}
            />
          </>
        ) : intensity === "subtle" ? (
          <div
            aria-hidden
            className="absolute inset-0 rounded-3xl pointer-events-none"
            style={{
              padding: "1.5px",
              background: `linear-gradient(135deg, ${accent}33 0%, rgba(255,255,255,0.06) 35%, rgba(255,255,255,0.02) 65%, ${accent}26 100%)`,
              WebkitMask:
                "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
              opacity: 0.9,
            }}
          />
        ) : (
          <div
            aria-hidden
            className="absolute inset-0 rounded-3xl border border-white/[0.06] group-hover:border-white/15 transition-colors duration-300 pointer-events-none"
          />
        )}

        {/* Inner glass surface */}
        <div
          className={
            "relative " +
            (intensity === "premium"
              ? "m-[1.5px] rounded-[calc(1.5rem-1.5px)] bg-[rgba(12,12,20,0.88)] backdrop-blur-xl h-[calc(100%-3px)]"
              : intensity === "subtle"
              ? "rounded-3xl bg-[rgba(12,12,20,0.7)] backdrop-blur-xl h-full"
              : "rounded-3xl bg-[rgba(12,12,20,0.55)] backdrop-blur-xl h-full") +
            " overflow-hidden " +
            innerClassName
          }
        >
          {/* Ambient inner top-glow (premium + subtle only) */}
          {intensity !== "minimal" && (
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-40 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse 60% 80% at 50% 0%, ${accent}, transparent 70%)`,
                filter: "blur(30px)",
                opacity: intensity === "premium" ? 0.18 : 0.12,
              }}
            />
          )}
          {/* Subtle grain (premium only) */}
          {intensity === "premium" && (
            <div
              aria-hidden
              className="absolute inset-0 opacity-[0.04] pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                backgroundSize: "24px 24px",
              }}
            />
          )}

          {/* Content */}
          <div className="relative h-full">{children}</div>
        </div>
      </motion.div>
    </motion.div>
  );
}
