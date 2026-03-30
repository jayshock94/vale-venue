"use client";

import { useState } from "react";
import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import BgShape from "@/components/ui/BgShape";
import { useChatUI } from "@/components/chat/ChatProvider";

const ITEMS = [
  {
    title: "Tables",
    detail: "Round, banquet, farmhouse",
    description:
      "Choose from 60-inch rounds, 8-foot banquet tables, or farmhouse style. We have enough for up to 200 seated guests. Setup and teardown are on us for the first arrangement.",
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
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <circle cx="12" cy="12" r="10" />
        <path d="M9 17V7h4a3 3 0 0 1 0 6H9" />
      </svg>
    ),
  },
];

export default function Included() {
  const [activeItem, setActiveItem] = useState<(typeof ITEMS)[number] | null>(null);
  const { openChatWithMessage } = useChatUI();

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
                onClick={() => setActiveItem(item)}
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
            className="fixed inset-0 z-50 bg-black/40 animate-in fade-in"
            onClick={() => setActiveItem(null)}
          />
          <div className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-50 mx-auto max-w-md">
            <div className="bg-vale-surface rounded-2xl shadow-2xl overflow-hidden">
              {/* Modal header */}
              <div className="flex items-center gap-4 px-6 pt-6 pb-4">
                <div className="w-14 h-14 rounded-xl bg-vale-accent text-vale-accent-fg flex items-center justify-center shrink-0">
                  {activeItem.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold font-[family-name:var(--font-heading)]">
                    {activeItem.title}
                  </h3>
                  <p className="text-sm text-vale-fg-muted">{activeItem.detail}</p>
                </div>
                <button
                  onClick={() => setActiveItem(null)}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-vale-bg-alt transition-colors shrink-0"
                  aria-label="Close"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              {/* Divider */}
              <div className="h-px bg-vale-border mx-6" />

              {/* Body */}
              <div className="px-6 py-5">
                <p className="text-sm text-vale-fg leading-relaxed">
                  {activeItem.description}
                </p>
              </div>

              {/* CTAs */}
              <div className="px-6 pb-6 flex flex-col gap-2.5">
                <Link
                  href="/brochure"
                  className="w-full py-3 rounded-lg bg-vale-accent text-vale-accent-fg text-sm font-medium uppercase tracking-wide text-center hover:bg-vale-accent-hover transition-colors"
                  onClick={() => setActiveItem(null)}
                >
                  Start Your Brochure
                </Link>
                <button
                  onClick={() => {
                    setActiveItem(null);
                    openChatWithMessage(
                      `Tell me more about the ${activeItem.title.toLowerCase()} at The Vale`
                    );
                  }}
                  className="w-full py-3 rounded-lg border border-vale-border text-vale-fg text-sm font-medium text-center hover:bg-vale-bg-alt transition-colors flex items-center justify-center gap-2"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-vale-accent">
                    <path d="M12 2L13.09 8.26L18 6L14.74 10.91L21 12L14.74 13.09L18 18L13.09 15.74L12 22L10.91 15.74L6 18L9.26 13.09L3 12L9.26 10.91L6 6L10.91 8.26L12 2Z" />
                  </svg>
                  Ask Vale About This
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
