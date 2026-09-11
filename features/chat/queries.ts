import type { ChatMessage } from "./types";

type ChatApiResponse = {
  reply?: string;
  error?: string;
};

export async function requestChatReply(
  messages: ChatMessage[],
): Promise<string> {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      messages: messages
        .filter((message) => message.id !== "welcome")
        .map(({ role, text }) => ({ role, text })),
    }),
  });

  const data = (await response.json()) as ChatApiResponse;

  if (!response.ok || !data.reply) {
    throw new Error(data.error || "Could not answer just now. Try again.");
  }

  return data.reply;
}
