import { rateLimitChat } from "@/server/lib/rate-limit";
import { answerFromProfile, ChatConfigError } from "@/server/services/chat";
import {
  isTurnstileConfigured,
  TurnstileError,
  verifyTurnstileToken,
} from "@/server/services/turnstile";
import { chatRequestSchema } from "@/server/validators/chat";

const UNAVAILABLE = "Chat is temporarily unavailable. Try again later.";

function clientKey(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim();
  return ip || request.headers.get("x-real-ip") || "local";
}

export async function POST(request: Request) {
  const ip = clientKey(request);
  const limited = await rateLimitChat(ip);
  if (!limited.ok) {
    return Response.json(
      { error: "Too many questions. Try again in a few minutes." },
      {
        status: 429,
        headers: { "Retry-After": String(limited.retryAfterSec) },
      },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const parsed = chatRequestSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: "Send a short question about Fabian (max 500 characters)." },
      { status: 400 },
    );
  }

  const question = parsed.data.message;

  const openAiConfigured = Boolean(process.env.OPENAI_API_KEY?.trim());
  if (!openAiConfigured) {
    return Response.json({ error: UNAVAILABLE }, { status: 503 });
  }

  if (process.env.NODE_ENV === "production" && !isTurnstileConfigured()) {
    return Response.json({ error: UNAVAILABLE }, { status: 503 });
  }

  if (isTurnstileConfigured()) {
    const token = parsed.data.turnstileToken;
    if (!token) {
      return Response.json(
        { error: "Bot check required. Refresh and try again." },
        { status: 403 },
      );
    }

    try {
      await verifyTurnstileToken(token, ip === "local" ? undefined : ip);
    } catch (error) {
      if (error instanceof TurnstileError) {
        return Response.json({ error: error.message }, { status: 403 });
      }
      return Response.json(
        { error: "Bot check failed. Refresh and try again." },
        { status: 403 },
      );
    }
  }

  try {
    const reply = await answerFromProfile(question);
    return Response.json({ reply });
  } catch (error) {
    if (error instanceof ChatConfigError) {
      return Response.json({ error: UNAVAILABLE }, { status: 503 });
    }

    console.error("chat", error);
    return Response.json(
      { error: "Could not answer just now. Try again." },
      { status: 502 },
    );
  }
}
