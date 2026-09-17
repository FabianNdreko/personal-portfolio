"use client";

import { useEffect, useId, useRef, useState } from "react";
import { WELCOME_MESSAGE } from "../data/canned";
import { useTurnstile } from "../hooks/use-turnstile";
import { requestChatReply } from "../queries";
import type { ChatMessage } from "../types";
import { ChatLauncher } from "./chat-launcher";
import { ChatPanel } from "./chat-panel";

type ChatWidgetProps = {
  turnstileSiteKey?: string;
};

export function ChatWidget({ turnstileSiteKey = "" }: ChatWidgetProps) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const listRef = useRef<HTMLDivElement>(null);
  const idPrefix = useId();
  const {
    containerRef: turnstileRef,
    getToken,
    refresh: refreshTurnstile,
  } = useTurnstile(open, turnstileSiteKey);

  useEffect(() => {
    const node = listRef.current;
    if (!node || !open) return;
    // Keep the welcome message in view; only follow new replies.
    if (messages.length <= 1) {
      node.scrollTo({ top: 0 });
      return;
    }
    node.scrollTo({ top: node.scrollHeight, behavior: "smooth" });
  }, [messages, thinking, open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  async function send(text?: string) {
    const value = (text ?? input).trim();
    if (!value || thinking) return;

    const userMessage: ChatMessage = {
      id: `${idPrefix}-${Date.now()}`,
      role: "user",
      text: value,
    };

    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");
    setThinking(true);

    try {
      const turnstileToken = await getToken();
      const reply = await requestChatReply(nextMessages, turnstileToken);
      refreshTurnstile();
      setMessages((current) => [
        ...current,
        {
          id: `${idPrefix}-a-${Date.now()}`,
          role: "assistant",
          text: reply,
        },
      ]);
    } catch (error) {
      refreshTurnstile();
      setMessages((current) => [
        ...current,
        {
          id: `${idPrefix}-e-${Date.now()}`,
          role: "assistant",
          text:
            error instanceof Error
              ? error.message
              : "Could not answer just now. Try again.",
        },
      ]);
    } finally {
      setThinking(false);
    }
  }

  return (
    <>
      <ChatPanel
        open={open}
        messages={messages}
        thinking={thinking}
        input={input}
        onInput={setInput}
        onSend={send}
        onClose={() => setOpen(false)}
        listRef={listRef}
        turnstileRef={turnstileRef}
      />
      <ChatLauncher open={open} onToggle={() => setOpen((value) => !value)} />
    </>
  );
}
