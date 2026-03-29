import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import BgShape from "@/components/ui/BgShape";

const ITEMS = [
  { title: "Tables", detail: "Round, banquet, farmhouse" },
  { title: "Chairs", detail: "Cross-back, bentwood" },
  { title: "Linens", detail: "One setup, up to 12 tables" },
  { title: "Sound System", detail: "Bluetooth speakers + 2 mics" },
  { title: "Display", detail: "TV for slideshows or signage" },
  { title: "Kitchen", detail: "Commercial fridge, freezer, prep" },
  { title: "Guest Suites", detail: "Two spacious rooms" },
  { title: "Parking", detail: "200+ private spots" },
];

export default function Included() {
  return (
    <section className="relative py-20 md:py-32 bg-vale-bg-alt overflow-hidden">
      {/* Background shape */}
      <BgShape
        className="right-0 top-20 w-[500px] h-[400px] md:w-[700px] md:h-[500px] opacity-50"
        variant="rounded-rect"
      />

      <Container>
        <div className="relative z-10">
          <SectionHeader
            label="Section 5 — What's Included"
            title="Everything that comes with the rental"
            description="Cards showing what's included at no extra cost. Answers 'what do I actually get?' before they ask."
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {ITEMS.map(({ title, detail }) => (
              <div
                key={title}
                className="bg-vale-surface rounded-xl p-5 md:p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
              >
                <h3 className="font-medium text-sm md:text-base">{title}</h3>
                <p className="text-sm text-vale-fg-muted mt-1.5 leading-relaxed">
                  {detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
