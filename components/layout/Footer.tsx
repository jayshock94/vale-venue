import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-vale-border bg-vale-bg-alt">
      <div className="mx-auto max-w-6xl px-5 md:px-8 py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr] md:gap-16">
          {/* Brand column */}
          <div>
            <span className="font-[family-name:var(--font-heading)] text-2xl font-normal tracking-tight">
              The Vale
            </span>
            <p className="mt-3 text-sm text-vale-fg-muted leading-relaxed max-w-xs">
              An event venue in Provo, Utah. 6,500 square feet of open space,
              200+ private parking spots, and zero restrictions on your vendors.
            </p>
          </div>

          {/* Pages */}
          <div>
            <h4 className="text-sm font-medium uppercase tracking-wider mb-4">
              Pages
            </h4>
            <ul className="space-y-2.5">
              {[
                { href: "/your-vale", label: "Your Vale" },
                { href: "/space", label: "The Space" },
                { href: "/pricing", label: "Pricing" },
                { href: "/gallery", label: "Gallery" },
                { href: "/contact", label: "Contact" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-vale-fg-muted hover:text-vale-fg transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-medium uppercase tracking-wider mb-4">
              Get in Touch
            </h4>
            <ul className="space-y-2.5 text-sm text-vale-fg-muted">
              <li>
                <a
                  href="mailto:bobbi@valevenue.com"
                  className="hover:text-vale-fg transition-colors"
                >
                  bobbi@valevenue.com
                </a>
              </li>
              <li>Provo, Utah</li>
              <li>Close to I-15 &amp; University Ave</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-vale-border flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-xs text-vale-fg-muted">
            &copy; {new Date().getFullYear()} The Vale. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
