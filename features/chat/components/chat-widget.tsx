"use client";

import { useEffect, useId, useRef, useState } from "react";
import { cannedReply, WELCOME_MESSAGE } from "../data/canned";
import type { ChatMessage } from "../types";
import { ChatLauncher } from "./chat-launcher";
import { ChatPanel } from "./chat-panel";

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const listRef = useRef<HTMLDivElement>(null);
  const idPrefix = useId();
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const node = listRef.current;
    if (!node) return;
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

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  function send(text?: string) {
    const value = (text ?? input).trim();
    if (!value || thinking) return;

    const userMessage: ChatMessage = {
      id: `${idPrefix}-${Date.now()}`,
      role: "user",
      text: value,
    };

    setMessages((current) => [...current, userMessage]);
    setInput("");
    setThinking(true);

    timerRef.current = window.setTimeout(() => {
      setMessages((current) => [
        ...current,
        {
          id: `${idPrefix}-a-${Date.now()}`,
          role: "assistant",
          text: cannedReply(value),
        },
      ]);
      setThinking(false);
    }, 700);
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
      />
      <ChatLauncher open={open} onToggle={() => setOpen((value) => !value)} />
    </>
  );
}
