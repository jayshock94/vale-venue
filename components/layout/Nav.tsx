"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/your-vale", label: "Your Vale" },
  { href: "/space", label: "The Space" },
  { href: "/pricing", label: "Pricing" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

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
          <div className="mt-6 pt-6 border-t border-vale-border">
            <Link
              href="/contact"
              className="block w-full text-center py-3 text-sm font-medium uppercase tracking-wide rounded-md bg-vale-accent text-vale-accent-fg hover:bg-vale-accent-hover transition-colors"
            >
              Check Availability
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
