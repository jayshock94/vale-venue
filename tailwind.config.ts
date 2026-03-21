// Token pipeline: vale-design-system.json → lib/tokens.ts → here
// Zero hardcoded hex values. All primitives imported from tokens.ts.
import type { Config } from 'tailwindcss'
import { color, typography, spacing, borderRadius, shadow, maxWidth, adminColor } from './lib/tokens'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ── COLORS ────────────────────────────────────────────────
      colors: {
        gold:    color.gold,
        neutral: color.neutral,
        rule:    color.rule,
        sage:    color.sage,
        rust:    color.rust,
        amber:   color.amber,
        // Admin palette — functional/neutral, not warm
        admin: adminColor,
      },

      // ── TYPOGRAPHY ────────────────────────────────────────────
      fontFamily: {
        serif: [typography.family.display, 'Georgia', 'serif'],
        sans:  [typography.family.ui, 'system-ui', 'sans-serif'],
      },
      // Font sizes aligned exactly to vale-design-system.json typography.size
      fontSize: {
        'xs':    [typography.size['10'], { lineHeight: typography.lineHeight.relaxed }],
        '2xs':   [typography.size['11'], { lineHeight: typography.lineHeight.normal }],
        'sm':    [typography.size['12'], { lineHeight: typography.lineHeight.relaxed }],
        'base':  [typography.size['13'], { lineHeight: typography.lineHeight.loose }],
        'input': [typography.size['14'], { lineHeight: typography.lineHeight.normal }],
        'md':    [typography.size['15'], { lineHeight: typography.lineHeight.relaxed }],
        'lg':    [typography.size['18'], { lineHeight: typography.lineHeight.snug }],
        'xl':    [typography.size['20'], { lineHeight: typography.lineHeight.snug }],
        '2xl':   [typography.size['24'], { lineHeight: typography.lineHeight.snug }],
        '3xl':   [typography.size['34'], { lineHeight: typography.lineHeight.tight }],
        '4xl':   [typography.size['40'], { lineHeight: typography.lineHeight.tight }],
        '5xl':   [typography.size['52'], { lineHeight: typography.lineHeight.tight }],
        '6xl':   [typography.size['80'], { lineHeight: typography.lineHeight.tight }],
      },
      fontWeight: {
        regular:  typography.weight.regular,
        medium:   typography.weight.medium,
        semibold: typography.weight.semibold,
      },
      letterSpacing: {
        tightest: typography.letterSpacing.tight,
        normal:   typography.letterSpacing.normal,
        btn:      typography.letterSpacing.btn,
        label:    typography.letterSpacing.label,
        nav:      typography.letterSpacing.nav,
        eyebrow:  typography.letterSpacing.eyebrow,
        badge:    typography.letterSpacing.badge,
        stat:     typography.letterSpacing.stat,
      },

      // ── SPACING ───────────────────────────────────────────────
      // Named tokens from the JSON; numeric aliases kept for existing classes
      spacing: {
        'page':          spacing['page-x'],
        'page-tablet':   spacing['page-x-tablet'],
        'page-mobile':   spacing['page-x-mobile'],
        'section':       spacing['section'],
        'section-tight': spacing['section-tight'],
        'nav-height':    spacing['nav-height'],
        'nav-mobile':    spacing['nav-height-mobile'],
        // Numeric shorthands — values trace to 4px-grid multiples
        '4.5': '18px',   // 4.5 × 4px
        '13':  '52px',   // 13 × 4px
        '15':  '60px',   // 15 × 4px
        '18':  '72px',   // 18 × 4px  (layout.hero.gap)
        '22':  '88px',   // 22 × 4px  (component.stats-bar.height)
        '25':  '100px',  // 25 × 4px
      },

      // ── BORDER RADIUS ─────────────────────────────────────────
      borderRadius: {
        'none':    borderRadius.none,
        'sharp':   borderRadius.sharp,
        'soft':    borderRadius.soft,
        'admin':   borderRadius.admin,
        'DEFAULT': borderRadius.sharp,
      },

      // ── MAX WIDTH ─────────────────────────────────────────────
      maxWidth: {
        'body':    maxWidth.body,
        'content': maxWidth.content,
        'form':    maxWidth.form,
        'pricing': maxWidth.pricing,
      },

      // ── TRANSITIONS ───────────────────────────────────────────
      transitionDuration: {
        'fast':    '130ms',
        'default': '150ms',
        'slow':    '300ms',
      },
      transitionTimingFunction: {
        DEFAULT: 'ease',
      },

      // ── BOX SHADOW ────────────────────────────────────────────
      // No decorative shadows — focus rings only
      boxShadow: {
        'focus-gold': shadow['focus-gold'],
        'focus-ink':  shadow['focus-ink'],
        'none':       shadow.none,
      },

      // ── BACKGROUND IMAGE ──────────────────────────────────────
      backgroundImage: {
        'none': 'none', // no gradients on this site
      },
    },
  },
  plugins: [],
}

export default config
