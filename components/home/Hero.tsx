import DecorDots from "@/components/ui/DecorDots";

export default function Hero() {
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
      <DecorDots className="bottom-24 left-8 md:left-16 opacity-60" count={8} spread={80} />

      {/* Content */}
      <div className="relative mx-auto max-w-6xl px-5 md:px-8 py-36 md:py-48 lg:py-56">
        <div className="max-w-2xl">
          <span className="block text-sm font-medium uppercase tracking-widest text-white/60 mb-4">
            Section 1 — Hero
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight">
            First impression. One bold headline.
          </h1>
          <p className="mt-5 text-lg md:text-xl text-white/80 leading-relaxed max-w-lg">
            Full-width photo with overlay. The visitor should immediately know
            what The Vale is, where it is, and feel something about it. Two
            CTAs below.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <div className="px-8 py-4 rounded-md bg-white/20 backdrop-blur-sm text-white text-sm uppercase tracking-wide font-medium border border-white/10">
              Primary CTA
            </div>
            <div className="px-8 py-4 rounded-md border border-white/30 text-white text-sm uppercase tracking-wide font-medium backdrop-blur-sm">
              Secondary CTA
            </div>
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
