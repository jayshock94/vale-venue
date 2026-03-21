// Single source of truth — all values flow from vale-design-system.json
// This file is the JS/TS bridge; never hardcode values here or downstream.
import ds from './vale-design-system.json'

const cp = ds.color.primitive

// ── COLORS ──────────────────────────────────────────────────────────────────
export const color = {
  gold: {
    '50':  cp.gold['50'].$value,
    '100': cp.gold['100'].$value,
    '200': cp.gold['200'].$value,
    '300': cp.gold['300'].$value,
    '400': cp.gold['400'].$value,
    '500': cp.gold['500'].$value,
    '600': cp.gold['600'].$value,
    '700': cp.gold['700'].$value,
    '800': cp.gold['800'].$value,
    '900': cp.gold['900'].$value,
  },
  neutral: {
    '0':   cp.neutral['0'].$value,
    '50':  cp.neutral['50'].$value,
    '100': cp.neutral['100'].$value,
    '150': cp.neutral['150'].$value,
    '200': cp.neutral['200'].$value,
    '300': cp.neutral['300'].$value,
    '400': cp.neutral['400'].$value,
    '500': cp.neutral['500'].$value,
    '600': cp.neutral['600'].$value,
    '700': cp.neutral['700'].$value,
    '800': cp.neutral['800'].$value,
    '900': cp.neutral['900'].$value,
  },
  rule: {
    DEFAULT: cp.rule.default.$value,
    light:   cp.rule.light.$value,
  },
  sage: {
    '50':  cp.sage['50'].$value,
    '600': cp.sage['600'].$value,
    '800': cp.sage['800'].$value,
  },
  rust: {
    '50':  cp.rust['50'].$value,
    '600': cp.rust['600'].$value,
    '800': cp.rust['800'].$value,
  },
  amber: {
    '50':  cp.amber['50'].$value,
    '400': cp.amber['400'].$value,
    '800': cp.amber['800'].$value,
  },
} as const

// ── TYPOGRAPHY ───────────────────────────────────────────────────────────────
const ts = ds.typography

export const typography = {
  family: {
    display: ts.family.display.$value,
    ui:      ts.family.ui.$value,
  },
  size: {
    '10': ts.size['10'].$value,
    '11': ts.size['11'].$value,
    '12': ts.size['12'].$value,
    '13': ts.size['13'].$value,
    '14': ts.size['14'].$value,
    '15': ts.size['15'].$value,
    '18': ts.size['18'].$value,
    '20': ts.size['20'].$value,
    '24': ts.size['24'].$value,
    '34': ts.size['34'].$value,
    '40': ts.size['40'].$value,
    '52': ts.size['52'].$value,
    '80': ts.size['80'].$value,
  },
  weight: {
    regular:  String(ts.weight.regular.$value),
    medium:   String(ts.weight.medium.$value),
    semibold: String(ts.weight.semibold.$value),
  },
  letterSpacing: {
    tight:   ts.letterSpacing.tight.$value,
    normal:  ts.letterSpacing.normal.$value,
    btn:     ts.letterSpacing.btn.$value,
    label:   ts.letterSpacing.label.$value,
    nav:     ts.letterSpacing.nav.$value,
    eyebrow: ts.letterSpacing.eyebrow.$value,
    badge:   ts.letterSpacing.badge.$value,
    stat:    ts.letterSpacing.stat.$value,
  },
  lineHeight: {
    tight:   String(ts.lineHeight.tight.$value),
    snug:    String(ts.lineHeight.snug.$value),
    normal:  String(ts.lineHeight.normal.$value),
    relaxed: String(ts.lineHeight.relaxed.$value),
    loose:   String(ts.lineHeight.loose.$value),
  },
} as const

// ── SPACING ──────────────────────────────────────────────────────────────────
const sp = ds.spacing

export const spacing = {
  '1':               sp['1'].$value,
  '2':               sp['2'].$value,
  '3':               sp['3'].$value,
  '4':               sp['4'].$value,
  '5':               sp['5'].$value,
  '6':               sp['6'].$value,
  '8':               sp['8'].$value,
  '10':              sp['10'].$value,
  '12':              sp['12'].$value,
  '16':              sp['16'].$value,
  '20':              sp['20'].$value,
  '24':              sp['24'].$value,
  'page-x':          sp['page-x'].$value,
  'page-x-tablet':   sp['page-x-tablet'].$value,
  'page-x-mobile':   sp['page-x-mobile'].$value,
  'section':         sp['section'].$value,
  'section-tight':   sp['section-tight'].$value,
  'nav-height':      sp['nav-height'].$value,
  'nav-height-mobile': sp['nav-height-mobile'].$value,
} as const

// ── BORDER RADIUS ────────────────────────────────────────────────────────────
export const borderRadius = {
  none:   ds.borderRadius.none.$value,
  sharp:  ds.borderRadius.sharp.$value,
  soft:   ds.borderRadius.soft.$value,
  action: ds.borderRadius.action.$value,
  admin:  ds.borderRadius.admin.$value,
  pill:   ds.borderRadius.pill.$value,
} as const

// ── SHADOW ───────────────────────────────────────────────────────────────────
export const shadow = {
  none:          ds.shadow.none.$value,
  'focus-gold':  ds.shadow['focus-gold'].$value,
  'focus-ink':   ds.shadow['focus-ink'].$value,
  'hover':       ds.shadow['hover'].$value,
} as const

// ── TRANSITION ───────────────────────────────────────────────────────────────
export const transition = {
  fast:    ds.transition.fast.$value,
  default: ds.transition.default.$value,
  slow:    ds.transition.slow.$value,
} as const

// ── MAX WIDTH ────────────────────────────────────────────────────────────────
export const maxWidth = {
  body:    ds['max-width']['body-text'].$value,
  content: ds['max-width'].content.$value,
  form:    ds['max-width'].form.$value,
  pricing: ds['max-width'].pricing.$value,
} as const

// ── ADMIN TOKENS ─────────────────────────────────────────────────────────────
// Admin uses a neutral/functional palette — separate from the warm public site.
const adm = ds.component.admin

export const adminColor = {
  border:  adm['border-color'].$value,
  page:    adm['page-bg'].$value,
  panel:   adm['panel-bg'].$value,
  text:    adm['text-primary'].$value,
  muted:   adm['text-muted'].$value,
  // Derived values (not in JSON; follow admin palette logic):
  alt:     '#FAFAFA',  // table stripe / hover (near-white, cool)
  divider: '#F0F0F0',  // table row divider
} as const

export default {
  color,
  typography,
  spacing,
  borderRadius,
  shadow,
  transition,
  maxWidth,
  adminColor,
}
