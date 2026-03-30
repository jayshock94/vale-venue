import Container from "@/components/ui/Container";
import BgShape from "@/components/ui/BgShape";

export default function BlankCanvas() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background shape behind text */}
      <BgShape className="-left-20 top-10 w-[400px] h-[500px] md:w-[500px] md:h-[600px]" variant="blob" />

      <Container>
        <div className="relative grid md:grid-cols-[1fr_1.2fr] gap-10 md:gap-12 items-center">
          {/* Text column */}
          <div className="relative z-10">
            <span className="block text-sm font-medium uppercase tracking-widest text-vale-fg-muted mb-3">
              Section 2 — The Blank Canvas Pitch
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight mb-6">
              What the space is and who it's for
            </h2>
            <div className="space-y-4 text-vale-fg-muted leading-relaxed">
              <p>
                Introduce the venue as a blank canvas. Address two audiences:
                the excited DIY planner who loves an empty space, and the
                hesitant visitor who finds it intimidating. Show what others
                have done with it.
              </p>
              <p>
                Photo should show the space transformed for an event, not
                empty. Proves the blank canvas becomes something real.
              </p>
            </div>
          </div>

          {/* Offset photo — breaks out of container on the right */}
          <div className="relative">
            <div className="md:-mr-12 lg:-mr-20">
              <div className="aspect-[4/5] rounded-2xl bg-vale-bg-alt flex items-center justify-center shadow-lg">
                <span className="text-vale-fg-muted text-sm tracking-wide uppercase">
                  [Transformed event photo]
                </span>
              </div>
            </div>
            {/* Small accent photo overlapping bottom-left */}
            <div className="hidden md:flex absolute -bottom-8 -left-8 w-40 h-40 rounded-xl bg-vale-surface border-4 border-vale-bg shadow-md items-center justify-center">
              <span className="text-vale-fg-muted text-[10px] tracking-wide uppercase text-center px-2">
                [Detail photo]
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
