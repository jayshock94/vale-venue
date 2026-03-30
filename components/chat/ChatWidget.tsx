"use client";

import { useState, useEffect, useRef } from "react";
import { useChatUI } from "./ChatProvider";
import { ChatMessages } from "./ChatMessages";
import { ChatInput } from "./ChatInput";
import DecorDots from "@/components/ui/DecorDots";
interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt?: Date;
}

export default function ChatWidget() {
  const { isChatOpen, toggleChat, closeChat } = useChatUI();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesRef = useRef<Message[]>([]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    setError(null);
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      createdAt: new Date(),
    };

    messagesRef.current = [...messagesRef.current, userMessage];
    setMessages([...messagesRef.current]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: messagesRef.current
            .filter((m) => m.content)
            .map((m) => ({
              role: m.role,
              content: m.content,
            })),
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No response body");

      const decoder = new TextDecoder();
      let assistantText = "";
      const assistantId = (Date.now() + 1).toString();

      // Add empty assistant message so it shows the typing indicator position
      messagesRef.current = [
        ...messagesRef.current,
        { id: assistantId, role: "assistant", content: "", createdAt: new Date() },
      ];

      let buffer = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            if (data === "[DONE]") continue;
            try {
              const parsed = JSON.parse(data);
              if (parsed.type === "text-delta" && parsed.delta) {
                assistantText += parsed.delta;
                // Update the assistant message in place for streaming effect
                messagesRef.current = messagesRef.current.map((m) =>
                  m.id === assistantId ? { ...m, content: assistantText } : m
                );
                setMessages([...messagesRef.current]);
              }
            } catch {}
          }
        }
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error("Chat error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Lock body scroll on mobile when open
  useEffect(() => {
    if (isChatOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isChatOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage(input);
    setInput("");
  };

  const handleChipSelect = (message: string) => {
    sendMessage(message);
  };

  return (
    <>
      {/* Bot trigger */}
      <button
        onClick={toggleChat}
        className={`fixed bottom-6 right-6 z-40 group transition-all duration-300 ${
          isChatOpen ? "scale-0 opacity-0 pointer-events-none" : "scale-100 opacity-100"
        }`}
        aria-label="Chat with Bobbi's Assistant"
        title="Chat with Bobbi's Assistant"
      >
        <div className="relative flex items-center gap-2.5 pl-4 pr-2 py-2 rounded-full bg-vale-surface border border-vale-border shadow-lg hover:shadow-xl hover:border-vale-accent/40 transition-all">
          <span className="text-sm font-medium text-vale-fg whitespace-nowrap">
            Ask Vale
          </span>
          <div className="w-10 h-10 rounded-full bg-vale-accent text-vale-accent-fg flex items-center justify-center shrink-0">
            <SparkleIcon />
          </div>
          {/* Pulse dot */}
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-vale-accent opacity-50" />
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-vale-accent border-2 border-vale-surface" />
          </span>
        </div>
      </button>

      {/* Backdrop (mobile only) */}
      <div
        className={`fixed inset-0 z-50 bg-black/40 transition-opacity duration-300 md:hidden ${
          isChatOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeChat}
      />

      {/* Chat panel */}
      <div
        className={`fixed z-50 bg-vale-surface shadow-2xl transition-all duration-300 ease-out overflow-hidden flex flex-col
          inset-4 top-16 rounded-3xl
          md:inset-auto md:bottom-6 md:right-6 md:w-[400px] md:h-[min(600px,70vh)] md:rounded-2xl
          ${isChatOpen
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
          }`}
      >
        {/* Header */}
        <div className="relative px-5 pt-5 pb-3 shrink-0">
          <DecorDots className="top-1 right-1 opacity-30" count={6} spread={50} />
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-vale-accent text-vale-accent-fg flex items-center justify-center shrink-0">
                <SparkleIcon />
              </div>
              <div>
                <h2 className="text-lg font-semibold font-[family-name:var(--font-heading)] leading-tight">
                  Vale
                </h2>
                <p className="text-xs text-vale-fg-muted mt-0.5">
                  Bobbi&rsquo;s AI assistant
                </p>
              </div>
            </div>
            <button
              onClick={closeChat}
              className="mt-0.5 w-8 h-8 flex items-center justify-center rounded-full hover:bg-vale-bg-alt transition-colors shrink-0"
              aria-label="Close chat"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-vale-border mx-5 shrink-0" />

        {/* Messages */}
        <ChatMessages
          messages={messages}
          isLoading={isLoading}
          onChipSelect={handleChipSelect}
        />

        {/* Error */}
        {error && (
          <div className="px-5 py-2 text-xs text-red-600 shrink-0">
            Something went wrong. Please try again.
          </div>
        )}

        {/* Input */}
        <div className="px-4 pb-4 pt-2 shrink-0">
          <ChatInput
            input={input}
            setInput={setInput}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </div>
      </div>
    </>
  );
}

function SparkleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L13.09 8.26L18 6L14.74 10.91L21 12L14.74 13.09L18 18L13.09 15.74L12 22L10.91 15.74L6 18L9.26 13.09L3 12L9.26 10.91L6 6L10.91 8.26L12 2Z" />
    </svg>
  );
}
