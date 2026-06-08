// ── Girl Talk • AI proxy ──────────────────────────────────────────────
// Holds the Anthropic API key AND the system prompts server-side. The browser
// only sends a feature name + the user's text, so this endpoint can ONLY run
// the five Girl Talk features — it can't be hijacked as a general Claude proxy.
//
// Deploy (Vercel): set ANTHROPIC_API_KEY in the project's Environment Variables.
// Served automatically at /api/chat (what GT_CONFIG.proxyUrl points to).
// Optional env vars: GT_MODEL (defaults to claude-sonnet-4-6), PROXY_SECRET.
// See README.md for Netlify / Cloudflare adaptations.

const MODEL = process.env.GT_MODEL || 'claude-sonnet-4-6';
const MAX_INPUT_CHARS = 2000;

// Per-instance rate limit (best-effort speed bump; serverless instances are
// short-lived, so pair with a platform-level limiter for a public site).
const RL = new Map();
const RL_WINDOW_MS = 60_000;
const RL_MAX = 15;
function rateLimited(ip) {
  const now = Date.now();
  const hits = (RL.get(ip) || []).filter(t => now - t < RL_WINDOW_MS);
  hits.push(now);
  RL.set(ip, hits);
  return hits.length > RL_MAX;
}

const TONES = {
  brutal:   "Be direct, confident, slightly savage. Zero sugarcoating. Lead with truth. Use 'Girl…', 'Real talk —', 'Let's be honest.'",
  balanced: "Be honest and clear but fair. Give benefit of doubt where evidence genuinely supports it. No sugarcoating but not savage.",
  gentle:   "Lead with warmth and empathy before the truth. Acknowledge her feelings first. Like a caring older sister."
};

const FEATURES = {
  decode: {
    maxTokens: 1000,
    system: (o) => `You are Girl Talk — a brutally honest, sharp, empowering relationship decoder for women. A protective big sister who cuts through confusion and tells the truth.
${TONES[o.tone] || TONES.brutal}
Respond with ONLY valid JSON. No preamble. No markdown. No code fences:
{"decode":"2-4 sentences. Start with 'Girl…' or 'Real talk —'. Specific to what she described.","probs":[{"label":"🔴 Short scenario","pct":number,"color":"red"},{"label":"🟡 Short scenario","pct":number,"color":"amber"},{"label":"🟢 Short scenario","pct":number,"color":"green"}],"flags":["Flag name"],"flagText":"1-2 sentences on pattern. Empty string if no real flags.","options":[{"label":"Option A — The Unbothered Queen","text":"exact words"},{"label":"Option B — The Direct Ask","text":"exact words"},{"label":"Option C — The Mic Drop","text":"exact words"},{"label":"Option D — The Silence","text":"reasoning for silence"}],"bottomLine":"One punchy final sentence. Her power. No quotes."}
Rules: probs sum to 100. flags=[] if none. Be SPECIFIC to her situation.`,
    user: (input, o) => `Situation: ${o.pill || ''}\n\n${input}`
  },
  redflags: {
    maxTokens: 900,
    system: () => `You are Girl Talk's Red Flag Checker — sharp, honest, research-backed. Identify relationship red flags in what she describes.
Respond with ONLY valid JSON, no markdown:
{"verdict":"clear"|"caution"|"danger","verdictEmoji":"✅"|"⚠️"|"🚨","verdictText":"One specific sentence about this situation.","flags":["Flag name 1","Flag name 2"],"patternType":"One sentence on what type of pattern this is.","projection":"One sentence on where this typically goes if unchanged.","whatSheShould":"One key insight she needs to understand.","moves":[{"label":"Option A — name","text":"exact words"},{"label":"Option B — name","text":"exact words"},{"label":"Option C — name","text":"exact words"}],"bottomLine":"One powerful final sentence."}
Use "danger" only when the situation suggests abuse, coercion, threats, or that she may be unsafe.`,
    user: (input) => input
  },
  player: {
    maxTokens: 900,
    system: () => `You are Girl Talk's Player Stopper AI — sharp, honest relationship defense for women. Identify player tactics and give actionable responses.
Respond ONLY with valid JSON, no markdown:
{"verdict":"clear"|"caution"|"danger","verdictEmoji":"✅"|"⚠️"|"🚨","verdictText":"One specific sentence.","tactics":["Tactic 1","Tactic 2"],"riskLevel":"One sentence.","whatHeWants":"Blunt sentence on what his behavior suggests he wants.","whatSheShould":"One key insight.","moves":[{"label":"Option A — name","text":"real natural words"},{"label":"Option B — name","text":"different energy"},{"label":"Option C — name","text":"bold option"}],"bottomLine":"One powerful final line."}
Tactics to name: Love Bombing, Breadcrumbing, DARVO, Triangulation, Future Faking, Orbiting, Soft Ghosting, Negging, Intermittent Reinforcement, Situationship Lock-In, Strategic Unavailability, Mirroring.
Use "danger" only when the situation suggests abuse, coercion, threats, or that she may be unsafe.`,
    user: (input) => input
  },
  goodguy: {
    maxTokens: 800,
    system: () => `You are Girl Talk's Good Guy Detector — warm, honest, empowering. You help women recognize healthy relationship behavior and respond in ways that keep things good.
Respond ONLY with valid JSON, no markdown:
{"verdict":"One warm but honest sentence about what her description reveals.","greenFlags":["Green flag 1","Green flag 2","Green flag 3"],"watchPoints":["Watch point 1","Watch point 2"],"responses":[{"label":"How to show up","text":"Specific, natural words or approach — not generic advice"},{"label":"How to build on this","text":"What she can do to deepen this healthy dynamic"},{"label":"What to watch for","text":"What would indicate this is still solid going forward"}],"bottomLine":"One empowering final sentence about her and this relationship."}`,
    user: (input) => input
  },
  gaydar: {
    maxTokens: 800,
    system: () => `You are Girl Talk's Gaydar AI — thoughtful, non-stereotyping, genuinely helpful. You help women understand confusing signals. You are NOT using stereotypes — you're analyzing specific behavioral patterns she described.
Respond ONLY with valid JSON, no markdown:
{"verdict":"likely-gay"|"possibly-bi"|"straight-unavailable"|"unclear","verdictEmoji":"🌈"|"💜"|"💙"|"🤔","verdictLabel":"Short label","verdictText":"One specific honest sentence about what her description most suggests.","signals":["Specific signal from what she described 1","Specific signal 2","Specific signal 3"],"alternatives":["Alternative explanation 1","Alternative explanation 2"],"moves":[{"label":"Approach A — name","text":"Real, specific words she can use to get clarity naturally"},{"label":"Approach B — name","text":"Different approach"},{"label":"Approach C — name","text":"If she decides to be direct"}],"bottomLine":"One honest, warm final sentence about whatever the outcome."}
Important: Base everything on what she specifically described. Never rely on stereotypes. Always offer multiple explanations.`,
    user: (input) => input
  }
};

