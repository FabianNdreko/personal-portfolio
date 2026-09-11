import OpenAI from "openai";
import type { ChatRequest } from "@/server/validators/chat";
import { buildProfileContext, CHAT_SYSTEM_PROMPT } from "./chat-context";

export class ChatConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ChatConfigError";
  }
}

function getClient() {
  const apiKey = process.env.OPENAI_API_KEY?.trim();
  if (!apiKey) {
    throw new ChatConfigError("OPENAI_API_KEY is not set");
  }
  return new OpenAI({ apiKey });
}

export async function answerFromProfile(input: ChatRequest): Promise<string> {
  const client = getClient();
  const model = process.env.OPENAI_MODEL?.trim() || "gpt-4o-mini";

  const completion = await client.chat.completions.create({
    model,
    temperature: 0.2,
    max_tokens: 400,
    messages: [
      {
        role: "system",
        content: `${CHAT_SYSTEM_PROMPT}\n\nProfile context:\n${buildProfileContext()}`,
      },
      ...input.messages.map((message) => ({
        role: message.role,
        content: message.text,
      })),
    ],
  });

  const text = completion.choices[0]?.message?.content?.trim();
  if (!text) {
    throw new Error("Empty model response");
  }

  return text;
}
