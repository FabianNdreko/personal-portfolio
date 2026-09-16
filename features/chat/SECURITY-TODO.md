# Chat safety — checklist

Track hardening for the public AI chat (`POST /api/chat`).

## Done

- [x] Cloudflare Turnstile (bot check + server Siteverify)
- [x] Site key without `NEXT_PUBLIC_` (passed from server layout)
- [x] Durable rate limits via Upstash Redis
  - 10 requests / 10 minutes per IP
  - 20 requests / day per IP
  - In-memory fallback when Upstash env is missing (local only)
- [x] Input limits (Zod: max 500 chars, max 12 messages)
- [x] Soft system-prompt guardrails (profile-only)
- [x] `max_tokens: 400` on OpenAI replies
- [x] Production fail-closed if OpenAI is set but Turnstile secret is missing
- [x] Mobile: chat/contact inputs at 16px (no iOS zoom on focus)

## To do (recommended order)

### 1. Trust only the last user message
- [ ] Do not trust client-sent `assistant` history
- [ ] Server should send OpenAI only the latest user question (+ fixed system/profile context)
- [ ] Optional later: short server-side session history if multi-turn is needed

### 2. OpenAI spend controls (dashboard — no code)
- [ ] Set a hard monthly budget / usage limit in OpenAI
- [ ] Enable billing alerts
- [ ] Use a dedicated API key/project only for this portfolio

### 3. Kill switch
- [ ] Add `CHAT_ENABLED` env (default on)
- [ ] When `false`, `/api/chat` returns 503 (or canned “unavailable”) without calling OpenAI

### 4. Abuse logging
- [ ] Log Turnstile failures (403)
- [ ] Log rate-limit hits (429)
- [ ] Avoid storing full message text long-term unless needed

### 5. Optional hardening
- [ ] Allowlist model to `gpt-4o-mini` only (ignore arbitrary `OPENAI_MODEL` in prod)
- [ ] OpenAI Moderation API on user input
- [ ] Origin/Referer check for `/api/chat` (your domain only)
- [ ] Require Upstash in production when OpenAI is enabled (fail closed like Turnstile)

## Env vars (production)

Required for full protection:

```bash
OPENAI_API_KEY=
CLOUDFLARE_TURNSTILE_SITE_KEY=
CLOUDFLARE_TURNSTILE_SECRET_KEY=
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

Optional / planned:

```bash
OPENAI_MODEL=gpt-4o-mini
CHAT_ENABLED=true
WEB3FORMS_ACCESS_KEY=
```

## Deploy checklist

- [ ] All env vars set in Vercel (Production)
- [ ] Turnstile hostnames include live domain (+ `www` if used)
- [ ] Upstash Redis created; REST URL + token in Vercel
- [ ] Redeploy after env changes
- [ ] Smoke test: chat works in browser
- [ ] Smoke test: `POST /api/chat` without Turnstile token → 403
- [ ] OpenAI budget set
