"use client";

import { motion } from "framer-motion";
import { FadeUp } from "@/components/ui/motion";

export default function CTA() {
  return (
    <section
      id="cta"
      className="py-28 px-6 bg-gradient-to-b from-transparent via-[var(--color-surface-raised)]/50 to-transparent"
    >
      <div className="max-w-4xl mx-auto">
        <FadeUp>
          <div className="relative rounded-3xl overflow-hidden">
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-brand-600)] via-[var(--color-brand-500)] to-[var(--color-accent-600)]" />
            {/* Grid pattern overlay */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />

            <div className="relative z-10 px-8 sm:px-16 py-16 sm:py-20 text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-3xl sm:text-5xl font-extrabold text-white leading-tight mb-6"
              >
                Ready to Monetize
                <br />
                Your Podcast?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-lg text-white/80 max-w-xl mx-auto mb-10"
              >
                Apply today and we&apos;ll have your media kit ready within 48 hours.
                No commitment, no upfront costs.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.4 }}
              >
                <a
                  href="mailto:brady@podcastrep.com"
                  className="inline-flex items-center gap-2 px-10 py-4 text-lg font-bold rounded-full bg-white text-[var(--color-brand-600)] hover:bg-white/90 transition-colors shadow-xl"
                >
                  Apply Now — It&apos;s Free
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                    />
                  </svg>
                </a>
              </motion.div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
