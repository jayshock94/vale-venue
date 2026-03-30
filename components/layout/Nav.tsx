"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/components/theme/ThemeProvider";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/brochure", label: "Brochure" },
  { href: "/space", label: "The Space" },
  { href: "/pricing", label: "Pricing" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { openPicker, isCustomTheme } = useTheme();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-30 bg-vale-bg/95 backdrop-blur-sm border-b border-vale-border">
      <nav className="mx-auto max-w-6xl flex items-center justify-between px-5 md:px-8 h-16 md:h-18">
        {/* Logo */}
        <Link
          href="/"
          className="font-[family-name:var(--font-heading)] text-2xl md:text-[1.7rem] font-normal tracking-tight"
        >
          The Vale
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm tracking-wide transition-colors ${
                pathname === href
                  ? "text-vale-accent font-medium"
                  : "text-vale-fg-muted hover:text-vale-fg"
              }`}
            >
              {label}
            </Link>
          ))}
          <button
            onClick={openPicker}
            className={`relative p-2 rounded-full transition-colors ${
              isCustomTheme
                ? "text-vale-accent hover:bg-vale-bg-alt"
                : "text-vale-fg-muted hover:text-vale-fg hover:bg-vale-bg-alt"
            }`}
            aria-label="Customize colors"
            title="Customize colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="13.5" cy="6.5" r="2" />
              <circle cx="17.5" cy="10.5" r="2" />
              <circle cx="8.5" cy="7.5" r="2" />
              <circle cx="6.5" cy="12.5" r="2" />
              <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
            </svg>
            {isCustomTheme && (
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-vale-accent border-2 border-vale-bg" />
            )}
          </button>
          <Link
            href="/contact"
            className="ml-2 inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium uppercase tracking-wide rounded-md bg-vale-accent text-vale-accent-fg hover:bg-vale-accent-hover transition-colors"
          >
            Check Availability
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 -mr-2"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          <div className="w-6 h-5 flex flex-col justify-between">
            <span
              className={`block h-[1.5px] w-full bg-vale-fg transition-transform origin-left ${
                mobileOpen ? "rotate-45 translate-x-[1px]" : ""
              }`}
            />
            <span
              className={`block h-[1.5px] w-full bg-vale-fg transition-opacity ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-[1.5px] w-full bg-vale-fg transition-transform origin-left ${
                mobileOpen ? "-rotate-45 translate-x-[1px]" : ""
              }`}
            />
          </div>
        </button>
      </nav>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 top-16 z-20 bg-vale-overlay md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile menu panel */}
      <div
        className={`fixed top-16 right-0 z-30 w-full max-w-xs h-[calc(100vh-4rem)] bg-vale-surface shadow-xl transform transition-transform duration-300 md:hidden ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col p-6 gap-1">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`py-3 text-lg font-[family-name:var(--font-heading)] transition-colors ${
                pathname === href
                  ? "text-vale-accent"
                  : "text-vale-fg hover:text-vale-accent"
              }`}
            >
              {label}
            </Link>
          ))}
          <div className="mt-6 pt-6 border-t border-vale-border space-y-3">
            <Link
              href="/contact"
              className="block w-full text-center py-3 text-sm font-medium uppercase tracking-wide rounded-md bg-vale-accent text-vale-accent-fg hover:bg-vale-accent-hover transition-colors"
            >
              Check Availability
            </Link>
            <button
              onClick={() => { openPicker(); setMobileOpen(false); }}
              className="flex items-center gap-3 w-full py-3 text-sm text-vale-fg-muted hover:text-vale-fg transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="13.5" cy="6.5" r="2" />
                <circle cx="17.5" cy="10.5" r="2" />
                <circle cx="8.5" cy="7.5" r="2" />
                <circle cx="6.5" cy="12.5" r="2" />
                <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
              </svg>
              Customize Colors
              {isCustomTheme && (
                <span className="w-2 h-2 rounded-full bg-vale-accent" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
