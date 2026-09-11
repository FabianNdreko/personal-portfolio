"use client";

import type { RefObject } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { PaperPlaneTilt, Sparkle } from "@phosphor-icons/react";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";
import { CHAT_SUGGESTIONS } from "../data/canned";
import type { ChatMessage } from "../types";

type ChatPanelProps = {
  open: boolean;
  messages: ChatMessage[];
  thinking: boolean;
  input: string;
  onInput: (value: string) => void;
  onSend: (text?: string) => void;
  onClose: () => void;
  listRef: RefObject<HTMLDivElement | null>;
};

export function ChatPanel({
  open,
  messages,
  thinking,
  input,
  onInput,
  onSend,
  onClose,
  listRef,
}: ChatPanelProps) {
  const showSuggestions =
    messages.length <= 1 && !thinking && input.trim().length === 0;

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          role="dialog"
          aria-label="Ask about Fabian"
          aria-modal="true"
          initial={{ opacity: 0, y: 28, scale: 0.94, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: 18, scale: 0.96, filter: "blur(6px)" }}
          transition={{ type: "spring", damping: 24, stiffness: 280 }}
          className="chat-scroll fixed right-3 bottom-32 z-50 w-[min(100%-1.5rem,24rem)] sm:right-5 md:bottom-34"
        >
          <div className="overflow-hidden rounded-2xl bg-linear-to-br from-accent/50 via-border to-accent/15 p-px shadow-[0_24px_80px_rgba(0,0,0,0.55),0_0_40px_rgba(31,224,184,0.12)]">
            <div className="chat-scroll flex h-[min(32rem,70vh)] flex-col overflow-hidden rounded-[15px] bg-background/90 backdrop-blur-xl">
              <header className="relative border-b border-border px-4 py-3.5">
                <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-accent to-transparent" />
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Image
                      src={SITE.portrait}
                      alt=""
                      width={40}
                      height={40}
                      className="size-10 rounded-full border border-accent/30 object-cover object-top"
                    />
                    <span className="absolute right-0 bottom-0 size-2.5 rounded-full border-2 border-background bg-accent" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="flex items-center gap-1.5 font-display text-sm font-semibold">
                      Ask Fabian
                      <Sparkle size={12} className="text-accent" weight="fill" />
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      Answers from his profile · demo
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={onClose}
                    className="text-xs text-fg-dim hover:text-foreground sm:hidden"
                  >
                    Close
                  </button>
                </div>
              </header>

              <div
                ref={listRef}
                className="chat-scroll flex-1 space-y-3 overflow-y-auto px-4 py-4"
              >
                {messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index === 0 ? 0.08 : 0 }}
                    className={cn(
                      "flex",
                      message.role === "user" ? "justify-end" : "justify-start",
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[13.5px] leading-relaxed whitespace-pre-wrap",
                        message.role === "user"
                          ? "rounded-br-md bg-accent text-primary-foreground"
                          : "rounded-bl-md border border-border bg-elevated text-foreground",
                      )}
                    >
                      {message.text}
                    </div>
                  </motion.div>
                ))}

                {thinking ? (
                  <div className="flex justify-start">
                    <div className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-border bg-elevated px-3.5 py-3">
                      <span className="size-1.5 rounded-full bg-accent animate-[chat-dot_1s_ease-in-out_infinite]" />
                      <span className="size-1.5 rounded-full bg-accent animate-[chat-dot_1s_ease-in-out_0.15s_infinite]" />
                      <span className="size-1.5 rounded-full bg-accent animate-[chat-dot_1s_ease-in-out_0.3s_infinite]" />
                    </div>
                  </div>
                ) : null}

                {showSuggestions ? (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {CHAT_SUGGESTIONS.map((suggestion) => (
                      <button
                        key={suggestion}
                        type="button"
                        onClick={() => onSend(suggestion)}
                        className="rounded-full border border-border bg-elevated px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-accent/50 hover:text-accent"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>

              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  onSend();
                }}
                className="border-t border-border p-3"
              >
                <div className="flex items-end gap-2 rounded-xl border border-border bg-elevated-2/80 px-3 py-2 focus-within:border-accent/50">
                  <textarea
                    value={input}
                    onChange={(event) => onInput(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" && !event.shiftKey) {
                        event.preventDefault();
                        onSend();
                      }
                    }}
                    rows={1}
                    placeholder="Ask about Fabian…"
                    className="chat-scroll max-h-24 min-h-6 flex-1 resize-none bg-transparent py-1.5 text-sm outline-none placeholder:text-fg-dim"
                  />
                  <button
                    type="submit"
                    disabled={thinking || input.trim().length === 0}
                    aria-label="Send"
                    className="mb-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-accent text-primary-foreground transition-opacity disabled:opacity-35"
                  >
                    <PaperPlaneTilt size={15} weight="fill" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
