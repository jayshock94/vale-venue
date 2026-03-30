"use client";

import { useState } from "react";
import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import BgShape from "@/components/ui/BgShape";
import { useChatUI } from "@/components/chat/ChatProvider";

type Chip = { label: string; content: string };

type Item = {
  title: string;
  detail: string;
  description: string;
  chips: Chip[];
  icon: React.ReactNode;
};

const ITEMS: Item[] = [
  {
    title: "Tables",
    detail: "Round, banquet, farmhouse",
    description:
      "Choose from 60-inch rounds, 8-foot banquet tables, or farmhouse style. We have enough for up to 200 seated guests. Setup and teardown are on us for the first arrangement.",
    chips: [
      { label: "Table types", content: "60-inch round tables seat 8 comfortably (or 10 cozy). 8-foot banquet tables work for plated dinners or long family-style setups. Farmhouse tables have that rustic, warm vibe and seat 8 per table." },
      { label: "How many?", content: "We have enough tables for up to 200 seated guests in any combination. Most weddings use a mix of rounds for dinner and a few banquet tables for the head table, dessert, or gifts." },
      { label: "Setup included?", content: "First table arrangement is set up and torn down by us at no extra charge. If you need a flip (ceremony to reception, for example), that's an add-on." },
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <rect x="2" y="6" width="20" height="4" rx="1" />
        <line x1="4" y1="10" x2="4" y2="20" />
        <line x1="20" y1="10" x2="20" y2="20" />
      </svg>
    ),
  },
  {
    title: "Chairs",
    detail: "Cross-back, bentwood",
    description:
      "Cross-back wooden chairs and bentwood chairs are included at no extra cost. Both styles photograph well and work for everything from rustic barn weddings to polished corporate dinners.",
    chips: [
      { label: "Chair styles", content: "Cross-back chairs have a classic farmhouse look with an X-pattern backrest. Bentwood chairs are sleek, curved, and modern. Both are real wood, not plastic, and photograph beautifully." },
      { label: "How many?", content: "We have enough chairs for up to 350 guests (ceremony style) or 200 seated at tables. You can mix styles if you want different vibes for ceremony vs. reception." },
      { label: "Cushions?", content: "Chair cushions aren't included but are available as an add-on. Most clients skip them for events under 3 hours and add them for longer seated dinners." },
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M7 11V4a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v7" />
        <rect x="5" y="11" width="14" height="4" rx="1" />
        <line x1="7" y1="15" x2="7" y2="21" />
        <line x1="17" y1="15" x2="17" y2="21" />
      </svg>
    ),
  },
  {
    title: "Linens",
    detail: "One setup, up to 12 tables",
    description:
      "White or ivory tablecloths for up to 12 tables, included with every rental. If you want colored linens or specialty fabrics, you can bring your own or rent from a vendor.",
    chips: [
      { label: "What colors?", content: "White and ivory tablecloths are included. If your event colors are specific (dusty rose, sage, navy), you can bring your own linens or rent from a vendor. No restrictions on outside linen rentals." },
      { label: "Napkins too?", content: "Cloth napkins aren't included in the standard package but are available as an add-on. Most clients either add them through us or pick up disposable ones that match their color scheme." },
      { label: "Extra setups?", content: "One linen setup is included. If you need a second setup (like flipping from ceremony to reception), that's an add-on. Your coordinator can handle the flip if you have one." },
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M3 6l3-3h12l3 3" />
        <rect x="3" y="6" width="18" height="15" rx="1" />
        <path d="M8 6v15" />
        <path d="M16 6v15" />
      </svg>
    ),
  },
  {
    title: "Sound System",
    detail: "Bluetooth speakers + 2 mics",
    description:
      "Built-in Bluetooth speaker system covers the whole venue. Two wireless mics are included for toasts, ceremonies, or announcements. DJs and live bands can plug into the house system.",
    chips: [
      { label: "Bring a DJ?", content: "DJs and live bands can plug directly into the house system. There's an aux input and standard audio hookups. Most DJs bring their own equipment too, and there's plenty of power outlets along every wall." },
      { label: "Mic details", content: "Two wireless handheld mics are included. They work great for toasts, ceremonies, and announcements. If you need a lapel mic or headset, you'd bring your own or have your DJ provide one." },
      { label: "Outdoor sound?", content: "The built-in speakers cover the indoor space. For outdoor ceremonies or cocktail hours in the parking area, you'd need a portable speaker or your DJ's equipment." },
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
      </svg>
    ),
  },
  {
    title: "Display",
    detail: "TV for slideshows or signage",
    description:
      "Large-screen TV available for photo slideshows, event schedules, welcome signage, or presentations. Bring your content on a USB or cast wirelessly.",
    chips: [
      { label: "Screen size", content: "It's a large flat-screen TV mounted in a visible spot. Works well for photo slideshows during cocktail hour, a welcome sign as guests arrive, or a schedule board for corporate events." },
      { label: "How to connect", content: "Bring your content on a USB drive for the simplest setup. You can also cast wirelessly from most phones and laptops, or plug in via HDMI." },
      { label: "Projector?", content: "A projector isn't included but the space works well with one if you bring your own or rent one. The white walls make a decent projection surface, or you can bring a screen." },
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    title: "Kitchen",
    detail: "Commercial fridge, freezer, prep",
    description:
      "Full commercial kitchen with industrial fridge, freezer, prep counters, and sink. Your caterer can stage, plate, and serve right on-site. No warming trucks needed.",
    chips: [
      { label: "What's in it?", content: "Commercial-grade refrigerator, standalone freezer, stainless prep counters, a triple-basin sink, and plenty of counter space. Your caterer can do full prep and plating on-site." },
      { label: "Can I cook?", content: "There's no stove or oven, so full cooking isn't possible on-site. But caterers use it for staging, warming (bring chafing dishes), plating, and storing food. Some clients bring in food trucks for hot food." },
      { label: "Alcohol?", content: "You can serve alcohol at your event. If alcohol is being served, you'll need a licensed bartender and security guard on-site. That's a Utah requirement, not a Vale rule." },
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <rect x="4" y="2" width="16" height="20" rx="2" />
        <line x1="4" y1="10" x2="20" y2="10" />
        <line x1="10" y1="5" x2="14" y2="5" />
        <line x1="10" y1="14" x2="10" y2="17" />
      </svg>
    ),
  },
  {
    title: "Guest Suites",
    detail: "Two spacious rooms",
    description:
      "Two private suites for the wedding party, performers, or VIPs to get ready, decompress, or store personal items. Each has mirrors, seating, and good lighting.",
    chips: [
      { label: "What's inside?", content: "Each suite has full-length mirrors, comfortable seating, good lighting, and enough space for a small group to get ready together. Think of it as a dressing room, not a bedroom." },
      { label: "Both included?", content: "Both suites are included with every rental. One is typically used by the bride's party, the other by the groom's. For corporate events, they work as green rooms or breakout spaces." },
      { label: "Can I decorate?", content: "You can decorate the suites however you want. Some brides set up a mimosa bar, hang robes, or bring in a hair and makeup station. Just no permanent changes to the walls or fixtures." },
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M3 12h18v8H3z" />
        <path d="M3 12V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v7" />
        <line x1="3" y1="20" x2="3" y2="22" />
        <line x1="21" y1="20" x2="21" y2="22" />
      </svg>
    ),
  },
  {
    title: "Parking",
    detail: "200+ private spots",
    description:
      "Over 200 private parking spots right outside the venue. No shuttles, no street parking headaches. Guests walk straight from their car to your event.",
    chips: [
      { label: "Where exactly?", content: "The parking lot wraps around the south and east sides of the building. Guests walk directly from their car to the entrance. It's all private, well-lit, and paved." },
      { label: "Food trucks?", content: "The south parking area is perfect for food trucks. Easy truck access right off the road, power hookups available, and guests can walk straight from the trucks back inside." },
      { label: "Accessibility", content: "ADA-accessible parking spots are available near the main entrance. The venue itself is single-level with no stairs, so wheelchair and mobility access is straightforward throughout." },
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <circle cx="12" cy="12" r="10" />
        <path d="M9 17V7h4a3 3 0 0 1 0 6H9" />
      </svg>
    ),
  },
];

export default function Included() {
  const [activeItem, setActiveItem] = useState<Item | null>(null);
  const [activeChip, setActiveChip] = useState<string | null>(null);
  const { openChatWithMessage } = useChatUI();

  const openModal = (item: Item) => {
    setActiveItem(item);
    setActiveChip(null);
  };

  const closeModal = () => {
    setActiveItem(null);
    setActiveChip(null);
  };

  const activeChipContent = activeItem?.chips.find((c) => c.label === activeChip)?.content;

  return (
    <section className="relative py-20 md:py-32 bg-vale-bg-alt overflow-hidden">
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
            {ITEMS.map((item) => (
              <button
                key={item.title}
                onClick={() => openModal(item)}
                className="bg-vale-surface rounded-xl p-5 md:p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 text-left group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-lg bg-vale-bg-alt flex items-center justify-center text-vale-accent mb-4 group-hover:bg-vale-accent group-hover:text-vale-accent-fg transition-colors">
                  {item.icon}
                </div>
                <h3 className="font-medium text-sm md:text-base">{item.title}</h3>
                <p className="text-sm text-vale-fg-muted mt-1.5 leading-relaxed">
                  {item.detail}
                </p>
              </button>
            ))}
          </div>
        </div>
      </Container>

      {/* Detail Modal */}
      {activeItem && (
        <>
          <div
            className="fixed inset-0 z-50 bg-black/40"
            onClick={closeModal}
          />
          <div className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-50 mx-auto max-w-md">
            <div className="bg-vale-surface rounded-2xl shadow-2xl overflow-hidden max-h-[85vh] flex flex-col">
              {/* Header */}
              <div className="flex items-center gap-4 px-6 pt-6 pb-4 shrink-0">
                <div className="w-14 h-14 rounded-xl bg-vale-accent text-vale-accent-fg flex items-center justify-center shrink-0">
                  {activeItem.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold font-[family-name:var(--font-heading)]">
                    {activeItem.title}
                  </h3>
                  <p className="text-sm text-vale-fg-muted">{activeItem.detail}</p>
                </div>
                <button
                  onClick={closeModal}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-vale-bg-alt transition-colors shrink-0"
                  aria-label="Close"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              <div className="h-px bg-vale-border mx-6 shrink-0" />

              {/* Scrollable body */}
              <div className="flex-1 overflow-y-auto overscroll-contain">
                {/* Description */}
                <div className="px-6 pt-5 pb-4">
                  <p className="text-sm text-vale-fg leading-relaxed">
                    {activeChipContent || activeItem.description}
                  </p>
                </div>

                {/* Assistive chips */}
                <div className="px-6 pb-4">
                  <p className="text-xs text-vale-fg-muted uppercase tracking-wider mb-2.5">
                    Common questions
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {activeItem.chips.map((chip) => (
                      <button
                        key={chip.label}
                        onClick={() =>
                          setActiveChip(activeChip === chip.label ? null : chip.label)
                        }
                        className={`px-3.5 py-1.5 text-[13px] rounded-full border transition-colors ${
                          activeChip === chip.label
                            ? "bg-vale-accent text-vale-accent-fg border-vale-accent"
                            : "border-vale-border text-vale-fg-muted hover:bg-vale-bg-alt hover:text-vale-fg"
                        }`}
                      >
                        {chip.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="px-6 pb-6 pt-2 flex flex-col gap-2.5 shrink-0">
                <Link
                  href="/brochure"
                  className="w-full py-3 rounded-lg bg-vale-accent text-vale-accent-fg text-sm font-medium uppercase tracking-wide text-center hover:bg-vale-accent-hover transition-colors"
                  onClick={closeModal}
                >
                  Start Your Brochure
                </Link>
                <button
                  onClick={() => {
                    const topic = activeChip
                      ? `${activeChip} for the ${activeItem.title.toLowerCase()}`
                      : activeItem.title.toLowerCase();
                    closeModal();
                    openChatWithMessage(
                      `Tell me more about ${topic} at The Vale`
                    );
                  }}
                  className="w-full py-3 rounded-lg border border-vale-border text-vale-fg text-sm font-medium text-center hover:bg-vale-bg-alt transition-colors flex items-center justify-center gap-2"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-vale-accent">
                    <path d="M12 2L13.09 8.26L18 6L14.74 10.91L21 12L14.74 13.09L18 18L13.09 15.74L12 22L10.91 15.74L6 18L9.26 13.09L3 12L9.26 10.91L6 6L10.91 8.26L12 2Z" />
                  </svg>
                  Ask Val About This
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
