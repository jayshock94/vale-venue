import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import DecorDots from "@/components/ui/DecorDots";

const EVENTS = [
  { title: "Weddings & Receptions" },
  { title: "Corporate Events" },
  { title: "Celebrations" },
  { title: "Cultural Events" },
  { title: "Dance Parties & Discos" },
];

export default function EventShowcase() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <Container>
        <SectionHeader
          label="Section 4 — Event Showcase"
          title="Show what people have done here"
          description="Photo cards by event type. Proves the space works for everything. Five cards, asymmetric layout."
        />

        <DecorDots className="hidden md:block -top-2 right-20" count={10} spread={100} />

        {/* Asymmetric masonry grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
          {EVENTS.map(({ title }, i) => (
            <div
              key={title}
              className={`group relative overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                i === 0
                  ? "row-span-2 aspect-auto min-h-[400px] md:min-h-0"
                  : "aspect-[3/4]"
              }`}
            >
              <div className="absolute inset-0 bg-vale-bg-alt flex items-center justify-center">
                <span className="text-vale-fg-muted text-xs tracking-wide uppercase">
                  [Photo needed]
                </span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-vale-fg/80 via-vale-fg/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                <h3 className="text-lg md:text-xl font-[family-name:var(--font-heading)] font-medium text-white">
                  {title}
                </h3>
                <p className="text-sm text-white/70 mt-1">
                  One-line description of this event type.
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
