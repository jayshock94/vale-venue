import Container from "@/components/ui/Container";

export default function Location() {
  return (
    <section className="relative py-20 md:py-32 bg-vale-bg-alt overflow-hidden">
      <Container>
        <div className="relative grid md:grid-cols-[1fr_1.1fr] gap-10 md:gap-16 items-center">
          {/* Text column */}
          <div className="relative z-10">
            <span className="block text-sm font-medium uppercase tracking-widest text-vale-fg-muted mb-3">
              Section 7 — Getting Here
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight mb-6">
              Location and parking
            </h2>
            <div className="space-y-4 text-vale-fg-muted leading-relaxed">
              <p>
                Provo, Utah. Close to I-15 and University Ave. Quiet setting
                but easy to reach. 200+ private parking spots. Nearby: Sam's
                Club, Target, Ross, hotels.
              </p>
              <p>
                Map or exterior photo on the right with a decorative border
                treatment.
              </p>
            </div>
          </div>

          {/* Map/photo with decorative frame */}
          <div className="relative">
            {/* Decorative offset border */}
            <div className="absolute inset-0 rounded-2xl border-2 border-vale-accent/20 translate-x-3 translate-y-3 md:translate-x-4 md:translate-y-4" />
            <div className="relative aspect-[4/3] rounded-2xl bg-vale-surface border border-vale-border flex items-center justify-center shadow-sm">
              <span className="text-vale-fg-muted text-sm tracking-wide uppercase">
                [Map or exterior photo]
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
