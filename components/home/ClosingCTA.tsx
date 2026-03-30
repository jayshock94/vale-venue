import BgShape from "@/components/ui/BgShape";

export default function ClosingCTA() {
  return (
    <section className="relative py-24 md:py-36 overflow-hidden">
      {/* Background shapes */}
      <BgShape
        className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[700px] md:h-[700px] opacity-50"
        variant="circle"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-5 md:px-8 text-center">
        <span className="block text-sm font-medium uppercase tracking-widest text-vale-fg-muted mb-4">
          Section 8 — Closing CTA
        </span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-light font-[family-name:var(--font-heading)] leading-tight">
          Final push to take action
        </h2>
        <p className="mt-5 text-vale-fg-muted text-lg max-w-lg mx-auto leading-relaxed">
          Last thing before the footer. One compelling line, then two buttons.
          No fluff, just the next step.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <div className="px-8 py-4 rounded-md bg-vale-accent text-vale-accent-fg text-sm uppercase tracking-wide font-medium shadow-md">
            Primary CTA
          </div>
          <div className="px-8 py-4 rounded-md border border-vale-border-strong text-vale-fg text-sm uppercase tracking-wide font-medium">
            Secondary CTA
          </div>
        </div>
      </div>
    </section>
  );
}
