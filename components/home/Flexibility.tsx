import Container from "@/components/ui/Container";
import BgShape from "@/components/ui/BgShape";
import DecorDots from "@/components/ui/DecorDots";

export default function Flexibility() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background shape behind text */}
      <BgShape className="right-0 top-16 w-[400px] h-[500px] md:w-[500px] md:h-[600px]" variant="blob" />

      <Container>
        <div className="relative grid md:grid-cols-[1.2fr_1fr] gap-10 md:gap-12 items-center">
          {/* Photo breaking out on the left */}
          <div className="relative order-2 md:order-1">
            <div className="md:-ml-12 lg:-ml-20">
              <div className="aspect-[4/3] rounded-2xl bg-vale-bg-alt flex items-center justify-center shadow-lg">
                <span className="text-vale-fg-muted text-sm tracking-wide uppercase">
                  [Food truck or catering photo]
                </span>
              </div>
            </div>
            {/* Overlapping accent photo */}
            <div className="hidden md:flex absolute -top-6 right-4 w-36 h-48 rounded-xl bg-vale-surface border-4 border-vale-bg shadow-md items-center justify-center">
              <span className="text-vale-fg-muted text-[10px] tracking-wide uppercase text-center px-2">
                [Detail photo]
              </span>
            </div>
          </div>

          {/* Text column */}
          <div className="relative z-10 order-1 md:order-2">
            <DecorDots className="-top-4 right-0" count={8} spread={70} />
            <span className="block text-sm font-medium uppercase tracking-widest text-vale-fg-muted mb-3">
              Section 6 — Your Rules, Your Vendors
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight mb-6">
              The flexibility pitch
            </h2>
            <div className="space-y-4 text-vale-fg-muted leading-relaxed">
              <p>
                This is the deal-closer section. Open catering, no vendor
                restrictions, no markups, food trucks welcome. Alcohol allowed
                with proper licensing. Flexible time blocks.
              </p>
              <p>
                Photo should show the venue's flexibility in action: a food
                truck setup, unique catering, or a non-traditional layout.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
