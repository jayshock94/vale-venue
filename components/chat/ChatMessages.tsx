"use client";

import { useRef, useEffect, useMemo } from "react";
import { ChatBubble } from "./ChatBubble";
import { TypingIndicator } from "./TypingIndicator";
import { PromptChips } from "./PromptChips";
import { INITIAL_CHIPS, getFollowupChips } from "@/lib/chat/prompt-chips";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const WELCOME_TEXT =
  "Hey! I'm Vale, Bobbi's AI assistant for The Vale venue. I know the space inside and out and can help with pricing, what's included, catering, capacity, and anything else about the venue. What are you planning?";

export function ChatMessages({
  messages,
  isLoading,
  onChipSelect,
}: {
  messages: ChatMessage[];
  isLoading: boolean;
  onChipSelect: (message: string) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages, isLoading]);

  // Get sent user messages to filter out already-asked chips
  const sentUserMessages = messages
    .filter((m) => m.role === "user")
    .map((m) => m.content);

  // Determine which chips to show
  const lastMessage = messages[messages.length - 1];
  const showInitialChips = messages.length === 0;
  const showFollowupChips =
    !isLoading && lastMessage?.role === "assistant" && lastMessage.content;

  const followupChips = useMemo(
    () => (showFollowupChips ? getFollowupChips(sentUserMessages) : []),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [showFollowupChips, messages.length]
  );

  return (
    <div ref={scrollRef} className="flex-1 overflow-y-auto overscroll-contain px-4 py-4 space-y-3">
      {/* Welcome message */}
      <ChatBubble role="assistant" content={WELCOME_TEXT} />

      {/* Initial prompt chips */}
      {showInitialChips && (
        <div className="pt-1 pb-1">
          <PromptChips chips={INITIAL_CHIPS} onSelect={onChipSelect} />
        </div>
      )}

      {/* Conversation messages */}
      {messages.map((msg) => (
        <ChatBubble
          key={msg.id}
          role={msg.role as "user" | "assistant"}
          content={msg.content}
        />
      ))}

      {/* Typing indicator */}
      {isLoading && <TypingIndicator />}

      {/* Follow-up chips after last assistant message */}
      {showFollowupChips && followupChips.length > 0 && (
        <div className="pt-1 pb-1">
          <PromptChips chips={followupChips} onSelect={onChipSelect} />
        </div>
      )}
    </div>
  );
}
