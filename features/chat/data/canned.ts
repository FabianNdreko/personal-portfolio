import { SITE } from "@/lib/site";
import type { ChatMessage } from "../types";

export const CHAT_SUGGESTIONS = [
  "Is Barber SaaS live?",
  "Can he ship a Nest API?",
  "Is he open to hire?",
  "How do I reach him?",
] as const;

export const WELCOME_MESSAGE: ChatMessage = {
  id: "welcome",
  role: "assistant",
  text: `Hi — ask anything quick about ${SITE.name}'s work, stack, or how to hire him. I’ll keep it short.`,
};
