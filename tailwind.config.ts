// vale-tailwind.config.js
// Copy this content into tailwind.config.ts in the Next.js project root
// This wires the Vale design system tokens directly into Tailwind

import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ── COLORS ──────────────────────────────────────────────
      colors: {
        gold: {
          50:  '#FAF5EE',
          100: '#F2E6D4',
          200: '#E5CBA8',
          300: '#D9B082',
          400: '#C9A06E', // brand primary
          500: '#B8892F',
          600: '#9A7128',
          700: '#7A5920',
          800: '#5A4118',
          900: '#3A290F',
        },
        neutral: {
          0:   '#FFFFFF',
          50:  '#F5F0E8', // cream - page bg
          100: '#EDE7D9',
          150: '#E5DDD0',
          200: '#DDD6CA',
          300: '#C8BFAF', // stone
          400: '#A09890', // ghost
          500: '#7C7469', // muted
          600: '#4A4641', // slate
          700: '#2E2B27', // charcoal
          800: '#1C1917', // ink - primary dark
          900: '#0E0C0A',
        },
        rule: {
          DEFAULT: '#D9D2C5',
          light:   '#EDE7D9',
        },
        sage: {
          50:  '#EAF0EA',
          600: '#5A6B5A',
          800: '#3D4D3D',
        },
        rust: {
          50:  '#F5EDEA',
          600: '#9C4A2A',
          800: '#6B3020',
        },
        amber: {
          50:  '#FBF1E4',
          400: '#C17B2A',
          800: '#5A3810',
        },
      },

      // ── TYPOGRAPHY ─────────────────────────────────────────
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans:  ['DM Sans', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['9px',  { lineHeight: '1.4' }],
        xs:    ['10px', { lineHeight: '1.4' }],
        sm:    ['12px', { lineHeight: '1.6' }],
        base:  ['13px', { lineHeight: '1.85' }],
        md:    ['15px', { lineHeight: '1.7' }],
        lg:    ['18px', { lineHeight: '1.4' }],
        xl:    ['20px', { lineHeight: '1.35' }],
        '2xl': ['24px', { lineHeight: '1.25' }],
        '3xl': ['32px', { lineHeight: '1.2' }],
        '4xl': ['40px', { lineHeight: '1.15' }],
        '5xl': ['52px', { lineHeight: '1.1' }],
        '6xl': ['80px', { lineHeight: '1.0' }],
      },
      fontWeight: {
        light:    '300',
        regular:  '400',
        medium:   '500',
        semibold: '600',
      },
      letterSpacing: {
        tightest: '-0.02em',
        tight:    '-0.01em',
        normal:   '0em',
        wide:     '0.04em',
        wider:    '0.10em',
        nav:      '0.14em',
        btn:      '0.13em',
        label:    '0.26em',
        eyebrow:  '0.30em',
        widest:   '0.30em',
      },

      // ── SPACING ─────────────────────────────────────────────
      // Uses 8pt grid - all spacing is a multiple of 4 or 8
      spacing: {
        '4.5':  '18px',
        '13':   '52px',
        '15':   '60px',
        '18':   '72px',
        '22':   '88px',
        '25':   '100px',
        'page': '48px',   // horizontal page padding desktop
        'section': '96px', // between major page sections
      },

      // ── BORDER RADIUS ───────────────────────────────────────
      borderRadius: {
        'none':   '0px',
        'sharp':  '2px',  // buttons, badges
        'soft':   '3px',  // cards
        'admin':  '4px',  // admin panels and inputs
        'DEFAULT':'2px',
      },

      // ── MAX WIDTH ───────────────────────────────────────────
      maxWidth: {
        'body':    '680px',   // readable body copy
        'content': '1280px',  // main content container
        'form':    '600px',   // inquiry form
      },

      // ── TRANSITIONS ─────────────────────────────────────────
      transitionDuration: {
        'fast':    '130ms',
        'default': '150ms',
        'slow':    '300ms',
      },
      transitionTimingFunction: {
        'DEFAULT': 'ease',
      },

      // ── BOX SHADOW ──────────────────────────────────────────
      // No decorative shadows. Only focus rings.
      boxShadow: {
        'focus-gold': '0 0 0 3px rgba(201, 160, 110, 0.20)',
        'focus-ink':  '0 0 0 3px rgba(28, 25, 23, 0.15)',
        'none':       'none',
      },

      // ── BACKGROUND IMAGE ─────────────────────────────────────
      backgroundImage: {
        'none': 'none', // explicitly no gradients on this site
      },
    },
  },
  plugins: [],
}

export default config
