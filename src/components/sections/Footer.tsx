"use client";

import { FadeIn } from "@/components/ui/motion";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-12 px-6">
      <FadeIn>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-[var(--color-text-muted)]">
            &copy; {new Date().getFullYear()} PodcastRep. All rights reserved.
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
              href="mailto:hello@podcastrep.com"
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
