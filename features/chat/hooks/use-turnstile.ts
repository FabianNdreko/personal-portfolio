"use client";

import { useCallback, useEffect, useRef } from "react";
import { loadTurnstileScript, type TurnstileApi } from "../lib/turnstile";

type Pending = {
  resolve: (token: string) => void;
  reject: (error: Error) => void;
  timer: number;
};

/**
 * Managed Turnstile widget. Hidden unless Cloudflare needs a click
 * (`appearance: interaction-only`). Container can grow so a checkbox is usable.
 */
export function useTurnstile(active: boolean, siteKey: string) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const turnstileRef = useRef<TurnstileApi | null>(null);
  const tokenRef = useRef<string | null>(null);
  const pendingRef = useRef<Pending | null>(null);
  const configured = Boolean(siteKey);

  const clearPending = useCallback((error?: Error) => {
    const pending = pendingRef.current;
    if (!pending) return;
    window.clearTimeout(pending.timer);
    pendingRef.current = null;
    if (error) pending.reject(error);
  }, []);

  const settleToken = useCallback((token: string) => {
    tokenRef.current = token;
    const pending = pendingRef.current;
    if (!pending) return;
    window.clearTimeout(pending.timer);
    pendingRef.current = null;
    pending.resolve(token);
  }, []);

  useEffect(() => {
    if (!active || !configured) return;

    let cancelled = false;

    loadTurnstileScript()
      .then(async (turnstile) => {
        const started = Date.now();
        while (!containerRef.current && Date.now() - started < 2000) {
          await new Promise((resolve) =>
            requestAnimationFrame(() => resolve(undefined)),
          );
        }
        if (cancelled) return;

        const container = containerRef.current;
        if (!container) {
          throw new Error("Bot check container is missing.");
        }

        turnstileRef.current = turnstile;
        tokenRef.current = null;

        const widgetId = turnstile.render(container, {
          sitekey: siteKey,
          theme: "dark",
          size: "flexible",
          action: "chat",
          appearance: "interaction-only",
          callback: (token) => {
            if (!cancelled) settleToken(token);
          },
          "error-callback": () => {
            tokenRef.current = null;
            clearPending(new Error("Bot check failed. Refresh and try again."));
          },
          "expired-callback": () => {
            tokenRef.current = null;
            try {
              if (widgetIdRef.current) turnstile.reset(widgetIdRef.current);
            } catch {
              // ignore
            }
          },
          "timeout-callback": () => {
            tokenRef.current = null;
            clearPending(new Error("Bot check timed out. Try again."));
          },
        });

        widgetIdRef.current = widgetId;
      })
      .catch(() => {
        if (!cancelled) {
          clearPending(
            new Error("Bot check failed to load. Refresh and try again."),
          );
        }
      });

    return () => {
      cancelled = true;
      clearPending(new Error("Chat closed."));
      tokenRef.current = null;
      const widgetId = widgetIdRef.current;
      const turnstile = turnstileRef.current;
      widgetIdRef.current = null;
      if (widgetId && turnstile) {
        try {
          turnstile.remove(widgetId);
        } catch {
          // ignore
        }
      }
    };
  }, [active, clearPending, configured, settleToken, siteKey]);

  const refresh = useCallback(() => {
    tokenRef.current = null;
    const turnstile = turnstileRef.current;
    const widgetId = widgetIdRef.current;
    if (!turnstile || !widgetId) return;
    try {
      turnstile.reset(widgetId);
    } catch {
      // ignore
    }
  }, []);

  const getToken = useCallback(async (): Promise<string | undefined> => {
    if (!configured) return undefined;

    if (tokenRef.current) return tokenRef.current;

    const turnstile = turnstileRef.current;
    const widgetId = widgetIdRef.current;
    if (!turnstile || !widgetId) {
      throw new Error("Bot check is not ready yet. Wait a moment and try again.");
    }

    const fromWidget = turnstile.getResponse(widgetId);
    if (fromWidget) {
      tokenRef.current = fromWidget;
      return fromWidget;
    }

    return new Promise<string>((resolve, reject) => {
      const timer = window.setTimeout(() => {
        if (pendingRef.current?.timer === timer) {
          pendingRef.current = null;
          reject(
            new Error(
              "Complete the Cloudflare check under the input, then send again.",
            ),
          );
        }
      }, 45_000);

      pendingRef.current = { resolve, reject, timer };
    });
  }, [configured]);

  return { containerRef, getToken, refresh, configured };
}
