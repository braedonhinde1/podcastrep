"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FadeUp, StaggerContainer } from "@/components/ui/motion";
import { fadeUp } from "@/components/ui/motion";
import { GlassCard } from "@/components/ui/glass-card";

const faqs = [
  {
    q: "What size show do you work with?",
    a: "Floor is 10,000 downloads per episode. Ceiling? There isn't one — we represent shows the major networks won't touch and shows they're already fighting over. The differentiator is our agency access, not your show size.",
  },
  {
    q: "How much does it cost?",
    a: "Zero upfront. We take a transparent 15–25% commission on deals we close, sliding lower for larger shows. If we don't sell, you don't pay.",
  },
  {
    q: "Do I lose creative control?",
    a: "Never. You approve every brand, every script, and every placement before it goes live. We bring the deals — you decide what fits your show.",
  },
  {
    q: "Can I work with you if I'm already with a network or another sales agency?",
    a: "Absolutely — we're 100% non-exclusive. If your existing contracts allow for additional sales partners, we're happy to work alongside your current network or agency. We'll never ask you to drop anyone. Many of our shows have multiple monetization partners, and that's totally fine with us.",
  },
  {
    q: "How is this different from joining a podcast network?",
    a: "Networks often require exclusivity, take equity, or bundle your show with hundreds of others. We're purely ad sales representation — no content control, no lock-in, no equity. You can leave anytime.",
  },
  {
    q: "How long until I see my first deal?",
    a: "Most creators see their first deal within 30–60 days of onboarding. It depends on your niche, audience size, and the time of year (Q4 is always hot).",
  },
  {
    q: "Do you handle ad ops and delivery?",
    a: "No — and that's by design. We focus purely on selling your ad inventory and closing deals. Once the contract is signed, you manage the ad delivery your way. We stay out of your creative process.",
  },
];

function FAQItem({ q, a, id }: { q: string; a: string; id: string }) {
  const [open, setOpen] = useState(false);
  const panelId = `faq-panel-${id}`;
  const buttonId = `faq-button-${id}`;

  return (
    <div>
      <h3 className="m-0">
        <button
          type="button"
          id={buttonId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          className="group/btn w-full flex items-start justify-between gap-4 px-6 py-5 text-left cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-500)]/60 rounded-3xl"
        >
          <span className="text-base font-semibold pr-2 text-white group-hover/btn:text-[var(--color-brand-400)] transition-colors">
            {q}
          </span>
          <motion.span
            aria-hidden
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.25 }}
            className="flex-shrink-0 text-xl text-[var(--color-text-muted)] group-hover/btn:text-[var(--color-brand-400)] transition-colors leading-none mt-0.5"
          >
            +
          </motion.span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-5 text-sm text-[var(--color-text-secondary)] leading-relaxed">
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
    <section id="faq" 