export class TurnstileError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "TurnstileError";
  }
}

type SiteverifyResponse = {
  success?: boolean;
  "error-codes"?: string[];
};

export function isTurnstileConfigured() {
  return Boolean(process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY?.trim());
}

export async function verifyTurnstileToken(
  token: string,
  remoteip?: string,
): Promise<void> {
  const secret = process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY?.trim();
  if (!secret) {
    throw new TurnstileError("CLOUDFLARE_TURNSTILE_SECRET_KEY is not set");
  }

  const body = new URLSearchParams({
    secret,
    response: token,
  });
  if (remoteip) {
    body.set("remoteip", remoteip);
  }

  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    },
  );

  if (!response.ok) {
    throw new TurnstileError("Could not verify bot check.");
  }

  const result = (await response.json()) as SiteverifyResponse;
  if (!result.success) {
    throw new TurnstileError("Bot check failed. Refresh and try again.");
  }
}
