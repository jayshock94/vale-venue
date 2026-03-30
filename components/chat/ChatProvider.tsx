"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

type ChatContextValue = {
  isChatOpen: boolean;
  openChat: () => void;
  closeChat: () => void;
  toggleChat: () => void;
  pendingMessage: string | null;
  openChatWithMessage: (msg: string) => void;
  consumePendingMessage: () => string | null;
};

const ChatContext = createContext<ChatContextValue | null>(null);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [pendingMessage, setPendingMessage] = useState<string | null>(null);

  const openChat = useCallback(() => setIsChatOpen(true), []);
  const closeChat = useCallback(() => setIsChatOpen(false), []);
  const toggleChat = useCallback(() => setIsChatOpen((prev) => !prev), []);

  const openChatWithMessage = useCallback((msg: string) => {
    setPendingMessage(msg);
    setIsChatOpen(true);
  }, []);

  const consumePendingMessage = useCallback(() => {
    const msg = pendingMessage;
    setPendingMessage(null);
    return msg;
  }, [pendingMessage]);

  return (
    <ChatContext.Provider
      value={{
        isChatOpen,
        openChat,
        closeChat,
        toggleChat,
        pendingMessage,
        openChatWithMessage,
        consumePendingMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChatUI() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChatUI must be used within ChatProvider");
  return ctx;
}
