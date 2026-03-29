"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useTheme } from "./ThemeProvider";
import { THEME_PRESETS } from "@/lib/theme-presets";
import { lookupColorName, getAllColorNames } from "@/lib/color-names";
import { extractColorsFromImage } from "@/lib/color-extract";
import { type ThemeColors, hexToHsl, hslToHex } from "@/lib/theme-engine";

type Tab = "presets" | "hex" | "name" | "image";

export default function ThemePicker() {
  const { customColors, setTheme, resetTheme, isCustomTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("presets");

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      {/* Floating controls: stacked vertically, bottom-right */}
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
          onClick={() => setIsOpen(true)}
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
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer — mobile: bottom sheet, desktop: right side panel */}
      <div
        className={`fixed z-50 bg-vale-surface shadow-2xl transition-transform duration-300 ease-out
          inset-x-0 bottom-0 max-h-[70vh] rounded-t-2xl
          md:inset-x-auto md:top-0 md:right-0 md:bottom-0 md:w-[400px] md:max-h-none md:rounded-t-none md:rounded-l-2xl
          ${isOpen
            ? "translate-y-0 md:translate-y-0 md:translate-x-0"
            : "translate-y-full md:translate-y-0 md:translate-x-full"
          }`}
      >
        <div className="flex flex-col h-full max-h-[70vh] md:max-h-screen overflow-hidden">
          {/* Mobile drag handle */}
          <div className="md:hidden flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 rounded-full bg-vale-border-strong/50" />
          </div>

          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 md:pt-6 border-b border-vale-border">
            <div>
              <h2 className="text-lg font-semibold font-[family-name:var(--font-heading)]">
                See it in your colors
              </h2>
              <p className="text-sm text-vale-fg-muted mt-0.5">
                Pick your palette and watch the site change.
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-vale-bg-alt rounded-md transition-colors"
              aria-label="Close"
            >
              <CloseIcon />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-vale-border shrink-0">
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
                className={`flex-1 py-3 text-sm font-medium transition-colors ${
                  activeTab === key
                    ? "text-vale-fg border-b-2 border-vale-fg"
                    : "text-vale-fg-muted hover:text-vale-fg"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-5">
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
            className={`text-left p-3 rounded-lg border transition-colors group ${
              active
                ? "border-vale-fg bg-vale-bg-alt"
                : "border-vale-border hover:border-vale-border-strong"
            }`}
          >
            <div className="flex gap-1.5 mb-2">
              <div
                className="w-8 h-8 rounded-full border border-black/10"
                style={{ backgroundColor: preset.colors.primary }}
              />
              <div
                className="w-8 h-8 rounded-full border border-black/10"
                style={{ backgroundColor: preset.colors.secondary }}
              />
              <div
                className="w-8 h-8 rounded-full border border-black/10"
                style={{ backgroundColor: preset.colors.tertiary }}
              />
              {active && (
                <div className="w-8 h-8 rounded-full flex items-center justify-center">
                  <CheckIcon />
                </div>
              )}
            </div>
            <span className="text-sm font-medium group-hover:text-vale-fg transition-colors">
              {preset.name}
            </span>
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
    <div className="space-y-5">
      <p className="text-sm text-vale-fg-muted">
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
          <label className="block text-sm font-medium mb-1.5">{label}</label>
          <div className="flex gap-2">
            <input
              type="color"
              value={isValidHex(value) ? value : "#000000"}
              onChange={(e) => set(e.target.value)}
              className="w-10 h-10 rounded-md border border-vale-border cursor-pointer shrink-0"
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
              className="flex-1 px-3 py-2 rounded-md border border-vale-border bg-vale-bg text-sm font-mono focus:outline-none focus:border-vale-fg"
              maxLength={7}
            />
          </div>
        </div>
      ))}

      <button
        onClick={handleApply}
        disabled={!isValidHex(primary) || !isValidHex(secondary) || !isValidHex(tertiary)}
        className="w-full py-3 rounded-md bg-[#2E2B26] text-[#F3F1EB] font-medium text-sm uppercase tracking-wide hover:bg-[#3D3A34] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        Apply Colors
      </button>
    </div>
  );
}

// ─── Name Tab ───

function NameTab({ onApply }: { onApply: (c: ThemeColors) => void }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<{ name: string; hex: string }[]>([]);
  const [selected, setSelected] = useState<ThemeColors | null>(null);
  const allColors = getAllColorNames();

  const handleInput = (value: string) => {
    setQuery(value);
    if (value.length < 2) {
      setSuggestions([]);
      return;
    }
    const lower = value.toLowerCase();
    const matches = allColors
      .filter((c) => c.name.includes(lower))
      .slice(0, 8);
    setSuggestions(matches);

    const mainColor = lookupColorName(value);
    if (mainColor) {
      setSelected({
        primary: mainColor,
        secondary: shiftHue(mainColor, 30),
        tertiary: shiftHue(mainColor, -20),
      });
    }
  };

  const handleSelectSuggestion = (hex: string) => {
    const colors: ThemeColors = {
      primary: hex,
      secondary: shiftHue(hex, 30),
      tertiary: shiftHue(hex, -20),
    };
    setSelected(colors);
    setSuggestions([]);
  };

  return (
    <div className="space-y-5">
      <p className="text-sm text-vale-fg-muted">
        Type a color name like &ldquo;dusty rose,&rdquo; &ldquo;sage,&rdquo;
        or &ldquo;navy&rdquo; and we&rsquo;ll build a palette around it.
      </p>

      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => handleInput(e.target.value)}
          placeholder="Try &quot;sage green&quot; or &quot;champagne&quot;"
          className="w-full px-3 py-2.5 rounded-md border border-vale-border bg-vale-bg text-sm focus:outline-none focus:border-vale-fg"
        />
        {suggestions.length > 0 && (
          <ul className="absolute top-full left-0 right-0 mt-1 bg-vale-surface border border-vale-border rounded-md shadow-lg z-10 max-h-48 overflow-y-auto">
            {suggestions.map((s) => (
              <li key={s.name}>
                <button
                  onClick={() => {
                    setQuery(s.name);
                    handleSelectSuggestion(s.hex);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm hover:bg-vale-bg-alt transition-colors text-left"
                >
                  <div
                    className="w-5 h-5 rounded-full border border-black/10 shrink-0"
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
          <div className="flex gap-2">
            <div
              className="w-12 h-12 rounded-lg border border-black/10"
              style={{ backgroundColor: selected.primary }}
            />
            <div
              className="w-12 h-12 rounded-lg border border-black/10"
              style={{ backgroundColor: selected.secondary }}
            />
            <div
              className="w-12 h-12 rounded-lg border border-black/10"
              style={{ backgroundColor: selected.tertiary }}
            />
          </div>
          <button
            onClick={() => onApply(selected)}
            className="w-full py-3 rounded-md bg-[#2E2B26] text-[#F3F1EB] font-medium text-sm uppercase tracking-wide hover:bg-[#3D3A34] transition-colors"
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
    <div className="space-y-5">
      <p className="text-sm text-vale-fg-muted">
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
        className="w-full py-8 rounded-lg border-2 border-dashed border-vale-border hover:border-vale-fg-muted text-vale-fg-muted hover:text-vale-fg text-sm transition-colors text-center"
      >
        {loading ? "Extracting colors..." : "Click to upload an image"}
      </button>

      {preview && (
        <img
          src={preview}
          alt="Uploaded preview"
          className="w-full h-40 object-cover rounded-lg"
        />
      )}

      {extracted && (
        <>
          <div className="flex gap-2">
            <div
              className="w-12 h-12 rounded-lg border border-black/10"
              style={{ backgroundColor: extracted.primary }}
            />
            <div
              className="w-12 h-12 rounded-lg border border-black/10"
              style={{ backgroundColor: extracted.secondary }}
            />
            <div
              className="w-12 h-12 rounded-lg border border-black/10"
              style={{ backgroundColor: extracted.tertiary }}
            />
          </div>
          <button
            onClick={() => onApply(extracted)}
            className="w-full py-3 rounded-md bg-[#2E2B26] text-[#F3F1EB] font-medium text-sm uppercase tracking-wide hover:bg-[#3D3A34] transition-colors"
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
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
