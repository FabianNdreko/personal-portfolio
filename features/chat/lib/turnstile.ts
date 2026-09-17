const SCRIPT_ID = "cf-turnstile-script";
const SCRIPT_SRC =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

type TurnstileRenderOptions = {
  sitekey: string;
  size?: "normal" | "compact" | "flexible" | "invisible";
  execution?: "render" | "execute";
  appearance?: "always" | "execute" | "interaction-only";
  callback?: (token: string) => void;
  "error-callback"?: (errorCode?: string) => void;
  "expired-callback"?: () => void;
  "timeout-callback"?: () => void;
};

export type TurnstileApi = {
  render: (
    container: string | HTMLElement,
    options: TurnstileRenderOptions,
  ) => string;
  reset: (widgetId?: string) => void;
  remove: (widgetId?: string) => void;
  execute: (widgetId?: string) => void;
  getResponse: (widgetId?: string) => string | undefined;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

export function loadTurnstileScript(): Promise<TurnstileApi> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Turnstile is browser-only."));
  }

  if (window.turnstile) {
    return Promise.resolve(window.turnstile);
  }

  const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;

  if (existing) {
    return new Promise((resolve, reject) => {
      const onLoad = () => {
        if (window.turnstile) resolve(window.turnstile);
        else reject(new Error("Turnstile failed to load."));
      };
      if (window.turnstile) {
        onLoad();
        return;
      }
      existing.addEventListener("load", onLoad, { once: true });
      existing.addEventListener(
        "error",
        () => reject(new Error("Turnstile failed to load.")),
        { once: true },
      );
    });
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = SCRIPT_SRC;
    script.async = true;
    script.onload = () => {
      if (window.turnstile) resolve(window.turnstile);
      else reject(new Error("Turnstile failed to load."));
    };
    script.onerror = () => reject(new Error("Turnstile failed to load."));
    document.head.appendChild(script);
  });
}
