"use client";

import { FadeUp } from "@/components/ui/motion";
import { GlassCard } from "@/components/ui/glass-card";

const steps = [
  {
    number: "01",
    title: "Let's Connect",
    description:
      "Tell us about your show, audience, and goals. We review your analytics and listener demographics to build your media kit.",
    accent: "var(--color-brand-500)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "We Pitch Brands",
    description:
      "Our team actively pitches your show to relevant advertisers. We use direct relationships and data-driven targeting to match brands that fit your audience.",
    accent: "var(--color-accent-500)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Close the Deal",
    description:
      "We negotiate rates and handle contracts. Once the deal is signed, the brand works directly with you on delivery — your show, your workflow.",
    accent: "var(--color-brand-400)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Get Paid",
    description:
      "You earn revenue every month. We take a transparent 15–25% commission that slides lower for larger shows — no hidden fees, no surprises.",
    accent: "var(--color-accent-400)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <FadeUp className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-[var(--color-brand-400)] mb-3">
            The Process
          </p>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Four Steps to{" "}
            <span className="gradient-text">More Revenue</span>
          </h2>
        </FadeUp>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <GlassCard
              key={step.number}
              accent={step.accent}
              intensity="premium"
              index={i}
            >
              <div className="p-6 flex flex-col h-full">
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="flex items-center justify-center w-11 h-11 rounded-xl bg-white/[0.04] border border-white/10"
                    style={{ color: step.accent }}
                  >
                    {step.icon}
                  </div>
                  <span className="text-xs font-bold text-[var(--color-text-muted)] tracking-widest">
                    STEP {step.number}
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-2 text-white">{step.title}</h3>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  {step.description}
                </p>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
