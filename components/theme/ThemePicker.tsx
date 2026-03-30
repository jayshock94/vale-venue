"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useTheme } from "./ThemeProvider";
import { THEME_PRESETS } from "@/lib/theme-presets";
import { lookupColorName, getAllColorNames } from "@/lib/color-names";
import { extractColorsFromImage } from "@/lib/color-extract";
import { type ThemeColors, hexToHsl, hslToHex } from "@/lib/theme-engine";
import DecorDots from "@/components/ui/DecorDots";

type Tab = "presets" | "hex" | "name" | "image";

export default function ThemePicker() {
  const { customColors, setTheme, resetTheme, isCustomTheme, isPickerOpen: isOpen, openPicker, closePicker } = useTheme();
  const [activeTab, setActiveTab] = useState<Tab>("presets");

  useEffect(() => {
    if (isOpen) {
      window.scrollTo({ top: 0, behavior: "instant" });
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      {/* Floating controls */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
        {isCustomTheme && (
          <button
            onClick={resetTheme}
            className="h-10 px-4 rounded-full bg-[#2E2B26] text-[#F3F1EB] text-sm font-medium shadow-lg hover:bg-[#3D3A34] transition-colors"
          >
            Reset colors
          </button>
        )}
        <button
          onClick={() => openPicker()}
          className="w-12 h-12 rounded-full bg-[#2E2B26] text-[#F3F1EB] flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
          aria-label="Customize colors"
          title="Customize colors"
        >
          <PaletteIcon />
        </button>
      </div>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => closePicker()}
      />

      {/* Modal — mobile: centered, desktop: right side panel */}
      <div
        className={`fixed z-50 bg-vale-surface shadow-2xl transition-all duration-300 ease-out overflow-hidden
          inset-4 top-16 rounded-3xl
          md:inset-auto md:top-0 md:right-0 md:bottom-0 md:w-[420px] md:rounded-none md:rounded-l-3xl
          ${isOpen
            ? "opacity-100 scale-100 md:translate-x-0"
            : "opacity-0 scale-95 pointer-events-none md:opacity-100 md:scale-100 md:pointer-events-auto md:translate-x-full"
          }`}
      >
        <div className="relative flex flex-col h-full max-h-[80vh] md:max-h-screen overflow-hidden">
          {/* Decorative dots in header */}
          <DecorDots className="top-2 right-2 opacity-40" count={8} spread={70} />

          {/* Header */}
          <div className="relative px-6 pt-6 pb-4">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-semibold font-[family-name:var(--font-heading)] leading-tight">
                  See it in your colors
                </h2>
                <p className="text-sm text-vale-fg-muted mt-1.5">
                  Pick your palette and watch the site change.
                </p>
              </div>
              <button
                onClick={() => closePicker()}
                className="mt-1 w-9 h-9 flex items-center justify-center rounded-full hover:bg-vale-bg-alt transition-colors shrink-0"
                aria-label="Close"
              >
                <CloseIcon />
              </button>
            </div>

            {/* Pill tabs */}
            <div className="flex gap-2 mt-5">
              {(
                [
                  { key: "presets", label: "Presets" },
                  { key: "hex", label: "Hex" },
                  { key: "name", label: "By Name" },
                  { key: "image", label: "Image" },
                ] as { key: Tab; label: string }[]
              ).map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`px-4 py-1.5 text-sm font-medium rounded-full transition-colors ${
                    activeTab === key
                      ? "bg-vale-accent text-vale-accent-fg"
                      : "text-vale-fg-muted hover:bg-vale-bg-alt"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-vale-border mx-6" />

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-6 py-5">
            {activeTab === "presets" && (
              <PresetsTab onApply={setTheme} activeColors={customColors} />
            )}
            {activeTab === "hex" && <HexTab onApply={setTheme} />}
            {activeTab === "name" && <NameTab onApply={setTheme} />}
            {activeTab === "image" && <ImageTab onApply={setTheme} />}
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Presets Tab ───

function PresetsTab({
  onApply,
  activeColors,
}: {
  onApply: (c: ThemeColors) => void;
  activeColors: ThemeColors | null;
}) {
  const isActive = (preset: ThemeColors) =>
    activeColors &&
    activeColors.primary === preset.primary &&
    activeColors.secondary === preset.secondary &&
    activeColors.tertiary === preset.tertiary;

  return (
    <div className="grid grid-cols-2 gap-3">
      {THEME_PRESETS.map((preset) => {
        const active = isActive(preset.colors);
        return (
          <button
            key={preset.name}
            onClick={() => onApply(preset.colors)}
            className={`relative text-left p-4 rounded-xl shadow-sm transition-all duration-200 group hover:-translate-y-0.5 hover:shadow-md ${
              active
                ? "ring-2 ring-vale-accent bg-vale-bg-alt"
                : "bg-vale-surface border border-vale-border hover:border-vale-border-strong"
            }`}
          >
            <div className="flex gap-2 mb-3">
              <div
                className="w-10 h-10 rounded-full border border-black/5 shadow-sm"
                style={{ backgroundColor: preset.colors.primary }}
              />
              <div
                className="w-10 h-10 rounded-full border border-black/5 shadow-sm"
                style={{ backgroundColor: preset.colors.secondary }}
              />
              <div
                className="w-10 h-10 rounded-full border border-black/5 shadow-sm"
                style={{ backgroundColor: preset.colors.tertiary }}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium font-[family-name:var(--font-heading)]">
                {preset.name}
              </span>
              {active && (
                <span className="w-5 h-5 rounded-full bg-vale-accent text-vale-accent-fg flex items-center justify-center">
                  <CheckIcon />
                </span>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}

// ─── Hex Code Tab ───

function HexTab({ onApply }: { onApply: (c: ThemeColors) => void }) {
  const [primary, setPrimary] = useState("#5F5020");
  const [secondary, setSecondary] = useState("#C8B88A");
  const [tertiary, setTertiary] = useState("#9E9A90");

  const isValidHex = (v: string) => /^#[0-9A-Fa-f]{6}$/.test(v);

  const handleApply = () => {
    if (isValidHex(primary) && isValidHex(secondary) && isValidHex(tertiary)) {
      onApply({ primary, secondary, tertiary });
    }
  };

  return (
    <div className="space-y-6">
      <p className="text-sm text-vale-fg-muted leading-relaxed">
        Enter hex codes for your event colors. The site will adapt to match.
      </p>

      {(
        [
          { label: "Primary", value: primary, set: setPrimary },
          { label: "Secondary", value: secondary, set: setSecondary },
          { label: "Tertiary", value: tertiary, set: setTertiary },
        ] as const
      ).map(({ label, value, set }) => (
        <div key={label}>
          <label className="block text-sm font-medium mb-2">{label}</label>
          <div className="flex gap-3">
            <input
              type="color"
              value={isValidHex(value) ? value : "#000000"}
              onChange={(e) => set(e.target.value)}
              className="w-12 h-12 rounded-xl border border-vale-border cursor-pointer shrink-0 shadow-sm"
            />
            <input
              type="text"
              value={value}
              onChange={(e) => {
                let v = e.target.value;
                if (!v.startsWith("#")) v = "#" + v;
                set(v);
              }}
              placeholder="#000000"
              className="flex-1 px-4 py-3 rounded-xl border border-vale-border bg-vale-bg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-vale-accent/30 focus:border-vale-accent"
              maxLength={7}
            />
          </div>
        </div>
      ))}

      <button
        onClick={handleApply}
        disabled={!isValidHex(primary) || !isValidHex(secondary) || !isValidHex(tertiary)}
        className="w-full py-3.5 rounded-xl bg-vale-accent text-vale-accent-fg font-medium text-sm uppercase tracking-wide hover:bg-vale-accent-hover shadow-sm disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        Apply Colors
      </button>
    </div>
  );
}

// ─── Name Tab ───

function NameTab({ onApply }: { onApply: (c: ThemeColors) => void }) {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<{ name: string; hex: string }[]>([]);
  const [selected, setSelected] = useState<ThemeColors | null>(null);
  const allColors = getAllColorNames();

  const handleInput = (value: string) => {
    setQuery(value);
    setShowSuggestions(true);
    if (value.length < 2) {
      setSuggestions([]);
      return;
    }
    const lower = value.toLowerCase();
    setSuggestions(
      allColors.filter((c) => c.name.includes(lower)).slice(0, 8)
    );

    const mainColor = lookupColorName(value);
    if (mainColor) {
      setSelected({
        primary: mainColor,
        secondary: shiftHue(mainColor, 30),
        tertiary: shiftHue(mainColor, -20),
      });
    }
  };

  const handleSelectSuggestion = (name: string, hex: string) => {
    setQuery(name);
    setShowSuggestions(false);
    setSelected({
      primary: hex,
      secondary: shiftHue(hex, 30),
      tertiary: shiftHue(hex, -20),
    });
  };

  return (
    <div className="space-y-6">
      <p className="text-sm text-vale-fg-muted leading-relaxed">
        Type a color name like &ldquo;dusty rose,&rdquo; &ldquo;sage,&rdquo;
        or &ldquo;navy&rdquo; and we&rsquo;ll build a palette around it.
      </p>

      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => handleInput(e.target.value)}
          placeholder='Try "sage green" or "champagne"'
          className="w-full px-4 py-3 rounded-xl border border-vale-border bg-vale-bg text-sm focus:outline-none focus:ring-2 focus:ring-vale-accent/30 focus:border-vale-accent"
        />
        {showSuggestions && suggestions.length > 0 && (
          <ul className="absolute top-full left-0 right-0 mt-2 bg-vale-surface border border-vale-border rounded-xl shadow-lg z-10 max-h-48 overflow-y-auto">
            {suggestions.map((s) => (
              <li key={s.name}>
                <button
                  onMouseDown={(e) => {
                    e.preventDefault();
                    handleSelectSuggestion(s.name, s.hex);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-vale-bg-alt transition-colors text-left first:rounded-t-xl last:rounded-b-xl"
                >
                  <div
                    className="w-6 h-6 rounded-full border border-black/5 shadow-sm shrink-0"
                    style={{ backgroundColor: s.hex }}
                  />
                  <span className="capitalize">{s.name}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {selected && (
        <>
          <div className="flex gap-4 justify-center">
            {[
              { color: selected.primary, label: "Primary" },
              { color: selected.secondary, label: "Secondary" },
              { color: selected.tertiary, label: "Tertiary" },
            ].map(({ color, label }) => (
              <div key={label} className="flex flex-col items-center gap-1.5">
                <div
                  className="w-14 h-14 rounded-xl border border-black/5 shadow-sm"
                  style={{ backgroundColor: color }}
                />
                <span className="text-[11px] text-vale-fg-muted uppercase tracking-wider">
                  {label}
                </span>
              </div>
            ))}
          </div>
          <button
            onClick={() => onApply(selected)}
            className="w-full py-3.5 rounded-xl bg-vale-accent text-vale-accent-fg font-medium text-sm uppercase tracking-wide hover:bg-vale-accent-hover shadow-sm transition-colors"
          >
            Apply Palette
          </button>
        </>
      )}
    </div>
  );
}

// ─── Image Upload Tab ───

function ImageTab({ onApply }: { onApply: (c: ThemeColors) => void }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [extracted, setExtracted] = useState<ThemeColors | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFile = useCallback(async (file: File) => {
    setLoading(true);
    setPreview(URL.createObjectURL(file));
    try {
      const [primary, secondary, tertiary] = await extractColorsFromImage(file);
      setExtracted({ primary, secondary, tertiary });
    } catch {
      setExtracted(null);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  return (
    <div className="space-y-6">
      <p className="text-sm text-vale-fg-muted leading-relaxed">
        Upload a photo of your invitation suite, a fabric swatch, or a
        screenshot from Pinterest. We&rsquo;ll pull the colors automatically.
      </p>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />

      <button
        onClick={() => fileRef.current?.click()}
        className="w-full py-10 rounded-xl border-2 border-dashed border-vale-border hover:border-vale-accent text-vale-fg-muted hover:text-vale-accent text-sm transition-colors text-center flex flex-col items-center gap-2"
      >
        <UploadIcon />
        <span>{loading ? "Extracting colors..." : "Click to upload an image"}</span>
      </button>

      {preview && (
        <img
          src={preview}
          alt="Uploaded preview"
          className="w-full h-40 object-cover rounded-xl"
        />
      )}

      {extracted && (
        <>
          <div className="flex gap-4 justify-center">
            {[
              { color: extracted.primary, label: "Primary" },
              { color: extracted.secondary, label: "Secondary" },
              { color: extracted.tertiary, label: "Tertiary" },
            ].map(({ color, label }) => (
              <div key={label} className="flex flex-col items-center gap-1.5">
                <div
                  className="w-14 h-14 rounded-xl border border-black/5 shadow-sm"
                  style={{ backgroundColor: color }}
                />
                <span className="text-[11px] text-vale-fg-muted uppercase tracking-wider">
                  {label}
                </span>
              </div>
            ))}
          </div>
          <button
            onClick={() => onApply(extracted)}
            className="w-full py-3.5 rounded-xl bg-vale-accent text-vale-accent-fg font-medium text-sm uppercase tracking-wide hover:bg-vale-accent-hover shadow-sm transition-colors"
          >
            Apply Extracted Colors
          </button>
        </>
      )}
    </div>
  );
}

// ─── Utilities ───

function shiftHue(hex: string, degrees: number): string {
  const hsl = hexToHsl(hex);
  return hslToHex({
    h: (hsl.h + degrees / 360 + 1) % 1,
    s: Math.max(0.1, hsl.s * 0.8),
    l: Math.min(0.9, Math.max(0.3, hsl.l + 0.15)),
  });
}

// ─── Icons ───

function PaletteIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="13.5" cy="6.5" r="2" />
      <circle cx="17.5" cy="10.5" r="2" />
      <circle cx="8.5" cy="7.5" r="2" />
      <circle cx="6.5" cy="12.5" r="2" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function UploadIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-60">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  );
}
