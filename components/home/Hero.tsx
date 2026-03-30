"use client";

import { useTheme } from "@/components/theme/ThemeProvider";
import DecorDots from "@/components/ui/DecorDots";

export default function Hero() {
  const { openPicker } = useTheme();

  return (
    <section className="relative overflow-hidden">
      {/* Photo placeholder */}
      <div className="absolute inset-0 bg-vale-bg-alt flex items-center justify-center">
        <span className="text-vale-fg-muted text-sm tracking-wide uppercase">
          [Hero photo needed]
        </span>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-vale-fg/50 via-vale-fg/25 to-vale-fg/60" />

      {/* Decorative dots */}
      <DecorDots className="top-8 right-8 md:top-12 md:right-16 hidden md:block" count={16} spread={160} />
      <DecorDots className="bottom-28 left-8 md:left-16 opacity-60" count={8} spread={80} />

      {/* Content */}
      <div className="relative mx-auto max-w-6xl px-5 md:px-8 py-32 md:py-44 lg:py-52">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <span className="inline-block text-sm font-medium uppercase tracking-widest text-white/50 mb-5">
            Event Venue &middot; Provo, Utah
          </span>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight">
            First impression. One bold headline.
          </h1>

          {/* Subtext */}
          <p className="mt-5 text-lg md:text-xl text-white/80 leading-relaxed max-w-lg">
            Full-width photo with overlay. The visitor should immediately know
            what The Vale is, where it is, and feel something about it.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap gap-4">
            <button
              onClick={openPicker}
              className="px-8 py-4 rounded-md bg-vale-accent text-vale-accent-fg border border-vale-accent text-sm uppercase tracking-wide font-medium hover:bg-vale-accent-hover hover:border-vale-accent-hover transition-colors shadow-md"
            >
              See it in your colors
            </button>
            <a
              href="/brochure"
              className="px-8 py-4 rounded-md bg-vale-surface text-vale-fg border border-vale-border text-sm uppercase tracking-wide font-medium hover:bg-vale-bg-alt transition-colors shadow-md"
            >
              Build your brochure
            </a>
          </div>
        </div>
      </div>

      {/* Curved bottom edge */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 60"
          fill="none"
          preserveAspectRatio="none"
          className="w-full h-8 md:h-12 block"
        >
          <path
            d="M0 60V20C360 0 720 0 1080 20C1260 30 1380 45 1440 60V60H0Z"
            className="fill-vale-bg"
          />
        </svg>
      </div>
    </section>
  );
}
