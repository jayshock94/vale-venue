/**
 * THE VALE — Dynamic Theming Engine
 *
 * Generates a full color system from three user-provided colors (primary,
 * secondary, tertiary). Every semantic token derives from tonal ramps built
 * off those inputs. Contrast correction ensures all text/background pairs
 * hit WCAG AAA (7:1 minimum).
 *
 * Inspired by Material 3's tonal palette system, simplified for CSS custom
 * properties.
 */

// ─── Color Math Utilities ───

export type HSL = { h: number; s: number; l: number };
export type RGB = { r: number; g: number; b: number };

export function hexToRgb(hex: string): RGB {
  const clean = hex.replace("#", "");
  const full =
    clean.length === 3
      ? clean
          .split("")
          .map((c) => c + c)
          .join("")
      : clean;
  const n = parseInt(full, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

export function rgbToHex(rgb: RGB): string {
  const toHex = (n: number) =>
    Math.round(Math.max(0, Math.min(255, n)))
      .toString(16)
      .padStart(2, "0");
  return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`;
}

export function rgbToHsl(rgb: RGB): HSL {
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return { h: 0, s: 0, l };
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;
  return { h, s, l };
}

export function hslToRgb(hsl: HSL): RGB {
  const { h, s, l } = hsl;
  if (s === 0) {
    const v = Math.round(l * 255);
    return { r: v, g: v, b: v };
  }
  const hue2rgb = (p: number, q: number, t: number) => {
    let tt = t;
    if (tt < 0) tt += 1;
    if (tt > 1) tt -= 1;
    if (tt < 1 / 6) return p + (q - p) * 6 * tt;
    if (tt < 1 / 2) return q;
    if (tt < 2 / 3) return p + (q - p) * (2 / 3 - tt) * 6;
    return p;
  };
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  return {
    r: Math.round(hue2rgb(p, q, h + 1 / 3) * 255),
    g: Math.round(hue2rgb(p, q, h) * 255),
    b: Math.round(hue2rgb(p, q, h - 1 / 3) * 255),
  };
}

export function hslToHex(hsl: HSL): string {
  return rgbToHex(hslToRgb(hsl));
}

export function hexToHsl(hex: string): HSL {
  return rgbToHsl(hexToRgb(hex));
}

// ─── Relative Luminance & Contrast ───

function srgbChannel(c: number): number {
  const s = c / 255;
  return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
}

export function relativeLuminance(rgb: RGB): number {
  return (
    0.2126 * srgbChannel(rgb.r) +
    0.7152 * srgbChannel(rgb.g) +
    0.0722 * srgbChannel(rgb.b)
  );
}

export function contrastRatio(hex1: string, hex2: string): number {
  const l1 = relativeLuminance(hexToRgb(hex1));
  const l2 = relativeLuminance(hexToRgb(hex2));
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

// ─── Tonal Ramp Generation ───

/**
 * Generate a 13-step tonal ramp from a base color.
 * Steps go from very dark (index 0, ~5% lightness) to very light (index 12, ~98%).
 * The hue and saturation are preserved; only lightness varies.
 * Saturation is reduced at extremes to avoid neon artifacts.
 */
const TONE_LIGHTNESS = [
  0.05, 0.1, 0.15, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.87, 0.92, 0.96,
];

export function generateTonalRamp(hex: string): string[] {
  const base = hexToHsl(hex);
  return TONE_LIGHTNESS.map((l) => {
    // Reduce saturation at extremes to keep colors clean, but preserve
    // enough at the light end so backgrounds retain warmth/tint
    const satMod =
      l < 0.15 ? 0.4 :
      l < 0.25 ? 0.7 :
      l > 0.92 ? 0.6 :
      l > 0.8 ? 0.8 :
      1;
    return hslToHex({ h: base.h, s: base.s * satMod, l });
  });
}

// ─── Contrast Correction ───

/**
 * Given a foreground and background hex, if their contrast ratio is below
 * the target (default 7:1 for AAA), adjust the foreground lightness until
 * it passes. Tries darkening first on light backgrounds, lightening on dark.
 */
export function ensureContrast(
  fgHex: string,
  bgHex: string,
  targetRatio: number = 7
): string {
  if (contrastRatio(fgHex, bgHex) >= targetRatio) return fgHex;

  const bgLum = relativeLuminance(hexToRgb(bgHex));
  const fgHsl = hexToHsl(fgHex);
  const isLightBg = bgLum > 0.5;

  // Binary search for the right lightness
  let lo = isLightBg ? 0 : fgHsl.l;
  let hi = isLightBg ? fgHsl.l : 1;
  let best = fgHex;

  for (let i = 0; i < 20; i++) {
    const mid = (lo + hi) / 2;
    const candidate = hslToHex({ ...fgHsl, l: mid });
    const ratio = contrastRatio(candidate, bgHex);
    if (ratio >= targetRatio) {
      best = candidate;
      if (isLightBg) lo = mid;
      else hi = mid;
    } else {
      if (isLightBg) hi = mid;
      else lo = mid;
    }
  }
  return best;
}

// ─── Semantic Token Generation ───

export type ThemeColors = {
  primary: string;
  secondary: string;
  tertiary: string;
};

export type SemanticTokens = {
  "--vale-bg": string;
  "--vale-bg-alt": string;
  "--vale-fg": string;
  "--vale-fg-muted": string;
  "--vale-accent": string;
  "--vale-accent-hover": string;
  "--vale-accent-fg": string;
  "--vale-border": string;
  "--vale-border-strong": string;
  "--vale-surface": string;
  "--vale-surface-raised": string;
};

/**
 * Generate all semantic tokens from three user-provided colors.
 *
 * Strategy:
 * - Primary drives the accent color (buttons, links, active states).
 * - Secondary provides the background tint.
 * - Tertiary provides the muted/border tones.
 * - Text colors are contrast-corrected against their backgrounds.
 */
export function generateSemanticTokens(colors: ThemeColors): SemanticTokens {
  const primaryRamp = generateTonalRamp(colors.primary);
  const secondaryRamp = generateTonalRamp(colors.secondary);
  const tertiaryRamp = generateTonalRamp(colors.tertiary);

  // Background: warm tint from secondary (not pure white)
  const bg = secondaryRamp[12]; // ~96% lightness, retains color warmth
  const bgAlt = secondaryRamp[11]; // ~92% lightness
  const surface = secondaryRamp[12]; // derived, not hardcoded white
  const surfaceRaised = secondaryRamp[11];

  // Foreground: very dark shade from primary for text
  const fg = ensureContrast(primaryRamp[1], bg);
  const fgMuted = ensureContrast(tertiaryRamp[4], bg); // slightly darker step for AAA

  // Accent: mid-tone from primary ramp, contrast-correct it
  const accent = ensureContrast(primaryRamp[4], bg);
  const accentHover = ensureContrast(primaryRamp[3], bg);
  // Accent foreground: use the generated bg (warm) instead of hardcoded white
  const accentFg = ensureContrast(bg, accent);

  // Borders from tertiary
  const border = tertiaryRamp[10];
  const borderStrong = tertiaryRamp[8];

  return {
    "--vale-bg": bg,
    "--vale-bg-alt": bgAlt,
    "--vale-fg": fg,
    "--vale-fg-muted": fgMuted,
    "--vale-accent": accent,
    "--vale-accent-hover": accentHover,
    "--vale-accent-fg": accentFg,
    "--vale-border": border,
    "--vale-border-strong": borderStrong,
    "--vale-surface": surface,
    "--vale-surface-raised": surfaceRaised,
  };
}

// ─── Apply Theme to DOM ───

export function applyTheme(tokens: SemanticTokens): void {
  const root = document.documentElement;
  for (const [prop, value] of Object.entries(tokens)) {
    root.style.setProperty(prop, value);
  }
}

export function clearTheme(): void {
  const root = document.documentElement;
  const props: (keyof SemanticTokens)[] = [
    "--vale-bg",
    "--vale-bg-alt",
    "--vale-fg",
    "--vale-fg-muted",
    "--vale-accent",
    "--vale-accent-hover",
    "--vale-accent-fg",
    "--vale-border",
    "--vale-border-strong",
    "--vale-surface",
    "--vale-surface-raised",
  ];
  for (const prop of props) {
    root.style.removeProperty(prop);
  }
}

// ─── Session Persistence ───

const STORAGE_KEY = "vale-theme";

export function saveThemeToSession(colors: ThemeColors): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(colors));
  } catch {
    // sessionStorage unavailable (SSR, private browsing) — silently ignore
  }
}

export function loadThemeFromSession(): ThemeColors | null {
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    return JSON.parse(stored) as ThemeColors;
  } catch {
    return null;
  }
}

export function clearThemeFromSession(): void {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // silently ignore
  }
}
