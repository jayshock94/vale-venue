/**
 * A curated dictionary of ~100 color names commonly used in wedding and event
 * planning. Maps natural language descriptions to hex values.
 *
 * Lookup is case-insensitive and matches partial strings.
 */

const COLOR_DICTIONARY: Record<string, string> = {
  // Reds & Pinks
  "dusty rose": "#D4A5A5",
  "blush": "#F2C4C4",
  "blush pink": "#F2C4C4",
  "rose": "#C2718D",
  "rose gold": "#B76E79",
  "mauve": "#C9A0A0",
  "burgundy": "#800020",
  "wine": "#722F37",
  "cranberry": "#9B1B30",
  "coral": "#E87461",
  "salmon": "#E8967A",
  "terracotta": "#C75B39",
  "rust": "#A44A3F",
  "brick": "#8B3A3A",
  "raspberry": "#8B1A4A",

  // Oranges & Warm Tones
  "peach": "#F5C5A3",
  "apricot": "#F0B68B",
  "copper": "#B36B3E",
  "burnt orange": "#C45A27",
  "tangerine": "#E87C3A",
  "amber": "#FFBF00",
  "honey": "#D4A44C",
  "champagne": "#F7E7CE",
  "gold": "#C4A350",
  "golden": "#C4A350",

  // Yellows
  "buttercup": "#F0C75E",
  "mustard": "#C4A030",
  "sunflower": "#E8B83D",
  "lemon": "#EBD867",
  "cream": "#F5F0DC",
  "ivory": "#EEEBE0",

  // Greens
  "sage": "#87A878",
  "sage green": "#87A878",
  "eucalyptus": "#6B8F71",
  "olive": "#6B7535",
  "moss": "#4A6741",
  "forest green": "#2C5F2D",
  "emerald": "#1B6B4A",
  "hunter green": "#355E3B",
  "mint": "#A8D8B9",
  "seafoam": "#93D7BE",
  "pistachio": "#B5CC8E",
  "fern": "#4F7942",
  "jade": "#3A8565",

  // Blues
  "navy": "#1B2A4A",
  "navy blue": "#1B2A4A",
  "slate blue": "#5B6A8A",
  "dusty blue": "#8BA3C4",
  "powder blue": "#B4C8DB",
  "baby blue": "#C4D8E8",
  "cornflower": "#6495ED",
  "cobalt": "#1B3D87",
  "royal blue": "#2C3E8F",
  "ice blue": "#D3E4F0",
  "steel blue": "#4682B4",
  "french blue": "#3A5BA0",
  "ocean": "#2C5F7C",
  "teal": "#2A7C7C",

  // Purples
  "lavender": "#B8A9C9",
  "lilac": "#C8A2C8",
  "plum": "#6B3A6B",
  "eggplant": "#4A2040",
  "mauve purple": "#9A6A9A",
  "wisteria": "#A490BF",
  "amethyst": "#8B5EAF",
  "violet": "#6A3D9A",
  "grape": "#5D3F6A",
  "orchid": "#B06CA8",

  // Neutrals & Earth Tones
  "charcoal": "#36454F",
  "slate": "#5A6672",
  "silver": "#B0B5B3",
  "pewter": "#8E9196",
  "stone": "#8C857B",
  "taupe": "#A08B73",
  "sand": "#C8B88A",
  "beige": "#D4C5A9",
  "khaki": "#B5A77D",
  "mocha": "#7A5C47",
  "chocolate": "#553322",
  "espresso": "#3C2415",
  "caramel": "#A0714E",
  "tan": "#C4A777",
  "mushroom": "#B8AFA0",
  "greige": "#B5AFA3",
  "linen": "#EDE5D8",
  "oatmeal": "#D9CFC0",

  // Black & White Variants
  "black": "#1A1A19",
  "white": "#FAFAF8",
  "off-white": "#F2F1ED",
  "warm white": "#FAF8F0",
};

/**
 * Look up a color by name. Case-insensitive, matches partial strings.
 * Returns null if no match found.
 */
export function lookupColorName(input: string): string | null {
  const query = input.toLowerCase().trim();
  if (!query) return null;

  // Exact match first
  if (COLOR_DICTIONARY[query]) return COLOR_DICTIONARY[query];

  // Partial match (input contains a known name, or a known name contains the input)
  for (const [name, hex] of Object.entries(COLOR_DICTIONARY)) {
    if (name.includes(query) || query.includes(name)) return hex;
  }

  return null;
}

/**
 * Get all available color names for display in suggestions.
 */
export function getAllColorNames(): { name: string; hex: string }[] {
  return Object.entries(COLOR_DICTIONARY).map(([name, hex]) => ({
    name,
    hex,
  }));
}
