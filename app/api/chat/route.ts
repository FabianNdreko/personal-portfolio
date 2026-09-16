import { rateLimitChat } from "@/server/lib/rate-limit";
import { cannedReply } from "@/features/chat/data/canned";
import { answerFromProfile, ChatConfigError } from "@/server/services/chat";
import {
  isTurnstileConfigured,
  TurnstileError,
  verifyTurnstileToken,
} from "@/server/services/turnstile";
import { chatRequestSchema } from "@/server/validators/chat";

function clientKey(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim();
  return ip || request.headers.get("x-real-ip") || "local";
}

function lastUserText(messages: { role: string; text: string }[]) {
  for (let i = messages.length - 1; i >= 0; i -= 1) {
    if (messages[i]?.role === "user") return messages[i].text;
  }
  return "";
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

  if (parsed.data.messages.at(-1)?.role !== "user") {
    return Response.json({ error: "Ask a question to continue." }, { status: 400 });
  }

  const openAiConfigured = Boolean(process.env.OPENAI_API_KEY?.trim());
  if (
    process.env.NODE_ENV === "production" &&
    openAiConfigured &&
    !isTurnstileConfigured()
  ) {
    return Response.json(
      { error: "Chat is temporarily unavailable." },
      { status: 503 },
    );
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

  const question = lastUserText(parsed.data.messages);

  try {
    const reply = await answerFromProfile(parsed.data);
    return Response.json({ reply });
  } catch (error) {
    if (error instanceof ChatConfigError) {
      return Response.json({ reply: cannedReply(question) });
    }

    console.error("chat", error);
    return Response.json({ reply: cannedReply(question) });
  }
}
