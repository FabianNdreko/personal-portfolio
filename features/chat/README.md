# Chat feature

Global assistant popup (not a `/chat` route). Mounted once in `SiteShell`.

- UI: `features/chat/components/`
- Client fetch: `features/chat/queries.ts` → `POST /api/chat`
- Backend: `server/validators/chat.ts`, `server/services/chat.ts`, `server/services/chat-context.ts`
- Bot protection: Cloudflare Turnstile (`server/services/turnstile.ts`, `features/chat/hooks/use-turnstile.ts`)

## Environment

```bash
OPENAI_API_KEY=
OPENAI_MODEL=
CLOUDFLARE_TURNSTILE_SITE_KEY=
CLOUDFLARE_TURNSTILE_SECRET_KEY=
```

Site key is read on the server and passed into the chat widget (no `NEXT_PUBLIC_` prefix). The secret key stays server-only.

In production, if `OPENAI_API_KEY` is set, Turnstile secret is required or chat returns 503.
Locally, Turnstile is optional until both keys are set (then every send is verified).

## Cloudflare Turnstile setup

1. Create a free account at [dash.cloudflare.com](https://dash.cloudflare.com).
2. Open **Turnstile** → **Add widget**.
3. Widget mode: **Managed** (recommended).
4. Hostnames: your production domain, and `localhost` for local testing.
5. Copy **Site Key** → `CLOUDFLARE_TURNSTILE_SITE_KEY`.
6. Copy **Secret Key** → `CLOUDFLARE_TURNSTILE_SECRET_KEY`.
7. Add the same vars in Vercel → Project → Settings → Environment Variables → Redeploy.

You do **not** need to change DNS or put the site behind Cloudflare proxy.
