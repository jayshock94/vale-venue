"use client";

import Link from "next/link";
import { type ReactNode } from "react";

// Parse markdown-style links [text](/path) into clickable Link components
function renderWithLinks(text: string): ReactNode[] {
  const parts: ReactNode[] = [];
  const linkRegex = /\[([^\]]+)\]\(\/([^)]+)\)/g;
  let lastIndex = 0;
  let match;

  while ((match = linkRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    const linkText = match[1];
    const href = `/${match[2]}`;

    parts.push(
      <Link
        key={match.index}
        href={href}
        className="inline-flex items-center gap-1 font-medium underline underline-offset-2 decoration-current/40 hover:decoration-current transition-colors"
      >
        {linkText}
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="shrink-0"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </Link>
    );

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
    return renderWithLinks(text);
  }

  return paragraphs.map((para, i) => (
    <p key={i} className={i > 0 ? "mt-2.5" : undefined}>
      {renderWithLinks(para)}
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
  const text = content ?? "";

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
