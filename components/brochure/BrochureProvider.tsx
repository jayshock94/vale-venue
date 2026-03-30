"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import {
  type BrochureItem,
  getItems,
  addItem as storeAdd,
  removeItem as storeRemove,
  clearItems as storeClear,
} from "@/lib/brochure/brochure-store";

type BrochureContextValue = {
  items: BrochureItem[];
  itemCount: number;
  addItem: (item: BrochureItem) => void;
  removeItem: (id: string) => void;
  clearItems: () => void;
  lastAction: { type: "add" | "remove"; label: string } | null;
  clearLastAction: () => void;
};

const BrochureContext = createContext<BrochureContextValue | null>(null);

export function BrochureProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<BrochureItem[]>([]);
  const [lastAction, setLastAction] = useState<BrochureContextValue["lastAction"]>(null);

  // Load from sessionStorage on mount
  useEffect(() => {
    setItems(getItems());
  }, []);

  const addItem = useCallback((item: BrochureItem) => {
    const updated = storeAdd(item);
    setItems(updated);
    setLastAction({ type: "add", label: item.label });
  }, []);

  const removeItem = useCallback((id: string) => {
    const current = getItems();
    const removing = current.find((i) => i.id === id);
    const updated = storeRemove(id);
    setItems(updated);
    if (removing) {
      setLastAction({ type: "remove", label: removing.label });
    }
  }, []);

  const clearItems = useCallback(() => {
    setItems(storeClear());
  }, []);

  const clearLastAction = useCallback(() => {
    setLastAction(null);
  }, []);

  return (
    <BrochureContext.Provider
      value={{
        items,
        itemCount: items.length,
        addItem,
        removeItem,
        clearItems,
        lastAction,
        clearLastAction,
      }}
    >
      {children}
    </BrochureContext.Provider>
  );
}

export function useBrochure() {
  const ctx = useContext(BrochureContext);
  if (!ctx) throw new Error("useBrochure must be used within BrochureProvider");
  return ctx;
}