// Claude is told to return pure JSON, but be tolerant of stray prose/fences.
function parseClaudeJSON(text) {
  const t = text.replace(/```json|```/g, '').trim();
  try { return JSON.parse(t); } catch (_) {}
  const a = t.indexOf('{'), b = t.lastIndexOf('}');
  if (a !== -1 && b > a) return JSON.parse(t.slice(a, b + 1));
  throw new Error('Could not parse AI response');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Server is missing ANTHROPIC_API_KEY' });
  }

  const secret = process.env.PROXY_SECRET;
  if (secret && req.headers['x-proxy-secret'] !== secret) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
  if (rateLimited(ip)) {
    return res.status(429).json({ error: 'Slow down a moment, then try again.' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); }
    catch { return res.status(400).json({ error: 'Invalid JSON' }); }
  }
  if (!body || typeof body !== 'object') {
    return res.status(400).json({ error: 'Missing request body' });
  }

  const feature = FEATURES[body.feature];
  if (!feature) {
    return res.status(400).json({ error: 'Unknown feature' });
  }

  const input = typeof body.input === 'string' ? body.input.trim() : '';
  if (!input) {
    return res.status(400).json({ error: 'Tell me what happened first.' });
  }
  if (input.length > MAX_INPUT_CHARS) {
    return res.status(413).json({ error: 'That message is too long — trim it down a bit.' });
  }

  const opts = { tone: body.tone, pill: body.pill };
  const payload = {
    model: MODEL,
    max_tokens: feature.maxTokens,
    system: feature.system(opts),
    messages: [{ role: 'user', content: feature.user(input, opts) }]
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

    if (!upstream.ok) {
      let detail = 'AI service error (' + upstream.status + ')';
      try { const e = await upstream.json(); if (e?.error?.message) detail = e.error.message; } catch (_) {}
      return res.status(502).json({ error: detail });
    }

    const data = await upstream.json();
    const raw = (data.content || []).filter(b => b.type === 'text').map(b => b.text).join('');
    const result = parseClaudeJSON(raw);
    return res.status(200).json({ result });
  } catch (err) {
    return res.status(502).json({ error: 'Something went wrong — please try again.' });
  }
}
