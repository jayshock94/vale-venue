import Container from "@/components/ui/Container";
import BgShape from "@/components/ui/BgShape";

const STATS = [
  { number: "6,500", unit: "sq ft", label: "Total venue space" },
  { number: "350", unit: "guests", label: "Ceremony capacity" },
  { number: "200+", unit: "spots", label: "Private parking" },
  { number: "12", unit: "hours", label: "Standard rental block" },
];

export default function Stats() {
  return (
    <section className="relative py-20 md:py-28 bg-vale-bg-alt overflow-hidden">
      {/* Large circular bg shape */}
      <BgShape
        className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] opacity-40"
        variant="circle"
      />

      <Container>
        <div className="relative z-10">
          <span className="block text-sm font-medium uppercase tracking-widest text-vale-fg-muted mb-3 text-center">
            Section 3 — By the Numbers
          </span>
          <p className="text-center text-vale-fg-muted text-sm mb-14 md:mb-20 max-w-md mx-auto">
            Quick-scan stats. Four numbers answering the questions people ask
            first.
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {STATS.map(({ number, unit, label }) => (
              <div key={label} className="flex flex-col items-center text-center">
                <div className="w-28 h-28 md:w-32 md:h-32 rounded-full border-2 border-vale-accent/20 flex flex-col items-center justify-center">
                  <div className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-medium text-vale-accent leading-none">
                    {number}
                  </div>
                  <div className="text-[10px] uppercase tracking-widest text-vale-fg-muted mt-1.5">
                    {unit}
                  </div>
                </div>
                <div className="text-sm text-vale-fg-muted mt-3">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
