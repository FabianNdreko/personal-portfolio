import { rateLimit } from "@/server/lib/rate-limit";
import { cannedReply } from "@/features/chat/data/canned";
import { answerFromProfile, ChatConfigError } from "@/server/services/chat";
import { chatRequestSchema } from "@/server/validators/chat";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 10;

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
  const limited = rateLimit(`chat:${clientKey(request)}`, MAX_REQUESTS, WINDOW_MS);
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
