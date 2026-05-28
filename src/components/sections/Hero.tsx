"use client";

import { motion } from "framer-motion";
import { TextReveal, FadeUp } from "@/components/ui/motion";
import { GlassCard } from "@/components/ui/glass-card";

export default function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-16 pb-16">
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
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
          Now Booking 2026 Inventory
        </motion.div>

        <TextReveal
          as="h1"
          text="Premium Ad Sales Representation for Your Podcast"
          className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight mb-6"
        />

        <FadeUp delay={0.5}>
          <p className="text-lg sm:text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto mb-10 leading-relaxed">
            We have active relationships with every major direct-response agency buying podcast inventory right now. You keep creating — we close the deals. Non-exclusive, no lock-in, 10K+ downloads per episode.
          </p>
        </FadeUp>

        <FadeUp delay={0.7}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#cta"
              className="group relative inline-block p-[1.5px] rounded-full overflow-hidden shadow-lg shadow-[var(--color-brand-500)]/30 hover:shadow-2xl hover:shadow-[var(--color-brand-500)]/50 transition-shadow duration-300"
            >
              <motion.span
                aria-hidden
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-100%] pointer-events-none"
                style={{
                  background: "conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(255,255,255,0.9) 60deg, transparent 130deg, transparent 360deg)",
                  opacity: 0.55,
                }}
              />
              <span className="relative block px-8 py-4 text-base font-bold rounded-full bg-gradient-to-r from-[var(--color-brand-500)] to-[var(--color-accent-500)] text-white overflow-hidden">
                <span
                  aria-hidden
                  className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg] group-hover:translate-x-full transition-transform duration-700 ease-out pointer-events-none"
                />
                <span className="relative">
                  Let&apos;s See If We&apos;re a Fit
                  <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">&rarr;</span>
                </span>
              </span>
            </a>
            <a
              href="#how-it-works"
              className="group relative inline-block rounded-full overflow-hidden"
            >
              <span
                aria-hidden
                className="absolute inset-0 rounded-full pointer-events-none transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  padding: "1.5px",
                  background: "linear-gradient(135deg, var(--color-brand-500) 0%, rgba(255,255,255,0.12) 50%, var(--color-accent-500) 100%)",
                  WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                  opacity: 0.55,
                }}
              />
              <span className="relative block px-8 py-4 text-base font-semibold rounded-full backdrop-blur-xl bg-white/[0.04] text-[var(--color-text-secondary)] group-hover:bg-white/[0.07] group-hover:text-[var(--color-text-primary)] transition-colors duration-300 overflow-hidden">
                <span
                  aria-hidden
                  className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-20deg] group-hover:translate-x-full transition-transform duration-700 ease-out pointer-events-none"
                />
                <span className="relative">See How It Works</span>
              </span>
            </a>
          </div>
        </FadeUp>

        <FadeUp delay={0.9}>
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {[
              { value: "Top DR Agencies", label: "Direct Relationships", accent: "var(--color-brand-500)" },
              { value: "10K+ / Ep", label: "Minimum, No Ceiling", accent: "var(--color-accent-500)" },
              { value: "15-25%", label: "Commission, Sliding Lower", accent: "var(--color-brand-400)" },
            ].map((stat, i) => (
              <GlassCard
                key={stat.label}
                intensity="premium"
                accent={stat.accent}
                index={i}
                animateIn={false}
              >
                <div className="h-24 px-4 flex flex-col items-center justify-center text-center">
                  <div className="text-xl sm:text-2xl font-extrabold gradient-text leading-tight tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-[var(--color-text-muted)] mt-1">
                    {stat.label}
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
