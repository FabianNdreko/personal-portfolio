"use client";

import { useCallback, useEffect, useRef } from "react";
import { loadTurnstileScript, type TurnstileApi } from "../lib/turnstile";

type Pending = {
  resolve: (token: string) => void;
  reject: (error: Error) => void;
  timer: number;
};

/**
 * Invisible Turnstile widget. Renders into a hidden container while the chat is open.
 * Call `getToken()` before each API request.
 * `siteKey` is injected from the server (no NEXT_PUBLIC_ env).
 */
export function useTurnstile(active: boolean, siteKey: string) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const turnstileRef = useRef<TurnstileApi | null>(null);
  const pendingRef = useRef<Pending | null>(null);
  const configured = Boolean(siteKey);

  const clearPending = useCallback((error?: Error) => {
    const pending = pendingRef.current;
    if (!pending) return;
    window.clearTimeout(pending.timer);
    pendingRef.current = null;
    if (error) pending.reject(error);
  }, []);

  useEffect(() => {
    if (!active || !configured || !containerRef.current) return;

    let cancelled = false;
    const container = containerRef.current;

    loadTurnstileScript()
      .then((turnstile) => {
        if (cancelled || !container) return;
        turnstileRef.current = turnstile;

        const widgetId = turnstile.render(container, {
          sitekey: siteKey,
          size: "invisible",
          execution: "execute",
          appearance: "execute",
          callback: (token) => {
            const pending = pendingRef.current;
            if (!pending) return;
            window.clearTimeout(pending.timer);
            pendingRef.current = null;
            pending.resolve(token);
          },
          "error-callback": () => {
            clearPending(new Error("Bot check failed. Refresh and try again."));
          },
          "expired-callback": () => {
            clearPending(new Error("Bot check expired. Try again."));
          },
          "timeout-callback": () => {
            clearPending(new Error("Bot check timed out. Try again."));
          },
        });

        widgetIdRef.current = widgetId;
      })
      .catch(() => {
        if (!cancelled) {
          clearPending(new Error("Bot check failed to load. Refresh and try again."));
        }
      });

    return () => {
      cancelled = true;
      clearPending(new Error("Chat closed."));
      const widgetId = widgetIdRef.current;
      const turnstile = turnstileRef.current;
      widgetIdRef.current = null;
      if (widgetId && turnstile) {
        try {
          turnstile.remove(widgetId);
        } catch {
          // ignore cleanup errors
        }
      }
    };
  }, [active, clearPending, configured, siteKey]);

  const getToken = useCallback(async (): Promise<string | undefined> => {
    if (!configured) return undefined;

    const turnstile = turnstileRef.current;
    const widgetId = widgetIdRef.current;
    if (!turnstile || !widgetId) {
      throw new Error("Bot check is not ready yet. Wait a moment and try again.");
    }

    clearPending(new Error("Bot check superseded."));

    return new Promise<string>((resolve, reject) => {
      const timer = window.setTimeout(() => {
        if (pendingRef.current?.timer === timer) {
          pendingRef.current = null;
          reject(new Error("Bot check timed out. Try again."));
        }
      }, 30_000);

      pendingRef.current = { resolve, reject, timer };

      try {
        turnstile.reset(widgetId);
        turnstile.execute(widgetId);
      } catch {
        window.clearTimeout(timer);
        pendingRef.current = null;
        reject(new Error("Bot check failed. Refresh and try again."));
      }
    });
  }, [clearPending, configured]);

  return { containerRef, getToken, configured };
}
