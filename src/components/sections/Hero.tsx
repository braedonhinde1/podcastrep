"use client";

import { motion } from "framer-motion";
import { TextReveal, FadeUp } from "@/components/ui/motion";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-[var(--color-brand-500)]/30 bg-[var(--color-brand-500)]/10 text-sm font-medium text-[var(--color-brand-400)]"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-brand-400)] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-brand-400)]" />
          </span>
          Now Accepting New Shows
        </motion.div>

        {/* Headline */}
        <TextReveal
          as="h1"
          text="Premium Ad Sales Representation for Your Podcast"
          className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight mb-6"
        />

        <FadeUp delay={0.5}>
          <p className="text-lg sm:text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto mb-10 leading-relaxed">
            We have the direct connections to get your show in the room with major DR brands.
            You keep creating — we handle the sales.
            Non-exclusive representation that works alongside your existing partners.
          </p>
        </FadeUp>

        {/* CTA buttons */}
        <FadeUp delay={0.7}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#cta"
              className="group relative px-8 py-4 text-base font-bold rounded-full bg-gradient-to-r from-[var(--color-brand-500)] to-[var(--color-accent-500)] text-white shadow-lg shadow-[var(--color-brand-500)]/25 hover:shadow-xl hover:shadow-[var(--color-brand-500)]/30 transition-all"
            >
              Apply for Representation
              <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">
                &rarr;
              </span>
            </a>
            <a
              href="#how-it-works"
              className="px-8 py-4 text-base font-semibold rounded-full border border-white/15 text-[var(--color-text-secondary)] hover:border-white/30 hover:text-[var(--color-text-primary)] transition-all backdrop-blur-sm"
            >
              See How It Works
            </a>
          </div>
        </FadeUp>

        {/* Stats row */}
        <FadeUp delay={0.9}>
          <div className="mt-20 grid grid-cols-3 gap-8 max-w-lg mx-auto">
            {[
              { value: "Hundreds", label: "Of Brand Deals Closed" },
              { value: "Non-Exclusive", label: "Keep Your Network" },
              { value: "$0", label: "Upfront Cost" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl sm:text-4xl font-extrabold gradient-text">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-[var(--color-text-muted)] mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
