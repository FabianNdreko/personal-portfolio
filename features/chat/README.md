# Chat feature

Global assistant popup (not a `/chat` route). Mounted once in `SiteShell`.

- UI: `features/chat/components/`
- Client fetch: `features/chat/queries.ts` → `POST /api/chat`
- Backend: `server/validators/chat.ts`, `server/services/chat.ts`, `server/services/chat-context.ts`
- Key: `OPENAI_API_KEY` in `.env` (server only)
