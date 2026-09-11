import { z } from "zod";

export const chatMessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  text: z.string().trim().min(1).max(500),
});

export const chatRequestSchema = z.object({
  messages: z.array(chatMessageSchema).min(1).max(12),
});

export type ChatRequest = z.infer<typeof chatRequestSchema>;
