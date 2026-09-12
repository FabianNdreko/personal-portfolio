"use client";

import { AnimatePresence, motion } from "motion/react";
import { Robot, X } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

type ChatLauncherProps = {
  open: boolean;
  onToggle: () => void;
};

export function ChatLauncher({ open, onToggle }: ChatLauncherProps) {
  return (
    <div className="pointer-events-none fixed right-4 bottom-16 z-50 sm:right-5 md:bottom-19">
      <AnimatePresence>
        {!open ? (
          <motion.p
            key="hint"
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 8 }}
            transition={{ delay: 0.9, duration: 0.35 }}
            className="pointer-events-none absolute right-16 bottom-3 hidden whitespace-nowrap rounded-full border border-border bg-elevated/90 px-3 py-1.5 text-xs text-muted-foreground shadow-lg backdrop-blur-md sm:block"
          >
            Ask the AI
          </motion.p>
        ) : null}
      </AnimatePresence>

      <motion.button
        type="button"
        aria-label={open ? "Close AI chat" : "Chat with AI assistant"}
        aria-expanded={open}
        onClick={onToggle}
        className={cn(
          "pointer-events-auto relative flex size-14 items-center justify-center rounded-full",
          "border border-accent/40 bg-accent text-primary-foreground",
          "shadow-[0_0_0_1px_rgba(31,224,184,0.15),0_12px_40px_rgba(31,224,184,0.28)]",
          "transition-transform hover:scale-105",
          !open && "animate-[chat-glow_2.8s_ease-in-out_infinite]",
        )}
        whileTap={{ scale: 0.94 }}
      >
        <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_55%)]" />
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? "close" : "open"}
            initial={{ rotate: -40, opacity: 0, scale: 0.6 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 40, opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.18 }}
            className="relative"
          >
            {open ? (
              <X size={22} weight="bold" />
            ) : (
              <Robot size={26} weight="fill" />
            )}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
