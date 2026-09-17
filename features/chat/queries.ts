import type { ChatMessage } from "./types";

type ChatApiResponse = {
  reply?: string;
  error?: string;
};

export async function requestChatReply(
  messages: ChatMessage[],
  turnstileToken?: string,
): Promise<string> {
  const lastUser = [...messages]
    .reverse()
    .find((message) => message.role === "user" && message.id !== "welcome");

  if (!lastUser?.text.trim()) {
    throw new Error("Ask a question to continue.");
  }

  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message: lastUser.text.trim().slice(0, 500),
      ...(turnstileToken ? { turnstileToken } : {}),
    }),
  });

  const data = (await response.json()) as ChatApiResponse;

  if (!response.ok || !data.reply) {
    throw new Error(data.error || "Could not answer just now. Try again.");
  }

  return data.reply;
}
