"use client";

import { FadeIn } from "@/components/ui/motion";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-12 px-6">
      <FadeIn>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <a href="#" className="text-base font-extrabold tracking-tight">
              <span className="text-[var(--color-text-primary)]">Podcast</span>
              <span className="serif-accent text-[var(--color-brand-400)] text-[1.15rem]">Rep</span>
            </a>
            <span className="text-sm text-[var(--color-text-muted)]">
              &copy; {new Date().getFullYear()} All rights reserved.
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] transition-colors"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] transition-colors"
            >
              Terms
            </a>
            <a
              href="mailto:brady@podcastrep.com"
              className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </FadeIn>
    </footer>
  );
}
