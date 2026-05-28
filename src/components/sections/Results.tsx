"use client";

import { motion } from "framer-motion";
import { FadeUp } from "@/components/ui/motion";
import { GlassCard } from "@/components/ui/glass-card";

const BRAND = "var(--color-brand-500)";
const ACCENT = "var(--color-accent-500)";

const categories = [
  {
    label: "Sports Betting & DFS",
    accent: BRAND,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4zM7 4H4v3a3 3 0 0 0 3 3M17 4h3v3a3 3 0 0 1-3 3" />
      </svg>
    ),
  },
  {
    label: "Meal Kits & Food Delivery",
    accent: ACCENT,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <path d="M3 7l3-3h12l3 3v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7zM3 7h18M10 11v5M14 11v5" />
      </svg>
    ),
  },
  {
    label: "Bedding & Sleep",
    accent: BRAND,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    ),
  },
  {
    label: "Beverages",
    accent: ACCENT,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <path d="M10 3h4v3l1.5 2v12a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1V8L10 6V3zM9 11h6" />
      </svg>
    ),
  },
  {
    label: "Finance & Investing",
    accent: BRAND,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <ellipse cx="12" cy="6" rx="7" ry="2.5" />
        <path d="M5 6v4c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V6M5 10v4c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-4M5 14v4c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-4" />
      </svg>
    ),
  },
  {
    label: "Telehealth & Mental Health",
    accent: ACCENT,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <path d="M12 3a3.5 3.5 0 0 0-3.5 3.5A3 3 0 0 0 5 9.5v0a3 3 0 0 0-1 5.7v0a3 3 0 0 0 3 3v.3a2.5 2.5 0 0 0 2.5 2.5h2A2.5 2.5 0 0 0 14 18.5v-.3a3 3 0 0 0 3-3v0a3 3 0 0 0 3-3v0a3 3 0 0 0-1-5.7A3 3 0 0 0 15.5 6.5 3.5 3.5 0 0 0 12 3zM12 3v18" />
      </svg>
    ),
  },
  {
    label: "DTC & E-Commerce",
    accent: BRAND,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4H6zM3 6h18M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
  },
  {
    label: "Mobile Apps & Games",
    accent: ACCENT,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <path d="M5 9h14a3 3 0 0 1 3 3v3a3 3 0 0 1-3 3h-1l-2-3H8l-2 3H5a3 3 0 0 1-3-3v-3a3 3 0 0 1 3-3z" />
        <path d="M7 12v3M5.5 13.5h3M15 12h.01M17 14h.01M17.5 11h.01M14.5 14h.01" />
      </svg>
    ),
  },
  {
    label: "Pet Food & Wellness",
    accent: BRAND,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <circle cx="8" cy="7" r="2" />
        <circle cx="16" cy="7" r="2" />
        <circle cx="4" cy="12" r="2" />
        <circle cx="20" cy="12" r="2" />
        <path d="M12 22a4 4 0 0 1-4-4c0-3 4-7 4-7s4 4 4 7a4 4 0 0 1-4 4z" />
      </svg>
    ),
  },
  {
    label: "Apparel & Underwear",
    accent: ACCENT,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <circle cx="12" cy="5" r="2" />
        <path d="M12 7v2a1 1 0 0 0 .55.9l8.2 4.1c.83.42.53 1.5-.4 1.5H3.65c-.93 0-1.23-1.08-.4-1.5l8.2-4.1A1 1 0 0 0 12 9" />
      </svg>
    ),
  },
  {
    label: "CPG & Snacks",
    accent: BRAND,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <path d="M7 4l-1 2v14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V6l-1-2H7zM6 6h12M9 11h6M9 15h6" />
      </svg>
    ),
  },
  {
    label: "Smart Home & Tech",
    accent: ACCENT,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <path d="M5 13a10 10 0 0 1 14 0M8.5 16.5a5 5 0 0 1 7 0" />
        <circle cx="12" cy="20" r="0.8" fill="currentColor" />
      </svg>
    ),
  },
];

