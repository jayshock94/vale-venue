import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-neutral-800">
      {/* Main grid */}
      <div className="max-w-content mx-auto px-5 md:px-page py-16">
        <div
          className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8"
          style={{ gridTemplateColumns: undefined }}
        >
          {/* Col 1: Brand */}
          <div className="md:col-span-1" style={{ flex: '1.5' }}>
            <div className="flex flex-col leading-none mb-4">
              <span className="font-serif italic text-xl text-neutral-50">
                The Vale
              </span>
              <span className="font-sans font-light text-2xs uppercase tracking-nav text-neutral-400 mt-1">
                at ten seventy-eight
              </span>
            </div>
            <p className="font-sans font-light text-sm text-neutral-400 max-w-[260px]">
              A modern event space at the base of the Wasatch mountains. Provo, Utah.
            </p>
          </div>

          {/* Col 2: Venue */}
          <div>
            <h4 className="font-sans font-medium text-xs uppercase tracking-label text-neutral-50 mb-4">
              Venue
            </h4>
            <nav className="flex flex-col gap-3">
              {[
                { href: '/', label: 'Home' },
                { href: '/pricing', label: 'Pricing' },
                { href: '/gallery', label: 'Gallery' },
                { href: '/contact', label: 'Contact' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-sans font-light text-sm text-neutral-400 hover:text-neutral-50 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Col 3: Events */}
          <div>
            <h4 className="font-sans font-medium text-xs uppercase tracking-label text-neutral-50 mb-4">
              Events
            </h4>
            <nav className="flex flex-col gap-3">
              {['Weddings', 'Corporate', 'Celebrations'].map((item) => (
                <span
                  key={item}
                  className="font-sans font-light text-sm text-neutral-400"
                >
                  {item}
                </span>
              ))}
            </nav>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h4 className="font-sans font-medium text-xs uppercase tracking-label text-neutral-50 mb-4">
              Contact
            </h4>
            <div className="flex flex-col gap-3">
              <address className="not-italic font-sans font-light text-sm text-neutral-400">
                1078 South 250 East
                <br />
                Provo, Utah
              </address>
              <a
                href="tel:8015926287"
                className="font-sans font-light text-sm text-neutral-400 hover:text-neutral-50 transition-colors"
              >
                801-592-6287
              </a>
              <a
                href="mailto:bobbi@valevenue.com"
                className="font-sans font-light text-sm text-neutral-400 hover:text-neutral-50 transition-colors"
              >
                bobbi@valevenue.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-content mx-auto px-5 md:px-page py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-sans font-light text-xs text-neutral-500">
            &copy; {new Date().getFullYear()} The Vale. All rights reserved.
          </p>

          <p className="font-sans font-light text-xs text-neutral-500">
            Provo, Utah
          </p>
        </div>
      </div>
    </footer>
  )
}
