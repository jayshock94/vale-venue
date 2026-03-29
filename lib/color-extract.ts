/**
 * Extract dominant colors from an image using a simplified median-cut algorithm.
 * Returns 3 hex colors suitable for primary, secondary, tertiary mapping.
 */

import { type RGB, rgbToHex, rgbToHsl } from "./theme-engine";

type Bucket = RGB[];

function getRange(pixels: Bucket, channel: "r" | "g" | "b"): number {
  let min = 255;
  let max = 0;
  for (const p of pixels) {
    if (p[channel] < min) min = p[channel];
    if (p[channel] > max) max = p[channel];
  }
  return max - min;
}

function medianCut(pixels: Bucket, depth: number): Bucket[] {
  if (depth === 0 || pixels.length === 0) return [pixels];

  const rRange = getRange(pixels, "r");
  const gRange = getRange(pixels, "g");
  const bRange = getRange(pixels, "b");

  let channel: "r" | "g" | "b" = "r";
  if (gRange >= rRange && gRange >= bRange) channel = "g";
  else if (bRange >= rRange && bRange >= gRange) channel = "b";

  pixels.sort((a, b) => a[channel] - b[channel]);
  const mid = Math.floor(pixels.length / 2);

  return [
    ...medianCut(pixels.slice(0, mid), depth - 1),
    ...medianCut(pixels.slice(mid), depth - 1),
  ];
}

function averageColor(pixels: Bucket): RGB {
  if (pixels.length === 0) return { r: 128, g: 128, b: 128 };
  let r = 0,
    g = 0,
    b = 0;
  for (const p of pixels) {
    r += p.r;
    g += p.g;
    b += p.b;
  }
  const n = pixels.length;
  return { r: Math.round(r / n), g: Math.round(g / n), b: Math.round(b / n) };
}

/**
 * Given an image file, extract 3 dominant colors.
 * Uses a downscaled canvas for performance.
 */
export function extractColorsFromImage(file: File): Promise<[string, string, string]> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      // Downscale to max 100px for speed
      const maxDim = 100;
      const scale = Math.min(maxDim / img.width, maxDim / img.height, 1);
      const w = Math.round(img.width * scale);
      const h = Math.round(img.height * scale);

      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        URL.revokeObjectURL(url);
        reject(new Error("Cannot get canvas context"));
        return;
      }

      ctx.drawImage(img, 0, 0, w, h);
      const imageData = ctx.getImageData(0, 0, w, h);
      const pixels: Bucket = [];

      for (let i = 0; i < imageData.data.length; i += 4) {
        const r = imageData.data[i];
        const g = imageData.data[i + 1];
        const b = imageData.data[i + 2];
        const a = imageData.data[i + 3];
        // Skip transparent and near-white/near-black pixels
        if (a < 128) continue;
        const hsl = rgbToHsl({ r, g, b });
        if (hsl.l < 0.05 || hsl.l > 0.95) continue;
        if (hsl.s < 0.05) continue; // skip grays
        pixels.push({ r, g, b });
      }

      if (pixels.length < 10) {
        // Not enough colorful pixels, fall back to all pixels
        for (let i = 0; i < imageData.data.length; i += 4) {
          if (imageData.data[i + 3] >= 128) {
            pixels.push({
              r: imageData.data[i],
              g: imageData.data[i + 1],
              b: imageData.data[i + 2],
            });
          }
        }
      }

      // Median cut into 8 buckets, then pick top 3 by saturation
      const buckets = medianCut(pixels, 3);
      const colors = buckets
        .map(averageColor)
        .map((rgb) => ({ hex: rgbToHex(rgb), hsl: rgbToHsl(rgb) }))
        .sort((a, b) => b.hsl.s - a.hsl.s) // most saturated first
        .slice(0, 3)
        .map((c) => c.hex);

      // Ensure we always have 3 colors
      while (colors.length < 3) {
        colors.push(colors[0] || "#7A682F");
      }

      URL.revokeObjectURL(url);
      resolve(colors as [string, string, string]);
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to load image"));
    };

    img.src = url;
  });
}
