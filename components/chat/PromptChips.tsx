"use client";

export function PromptChips({
  chips,
  onSelect,
}: {
  chips: ReadonlyArray<{ label: string; message: string }>;
  onSelect: (message: string) => void;
}) {
  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {chips.map((chip) => (
        <button
          key={chip.label}
          onClick={() => onSelect(chip.message)}
          className="px-3.5 py-1.5 text-[13px] rounded-full border border-vale-border text-vale-fg-muted hover:bg-vale-bg-alt hover:text-vale-fg hover:border-vale-border-strong transition-colors"
        >
          {chip.label}
        </button>
      ))}
    </div>
  );
}
