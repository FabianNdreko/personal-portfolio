"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Robot, X } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

type ChatLauncherProps = {
  open: boolean;
  onToggle: () => void;
};

export function ChatLauncher({ open, onToggle }: ChatLauncherProps) {
  const [autoTip, setAutoTip] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (open) {
      setAutoTip(false);
      setHovered(false);
      return;
    }

    const show = window.setTimeout(() => setAutoTip(true), 8000);
    const hide = window.setTimeout(() => setAutoTip(false), 14000);
    return () => {
      window.clearTimeout(show);
      window.clearTimeout(hide);
    };
  }, [open]);

  const showTip = !open && (autoTip || hovered);

  return (
    <div className="pointer-events-none fixed right-4 bottom-[max(1.5rem,env(safe-area-inset-bottom))] z-50 sm:right-5 sm:bottom-[max(2rem,env(safe-area-inset-bottom))]">
      <AnimatePresence>
        {showTip ? (
          <motion.p
            key="hint"
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 8 }}
            transition={{ duration: 0.35 }}
            className="pointer-events-none absolute right-16 bottom-2 hidden max-w-48 rounded-2xl border border-border bg-elevated/90 px-3 py-1.5 text-xs leading-snug text-muted-foreground shadow-lg backdrop-blur-md sm:block"
          >
            Have a question? Ask the chat!
          </motion.p>
        ) : null}
      </AnimatePresence>

      <motion.button
        type="button"
        aria-label={open ? "Close AI chat" : "Chat with AI assistant"}
        aria-expanded={open}
        onClick={onToggle}
        onMouseEnter={() => {
          if (!open) setHovered(true);
        }}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => {
          if (!open) setHovered(true);
        }}
        onBlur={() => setHovered(false)}
        className={cn(
          "pointer-events-auto relative flex size-14 items-center justify-center rounded-full",
          "border border-accent/40 bg-accent text-primary-foreground",
          "shadow-[0_0_0_1px_rgba(232,184,74,0.15),0_10px_32px_rgba(232,184,74,0.22)]",
          "transition-transform hover:scale-105",
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
