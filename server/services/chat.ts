import OpenAI from "openai";
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

/** Answers from fixed profile context + a single user question (no client history). */
export async function answerFromProfile(question: string): Promise<string> {
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
      {
        role: "user",
        content: question,
      },
    ],
  });

  const text = completion.choices[0]?.message?.content?.trim();
  if (!text) {
    throw new Error("Empty model response");
  }

  return text;
}
