"use client";

import Link from "next/link";
import { useTheme } from "@/components/theme/ThemeProvider";

export default function Hero() {
  const { openPicker } = useTheme();

  return (
    <section className="relative min-h-[85vh] md:min-h-[90vh] flex items-end overflow-hidden">
      {/* Background — will be replaced with actual photo */}
      <div className="absolute inset-0 bg-vale-bg-alt" />
      <div className="absolute inset-0 bg-gradient-to-t from-vale-fg/70 via-vale-fg/30 to-transparent" />

      {/* Content pinned to bottom */}
      <div className="relative w-full mx-auto max-w-6xl px-5 md:px-8 pb-20 md:pb-24 pt-32">
        <div className="max-w-xl">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-white/50">
            Event Venue &middot; Provo, Utah
          </span>

          <h1 className="mt-4 text-[2.5rem] md:text-5xl lg:text-6xl font-[family-name:var(--font-heading)] font-semibold text-white leading-[1.1]">
            Your event.{" "}
            <span className="block">Your way.</span>
          </h1>

          <p className="mt-5 text-base md:text-lg text-white/75 leading-relaxed max-w-md">
            6,500 sq ft of open space in Provo. Your caterer, your vendors, your
            rules. We just make it easy.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              href="/brochure"
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-md bg-vale-accent text-vale-accent-fg text-sm uppercase tracking-wide font-medium hover:bg-vale-accent-hover transition-colors"
            >
              Build Your Brochure
            </Link>
            <button
              onClick={openPicker}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-md bg-white/10 backdrop-blur-sm text-white border border-white/20 text-sm uppercase tracking-wide font-medium hover:bg-white/20 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="13.5" cy="6.5" r="2" />
                <circle cx="17.5" cy="10.5" r="2" />
                <circle cx="8.5" cy="7.5" r="2" />
                <circle cx="6.5" cy="12.5" r="2" />
                <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
              </svg>
              See It in Your Colors
            </button>
          </div>
        </div>
      </div>

      {/* Curved bottom edge */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 48"
          fill="none"
          preserveAspectRatio="none"
          className="w-full h-6 md:h-10 block"
        >
          <path
            d="M0 48V16C360 0 720 0 1080 16C1260 24 1380 36 1440 48H0Z"
            className="fill-vale-bg"
          />
        </svg>
      </div>
    </section>
  );
}
