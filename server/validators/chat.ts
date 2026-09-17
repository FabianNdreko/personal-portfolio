import { z } from "zod";

export const chatRequestSchema = z.object({
  message: z.string().trim().min(1).max(500),
  turnstileToken: z.string().trim().min(1).max(2048).optional(),
});

export type ChatRequest = z.infer<typeof chatRequestSchema>;
