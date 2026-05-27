"use client";

import { motion } from "framer-motion";
import { FadeUp, StaggerContainer, ScaleIn, HoverCard } from "@/components/ui/motion";
import { fadeUp } from "@/components/ui/motion";

const credentials = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
      </svg>
    ),
    value: "Hundreds",
    label: "Of Brand Deals Closed",
    description: "We've closed hundreds of deals with the biggest direct-response brands in podcast advertising. We don't cold-pitch — we pick up the phone and talk to buyers we already know.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
      </svg>
    ),
    value: "Direct",
    label: "Relationships With DR Brands",
    description: "We have existing relationships with the major direct-response advertisers that are actively buying podcast inventory right now. Your show gets into the room — not into a queue.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
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
    <section id="results" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <FadeUp className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-[var(--color-brand-400)] mb-3">
            Track Record
          </p>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Proven{" "}
            <span className="gradient-text">Results in Podcast Sales</span>
          </h2>
          <p className="mt-4 text-[var(--color-text-secondary)] max-w-xl mx-auto">
            We&apos;ve spent years building direct relationships with the biggest DR brands in podcasting. When we pitch your show, we&apos;re talking to buyers who already take our calls.
          </p>
        </FadeUp>

        <StaggerContainer className="grid md:grid-cols-3 gap-6">
          {credentials.map((cred) => (
            <motion.div key={cred.label} variants={fadeUp}>
              <HoverCard className="h-full">
                <div className="relative p-8 rounded-2xl bg-[var(--color-surface-card)] border border-white/5 h-full flex flex-col gradient-border">
                  <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--color-brand-500)]/20 to-[var(--color-accent-500)]/20 text-[var(--color-brand-400)] mb-5">
                    {cred.icon}
                  </div>
                  <div className="text-3xl font-extrabold gradient-text mb-1">
                    {cred.value}
                  </div>
                  <h3 className="text-base font-bold mb-3">{cred.label}</h3>
                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed flex-1">
                    {cred.description}
                  </p>
                </div>
              </HoverCard>
            </motion.div>
          ))}
        </StaggerContainer>

        {/* Trust strip */}
        <FadeUp delay={0.3}>
          <div className="mt-16 p-8 rounded-2xl bg-[var(--color-surface-card)] border border-white/5 text-center">
            <p className="text-[var(--color-text-secondary)] text-sm mb-6">
              Categories we&apos;ve closed deals in
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {[
                "SaaS & Tech",
                "DTC / E-Commerce",
                "Finance & Fintech",
                "Health & Wellness",
                "Education",
                "Entertainment",
                "CPG & Retail",
                "B2B Services",
              ].map((cat) => (
                <span
                  key={cat}
                  className="px-4 py-2 rounded-full text-xs font-medium border border-white/10 text-[var(--color-text-muted)] hover:border-[var(--color-brand-500)]/30 hover:text-[var(--color-brand-400)] transition-colors"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
