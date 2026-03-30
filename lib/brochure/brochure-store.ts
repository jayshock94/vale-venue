export type BrochureItem = {
  id: string;
  label: string;
  category: "included" | "addon" | "service";
  note?: string;
};

const STORAGE_KEY = "vale-brochure-items";

export function getItems(): BrochureItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveItems(items: BrochureItem[]) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function addItem(item: BrochureItem): BrochureItem[] {
  const items = getItems();
  if (items.some((i) => i.id === item.id)) return items;
  const updated = [...items, item];
  saveItems(updated);
  return updated;
}

export function removeItem(id: string): BrochureItem[] {
  const items = getItems().filter((i) => i.id !== id);
  saveItems(items);
  return items;
}

export function clearItems(): BrochureItem[] {
  saveItems([]);
  return [];
}
