"use client";

export function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="bg-vale-bg-alt rounded-2xl rounded-bl-md px-4 py-3 shadow-sm flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-vale-fg-muted animate-[chat-dot-bounce_1.4s_ease-in-out_infinite]" />
        <span className="w-2 h-2 rounded-full bg-vale-fg-muted animate-[chat-dot-bounce_1.4s_ease-in-out_0.15s_infinite]" />
        <span className="w-2 h-2 rounded-full bg-vale-fg-muted animate-[chat-dot-bounce_1.4s_ease-in-out_0.3s_infinite]" />
      </div>
    </div>
  );
}
