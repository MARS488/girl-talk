// ── Girl Talk • AI proxy ──────────────────────────────────────────────
// Holds the Anthropic API key server-side so it never reaches the browser.
// The frontend POSTs the Messages API body here; we forward it to Anthropic
// with the key attached and return the response unchanged.
//
// Deploy (Vercel): set ANTHROPIC_API_KEY in the project's Environment Variables.
// The file is auto-served at /api/chat — which is what GT_CONFIG.proxyUrl points to.
// See README.md for Netlify / Cloudflare adaptations.
//
// Hardening (this is an endpoint on YOUR Anthropic quota):
//   • only POST
//   • model allowlist
//   • max_tokens capped
//   • request-body size capped
//   • optional shared secret (PROXY_SECRET) — note a public web page can't keep
//     a secret, so for a public site rate-limiting/auth is the real protection.

const ALLOWED_MODELS = new Set(['claude-sonnet-4-6', 'claude-haiku-4-5']);
const MAX_TOKENS_CAP = 1024;
const MAX_BODY_BYTES = 12000; // our prompts are small; this is generous

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Server is missing ANTHROPIC_API_KEY' });
  }

  // Optional shared secret. Only enforced when PROXY_SECRET is set on the server.
  const secret = process.env.PROXY_SECRET;
  if (secret && req.headers['x-proxy-secret'] !== secret) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Vercel parses JSON bodies automatically, but be defensive.
  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); }
    catch { return res.status(400).json({ error: 'Invalid JSON' }); }
  }
  if (!body || typeof body !== 'object') {
    return res.status(400).json({ error: 'Missing request body' });
  }

  const { model, max_tokens, system, messages } = body;

  if (!ALLOWED_MODELS.has(model)) {
    return res.status(400).json({ error: 'Model not allowed' });
  }
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages array is required' });
  }
  if (JSON.stringify({ system, messages }).length > MAX_BODY_BYTES) {
    return res.status(413).json({ error: 'Request too large' });
  }

  const payload = {
    model,
    max_tokens: Math.min(Number(max_tokens) || 900, MAX_TOKENS_CAP),
    messages,
    ...(typeof system === 'string' ? { system } : {})
  };

  try {
    const upstream = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify(payload)
    });
    const data = await upstream.json();
    return res.status(upstream.status).json(data);
  } catch (err) {
    return res.status(502).json({ error: 'Upstream request failed: ' + err.message });
  }
}
