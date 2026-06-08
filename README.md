# Girl Talk • Real Talk

A single-page relationship decoder: paste a confusing text, get a brutally honest,
psychology-backed breakdown. Plus red-flag / player / good-guy scanners, a love
languages compatibility tool, a quiz, and an anonymous community feed.

- **Frontend:** one static file, `index.html` (HTML + CSS + vanilla JS, no build step).
- **AI proxy:** `api/chat.js` — a small serverless function that holds the Anthropic
  API key server-side so it never reaches the browser.

## How the AI features work

The five AI tabs (Decode, Red Flags, Player Stopper, Good Guy, Gaydar) call Claude.
All requests go through one helper, `askGirlTalk()`, configured at the top of the
`<script>` in `index.html`:

```js
const GT_CONFIG = {
  proxyUrl:    '/api/chat',     // server-side proxy — the safe default
  proxySecret: '',              // optional, must match PROXY_SECRET on the proxy
  apiKey:      '',              // dev only — exposes the key in the browser
  model:       'claude-sonnet-4-6'
};
```

The **non-AI** features (Love Languages, the quiz, Community, theming) work with no
setup at all — just open `index.html`.

## Deploy on Vercel (recommended)

1. Push this repo to GitHub and import it at [vercel.com/new](https://vercel.com/new),
   or run `npx vercel` from this directory.
2. In **Project → Settings → Environment Variables**, add:
   - `ANTHROPIC_API_KEY` = your key from <https://console.anthropic.com>
   - *(optional)* `PROXY_SECRET` = any random string, if you want to gate the proxy.
3. Deploy. Vercel serves `index.html` at `/` and `api/chat.js` at `/api/chat`
   automatically — which is exactly what `GT_CONFIG.proxyUrl` points to. Done.

## Run locally

```bash
npx vercel dev          # serves the page + /api/chat with your env vars
```

Set `ANTHROPIC_API_KEY` in a local `.env` (it's git-ignored). Opening `index.html`
directly via `file://` runs the non-AI features only — the proxy needs a server.

## Other hosts

The proxy is a standard `export default async function handler(req, res)`.

- **Netlify:** move the logic into `netlify/functions/chat.js` (using the Netlify
  handler signature) and set `GT_CONFIG.proxyUrl = '/.netlify/functions/chat'`.
- **Cloudflare Pages:** put it in `functions/api/chat.js` using the
  `onRequestPost({ request, env })` signature; read the key from `env.ANTHROPIC_API_KEY`.

## Security notes

`api/chat.js` is an endpoint on **your** Anthropic quota, so it's hardened: POST-only,
a model allowlist, a `max_tokens` cap, and a request-size cap. A public web page can't
truly keep a `PROXY_SECRET` (it ships to the browser), so for a public deployment the
real protections are **rate limiting** and, ideally, **moving the system prompts
server-side** so the endpoint can't be used as a general-purpose Claude proxy. Never
use the dev-only `apiKey` mode on a site you ship.
