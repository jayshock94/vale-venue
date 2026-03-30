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
  customColors: ThemeColors | null;
  setTheme: (colors: ThemeColors) => void;
  resetTheme: () => void;
  isCustomTheme: boolean;
  isPickerOpen: boolean;
  openPicker: () => void;
  closePicker: () => void;
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
  const [isPickerOpen, setIsPickerOpen] = useState(false);

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

  const openPicker = useCallback(() => setIsPickerOpen(true), []);
  const closePicker = useCallback(() => setIsPickerOpen(false), []);

  return (
    <ThemeContext.Provider
      value={{
        customColors,
        setTheme,
        resetTheme,
        isCustomTheme: customColors !== null,
        isPickerOpen,
        openPicker,
        closePicker,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
