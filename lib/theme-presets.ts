import { type ThemeColors } from "./theme-engine";

export type ThemePreset = {
  name: string;
  colors: ThemeColors;
};

/**
 * Curated palette presets for common wedding and event color schemes.
 * 10 presets covering a range of moods and seasons.
 */
export const THEME_PRESETS: ThemePreset[] = [
  {
    name: "Golden Sand",
    colors: { primary: "#7A682F", secondary: "#C8B88A", tertiary: "#A08B73" },
  },
  {
    name: "Dusty Rose",
    colors: { primary: "#C2718D", secondary: "#D4A5A5", tertiary: "#B8A9C9" },
  },
  {
    name: "Sage & Cream",
    colors: { primary: "#6B8F71", secondary: "#D9CFC0", tertiary: "#87A878" },
  },
  {
    name: "Navy Classic",
    colors: { primary: "#1B2A4A", secondary: "#C4D8E8", tertiary: "#B76E79" },
  },
  {
    name: "Burgundy & Gold",
    colors: { primary: "#800020", secondary: "#F7E7CE", tertiary: "#C4A350" },
  },
  {
    name: "Lavender Dream",
    colors: { primary: "#8B5EAF", secondary: "#EDE5D8", tertiary: "#C8A2C8" },
  },
  {
    name: "Terracotta Sun",
    colors: { primary: "#C75B39", secondary: "#F5F0DC", tertiary: "#D4A44C" },
  },
  {
    name: "Eucalyptus",
    colors: { primary: "#4A6741", secondary: "#EDE5D8", tertiary: "#8C857B" },
  },
  {
    name: "Ocean Blue",
    colors: { primary: "#2C5F7C", secondary: "#D3E4F0", tertiary: "#4682B4" },
  },
  {
    name: "Modern Mocha",
    colors: { primary: "#7A5C47", secondary: "#D9CFC0", tertiary: "#553322" },
  },
];
