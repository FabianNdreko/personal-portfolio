# Chat safety — checklist

Track hardening for the public AI chat (`POST /api/chat`).

## Done

- [x] Cloudflare Turnstile (bot check + server Siteverify)
- [x] Site key without `NEXT_PUBLIC_` (passed from server layout)
- [x] Durable rate limits via Upstash Redis
  - 10 requests / 10 minutes per IP
  - 20 requests / day per IP
  - In-memory fallback when Upstash env is missing (local only)
  - Production requires Upstash when OpenAI is enabled
- [x] Input limits (Zod: max 500 chars per question)
- [x] Only the latest user message is sent to OpenAI (no client history)
- [x] No silent canned fallback — if AI is down / missing key, return an error
- [x] Soft system-prompt guardrails (profile-only)
- [x] `max_tokens: 400` on OpenAI replies
- [x] Model allowlist (`gpt-4o-mini` only)
- [x] Kill switch via `CHAT_ENABLED` (default on; `false` → 503)
- [x] Abuse logging for 403/429/config failures (redacted IP, no message body)
- [x] Production fail-closed if OpenAI is set but Turnstile secret is missing
- [x] Mobile: chat/contact inputs at 16px (no iOS zoom on focus)

## To do (you — OpenAI dashboard)

### OpenAI spend controls
- [ ] Add ~$5 credits / payment method in Billing
- [ ] After leaving Free tier (if Spend appears): set monthly limit + **Enforce hard limit**
- [ ] Enable spend alerts (e.g. 50% / 80%)
- [ ] Prefer a dedicated API key/project only for this portfolio

## Optional later

- [ ] Optional later: short server-side session history if multi-turn is needed
- [ ] OpenAI Moderation API on user input
- [ ] Origin/Referer check for `/api/chat` (your domain only)

## Env vars (production)

```bash
OPENAI_API_KEY=
OPENAI_MODEL=gpt-4o-mini
CHAT_ENABLED=true
CLOUDFLARE_TURNSTILE_SITE_KEY=
CLOUDFLARE_TURNSTILE_SECRET_KEY=
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
WEB3FORMS_ACCESS_KEY=
```

## Deploy checklist

- [ ] All env vars set in Vercel (Production)
- [ ] Turnstile hostnames include live domain (+ `www` if used)
- [ ] Upstash Redis created; REST URL + token in Vercel
- [ ] Redeploy after env changes
- [ ] Smoke test: chat works in browser
- [ ] Smoke test: `POST /api/chat` without Turnstile token → 403
- [ ] Smoke test: `CHAT_ENABLED=false` → 503
- [ ] OpenAI credits + spend limit / alerts (when available)
