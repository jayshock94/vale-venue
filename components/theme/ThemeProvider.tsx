"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import {
  type ThemeColors,
  generateSemanticTokens,
  applyTheme,
  clearTheme,
  saveThemeToSession,
  loadThemeFromSession,
  clearThemeFromSession,
} from "@/lib/theme-engine";

type ThemeContextValue = {
  /** Current custom colors, or null if using default theme */
  customColors: ThemeColors | null;
  /** Apply a custom theme from three colors */
  setTheme: (colors: ThemeColors) => void;
  /** Reset to the default Vale theme */
  resetTheme: () => void;
  /** Whether a custom theme is currently active */
  isCustomTheme: boolean;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return ctx;
}

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [customColors, setCustomColors] = useState<ThemeColors | null>(null);

  // Restore theme from session on mount
  useEffect(() => {
    const stored = loadThemeFromSession();
    if (stored) {
      const tokens = generateSemanticTokens(stored);
      applyTheme(tokens);
      setCustomColors(stored);
    }
  }, []);

  const setTheme = useCallback((colors: ThemeColors) => {
    const tokens = generateSemanticTokens(colors);
    applyTheme(tokens);
    saveThemeToSession(colors);
    setCustomColors(colors);
  }, []);

  const resetTheme = useCallback(() => {
    clearTheme();
    clearThemeFromSession();
    setCustomColors(null);
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        customColors,
        setTheme,
        resetTheme,
        isCustomTheme: customColors !== null,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
