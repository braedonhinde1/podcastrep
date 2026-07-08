"use client";

import { motion, type Variants } from "framer-motion";

const lineReveal: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(10px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay: 0.25 + i * 0.14,
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const stats = [
  { value: "Top DR Agencies", label: "Direct Relationships" },
  { value: "10K+ / Episode", label: "Minimum, No Ceiling" },
  { value: "15–25%", label: "Commission, Sliding Lower" },
];

export default function Hero() {
  return (
    <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden pt-24 pb-16">
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 mb-10 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm text-[13px] font-medium text-[var(--color-text-secondary)]"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-brand-400)] opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[var(--color-brand-400)]" />
          </span>
          Now booking 2026 inventory
        </motion.div>

        <h1 className="text-5xl sm:text-6xl lg:text-[5.25rem] font-extrabold leading-[1.02] tracking-[-0.03em] mb-8">
          <motion.span
            custom={0}
            variants={lineReveal}
            initial="hidden"
            animate="visible"
            className="block"
          >
            Your show, sold to buyers
          </motion.span>
          <motion.span
            custom={1}
            variants={lineReveal}
            initial="hidden"
            animate="visible"
            className="serif-accent block text-[var(--color-brand-400)] mt-1"
          >
            who already take our calls.
          </motion.span>
        </h1>

        <motion.p
          custom={2}
          variants={lineReveal}
          initial="hidden"
          animate="visible"
          className="text-lg sm:text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Active relationships with every major direct-response agency buying
          podcast inventory right now. You keep creating — we close the deals.
          Non-exclusive, no lock-in, 10K+ downloads per episode.
        </motion.p>

        <motion.div
          custom={3}
          variants={lineReveal}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <a
            href="#cta"
            className="group relative inline-flex items-center gap-2 px-8 py-4 text-base font-bold rounded-full bg-white text-[#0a0a0f] shadow-[0_0_40px_-12px_rgba(255,255,255,0.4)] hover:shadow-[0_0_60px_-12px_rgba(240,68,56,0.45)] hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
          >
            <span
              aria-hidden
              className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-black/[0.06] to-transparent skew-x-[-20deg] group-hover:translate-x-full transition-transform duration-700 ease-out pointer-events-none"
            />
            <span className="relative">Let&apos;s see if we&apos;re a fit</span>
            <span className="relative inline-block transition-transform group-hover:translate-x-1">
              &rarr;
            </span>
          </a>
          <a
            href="#how-it-works"
            className="group inline-flex items-center gap-2 text-base font-semibold text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors duration-300"
          >
            <span className="border-b border-white/20 group-hover:border-[var(--color-brand-400)] pb-0.5 transition-colors duration-300">
              See how it works
            </span>
            <span className="inline-block transition-transform group-hover:translate-y-0.5">
              &darr;
            </span>
          </a>
        </motion.div>

        <motion.div
          custom={4}
          variants={lineReveal}
          initial="hidden"
          animate="visible"
          className="mt-20 max-w-3xl mx-auto"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 border-y border-white/[0.08] divide-y sm:divide-y-0 sm:divide-x divide-white/[0.08]">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="py-6 px-4 flex flex-col items-center justify-center text-center"
              >
                <div className="text-xl sm:text-[1.35rem] font-bold text-white leading-tight tracking-tight">
                  {stat.value}
                </div>
                <div className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-text-muted)] mt-2">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
