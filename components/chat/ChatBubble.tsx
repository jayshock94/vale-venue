"use client";

import Link from "next/link";
import { type ReactNode } from "react";

// Parse markdown inline formatting: **bold** and [links](/path)
function renderInline(text: string): ReactNode[] {
  const parts: ReactNode[] = [];
  // Match **bold** or [link text](/path)
  const inlineRegex = /\*\*([^*]+)\*\*|\[([^\]]+)\]\(\/([^)]+)\)/g;
  let lastIndex = 0;
  let match;

  while ((match = inlineRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    if (match[1]) {
      // Bold
      parts.push(<strong key={match.index} className="font-semibold">{match[1]}</strong>);
    } else if (match[2]) {
      // Link
      parts.push(
        <Link
          key={match.index}
          href={`/${match[3]}`}
          className="inline-flex items-center gap-1 font-medium underline underline-offset-2 decoration-current/40 hover:decoration-current transition-colors"
        >
          {match[2]}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </Link>
      );
    }

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : [text];
}

// Split text into paragraphs on double newlines, render links within each
function renderParagraphs(text: string): ReactNode {
  const paragraphs = text.split(/\n\n+/);

  if (paragraphs.length <= 1) {
    return renderInline(text);
  }

  return paragraphs.map((para, i) => (
    <p key={i} className={i > 0 ? "mt-2.5" : undefined}>
      {renderInline(para)}
    </p>
  ));
}

export function ChatBubble({
  role,
  content,
}: {
  role: "user" | "assistant";
  content?: string;
}) {
  const isUser = role === "user";
  // Strip any brochure markers that may appear during streaming
  const text = (content ?? "")
    .replace(/\[BROCHURE_ADD:[^\]]+\]/g, "")
    .replace(/\[BROCHURE_REMOVE:[^\]]+\]/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  if (!text) return null;

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] px-4 py-3 text-sm leading-relaxed shadow-sm ${
          isUser
            ? "bg-vale-accent text-vale-accent-fg rounded-2xl rounded-br-md"
            : "bg-vale-bg-alt text-vale-fg rounded-2xl rounded-bl-md"
        }`}
      >
        {isUser ? text : renderParagraphs(text)}
      </div>
    </div>
  );
}
