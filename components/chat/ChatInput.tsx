"use client";

import { useRef, useEffect, type FormEvent } from "react";

export function ChatInput({
  input,
  setInput,
  onSubmit,
  isLoading,
}: {
  input: string;
  setInput: (value: string) => void;
  onSubmit: (e: FormEvent) => void;
  isLoading: boolean;
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 120) + "px";
  }, [input]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (input.trim() && !isLoading) {
        onSubmit(e as unknown as FormEvent);
      }
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex items-end gap-2">
      <textarea
        ref={textareaRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask about The Vale..."
        rows={1}
        className="flex-1 resize-none px-4 py-3 rounded-xl border border-vale-border bg-vale-bg text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-vale-accent/30 focus:border-vale-accent"
        disabled={isLoading}
      />
      <button
        type="submit"
        disabled={!input.trim() || isLoading}
        className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
          input.trim() && !isLoading
            ? "bg-vale-accent text-vale-accent-fg hover:bg-vale-accent-hover"
            : "bg-vale-border text-vale-fg-muted cursor-not-allowed"
        }`}
        aria-label="Send message"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="12" y1="19" x2="12" y2="5" />
          <polyline points="5 12 12 5 19 12" />
        </svg>
      </button>
    </form>
  );
}