const pillVariant = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: "easeOut" as const } },
};

const pillStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
};

const credentials = [
  {
    accent: "var(--color-brand-500)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
      </svg>
    ),
    value: "Hundreds",
    label: "Of Brand Deals Closed",
    description: "We've closed hundreds of deals with the biggest direct-response brands in podcast advertising. We don't cold-pitch — we pick up the phone and talk to buyers we already know.",
  },
  {
    accent: "var(--color-accent-500)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
      </svg>
    ),
    value: "Direct",
    label: "Relationships With DR Brands",
    description: "We have existing relationships with the major direct-response advertisers that are actively buying podcast inventory right now. Your show gets into the room — not into a queue.",
  },
  {
    accent: "var(--color-brand-400)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
      </svg>
    ),
    value: "Data-Backed",
    label: "Ad Intelligence Platform",
    description: "Powered by proprietary tech that tracks real ad placements across thousands of podcasts — so we pitch brands with proof, not guesses.",
  },
];

export default function Results() {
  return (
    <section id="results" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <FadeUp className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-[var(--color-brand-400)] mb-3">
            Track Record
          </p>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Proven <span className="gradient-text">Results in Podcast Sales</span>
          </h2>
          <p className="mt-4 text-[var(--color-text-secondary)] max-w-xl mx-auto">
            We&apos;ve spent years building direct relationships with the biggest DR brands in podcasting. When we pitch your show, we&apos;re talking to buyers who already take our calls.
          </p>
        </FadeUp>

        <div className="grid md:grid-cols-3 gap-6">
          {credentials.map((cred, i) => (
            <GlassCard key={cred.label} accent={cred.accent} intensity="premium" index={i}>
              <div className="p-8 flex flex-col h-full">
                <div
                  className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 mb-5 transition-colors duration-300 group-hover:bg-white/[0.06] group-hover:border-white/20"
                  style={{ color: cred.accent }}
                >
                  {cred.icon}
                </div>
                <div className="text-3xl font-extrabold gradient-text mb-1 tracking-tight">
                  {cred.value}
                </div>
                <h3 className="text-base font-bold mb-3 text-white">{cred.label}</h3>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed flex-1">
                  {cred.description}
                </p>
              </div>
            </GlassCard>
          ))}
        </div>

        <div className="mt-16">
          <GlassCard intensity="premium" accent="var(--color-brand-500)" index={3}>
            <div className="p-8 sm:p-10 text-center">
              <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-brand-400)] mb-2 relative">
                Categories
              </p>
              <p className="text-[var(--color-text-secondary)] text-sm mb-8 relative">
                Brands we&apos;ve closed deals with across every major podcast ad vertical
              </p>
              <motion.div
                variants={pillStagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                className="flex flex-wrap items-center justify-center gap-3 relative"
              >
                {categories.map((cat) => (
                  <motion.span
                    key={cat.label}
                    variants={pillVariant}
                    whileHover={{ y: -3, scale: 1.06 }}
                    transition={{ type: "spring", stiffness: 320, damping: 18 }}
                    style={
                      {
                        "--pill-accent": cat.accent,
                        color: cat.accent,
                        borderColor: `color-mix(in srgb, ${cat.accent} 28%, transparent)`,
                        backgroundColor: `color-mix(in srgb, ${cat.accent} 6%, transparent)`,
                      } as React.CSSProperties
                    }
                    className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold border transition-[background-color,border-color,box-shadow,color] duration-300 cursor-default select-none hover:[border-color:var(--pill-accent)] hover:[background-color:color-mix(in_srgb,var(--pill-accent)_14%,transparent)] hover:shadow-[0_0_26px_-4px_var(--pill-accent)]"
                  >
                    <span className="opacity-80 group-hover:opacity-100 transition-opacity" style={{ color: cat.accent }}>
                      {cat.icon}
                    </span>
                    <span className="opacity-90 group-hover:opacity-100 transition-opacity">
                      {cat.label}
                    </span>
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
