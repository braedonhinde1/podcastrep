"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FadeUp, StaggerContainer } from "@/components/ui/motion";
import { fadeUp } from "@/components/ui/motion";

const faqs = [
  {
    q: "What size show do you work with?",
    a: "We work with shows getting 5,000+ downloads per episode. Whether you're at 5K or 500K, we can help you monetize more effectively than going it alone.",
  },
  {
    q: "How much does it cost?",
    a: "Zero upfront. We take a transparent commission on deals we close — typically 5-15% depending on scale. Bigger shows get lower rates. If we don't sell, you don't pay.",
  },
  {
    q: "Do I lose creative control?",
    a: "Never. You approve every brand, every script, and every placement before it goes live. We bring the deals — you decide what fits your show.",
  },
  {
    q: "How is this different from joining a podcast network?",
    a: "Networks often require exclusivity, take equity, or bundle your show with hundreds of others. We're purely ad sales representation — no content control, no lock-in, no equity. You can leave anytime.",
  },
  {
    q: "How long until I see my first deal?",
    a: "Most creators see their first deal within 30-60 days of onboarding. It depends on your niche, audience size, and the time of year (Q4 is always hot).",
  },
  {
    q: "Do you handle ad ops and delivery?",
    a: "No — and that's by design. We focus purely on selling your ad inventory and closing deals. Once the contract is signed, you manage the ad delivery your way. We stay out of your creative process.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="border-b border-white/5 cursor-pointer group"
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center justify-between py-5">
        <h3 className="text-base font-semibold pr-4 group-hover:text-[var(--color-brand-400)] transition-colors">
          {q}
        </h3>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 text-xl text-[var(--color-text-muted)]"
        >
          +
        </motion.span>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm text-[var(--color-text-secondary)] leading-relaxed">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="py-28 px-6">
      <div className="max-w-3xl mx-auto">
        <FadeUp className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-[var(--color-accent-400)] mb-3">
            FAQ
          </p>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Questions?{" "}
            <span className="gradient-text">Answers.</span>
          </h2>
        </FadeUp>

        <StaggerContainer>
          {faqs.map((faq) => (
            <motion.div key={faq.q} variants={fadeUp}>
              <FAQItem q={faq.q} a={faq.a} />
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
