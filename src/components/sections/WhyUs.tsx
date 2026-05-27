"use client";

import { FadeUp, SlideLeft, SlideRight } from "@/components/ui/motion";

const features = [
  {
    title: "Data-Driven Matching",
    description:
      "We use real ad intelligence data to match your show with brands that are already spending in your category. No cold outreach — warm, informed pitches.",
    gradient: "from-[var(--color-brand-500)] to-[var(--color-brand-400)]",
  },
  {
    title: "Indie-First, Always",
    description:
      "Big networks cherry-pick the top 1%. We specialize in shows with 5K-100K downloads that are undervalued by traditional ad sales teams.",
    gradient: "from-[var(--color-accent-500)] to-[var(--color-accent-400)]",
  },
  {
    title: "Transparent Deals",
    description:
      "You see every offer, every rate, every contract. No black-box pricing. No inventory sold behind your back. Your show, your rules.",
    gradient: "from-[var(--color-brand-400)] to-[var(--color-accent-500)]",
  },
  {
    title: "Sales Only, No Strings",
    description:
      "We sell your inventory and hand off the deal. You manage your own ad ops, creative, and delivery however you want. Pure sales representation.",
    gradient: "from-[var(--color-accent-400)] to-[var(--color-brand-500)]",
  },
];

export default function WhyUs() {
  return (
    <section
      id="why-us"
      className="py-28 px-6 bg-gradient-to-b from-transparent via-[var(--color-surface-raised)]/50 to-transparent"
    >
      <div className="max-w-6xl mx-auto">
        <FadeUp className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-[var(--color-accent-400)] mb-3">
            Why PodcastRep
          </p>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Built for{" "}
            <span className="gradient-text">Independent Creators</span>
          </h2>
          <p className="mt-4 text-[var(--color-text-secondary)] max-w-xl mx-auto">
            We&apos;re not a network and we&apos;re not an ad ops shop. We&apos;re purely your sales team — we find the brands, close the deals, and get out of the way.
          </p>
        </FadeUp>

        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, i) => {
            const Wrapper = i % 2 === 0 ? SlideLeft : SlideRight;
            return (
              <Wrapper key={feature.title} delay={i * 0.1}>
                <div className="group relative p-8 rounded-2xl bg-[var(--color-surface-card)] border border-white/5 hover:border-white/10 transition-colors h-full">
                  {/* Gradient accent line */}
                  <div
                    className={`absolute top-0 left-8 right-8 h-px bg-gradient-to-r ${feature.gradient} opacity-40 group-hover:opacity-70 transition-opacity`}
                  />
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-[var(--color-text-secondary)] leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Wrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}
