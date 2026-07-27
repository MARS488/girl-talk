# Girl Talk 💬

Your brutally honest best friend — a mobile-first web app that helps you decode his
behavior, spot red flags, set boundaries, and protect your peace.

**Everything runs on your device.** Nothing you type is uploaded or stored anywhere
but your own browser. No account, no server, no API key required.

## The app

- **[`index.html`](index.html)** — the whole app, in one file. Double-click to open it
  locally, or visit the live site (below).

### Features

- **Decode** — paste what he said and the on-device *Instant Read* engine reads between
  the lines. Pick one of four besties for the voice:
  - 💗 **Big Sis** — warm but real
  - 🧠 **The Therapist** — calm & clinical (attachment lens)
  - 🔥 **Hype Woman** — confidence boost
  - 😈 **The Roast** — brutally funny
- **Scripts** — ready-to-copy words for boundaries, "you're overthinking," asking for
  what you need, and walking away. Plus ADHD / RSD regulation tools and a secure-attachment
  daily checklist.
- **Safety** — a quick-exit button, US crisis + domestic-violence resources, and a
  green-flag / red-flag gut check.
- **My Cases** — save any read to spot the pattern over time (stored only on your device).

Dark mode and light mode included.

## Live site

This repo auto-deploys to **GitHub Pages** via `.github/workflows/pages.yml`.
Once the workflow has run, the site is live at:

```
https://mars488.github.io/girl-talk/
```

## Privacy

- 100% client-side. The "Instant Read" engine is plain JavaScript in `index.html` — no
  network calls for analysis, no tracking.
- Saved cases and progress live in your browser's `localStorage` and never leave the device.
- The only external requests are for web fonts (Google Fonts) and the confetti animation
  (jsDelivr). These can be self-hosted later for a fully offline build.

## Roadmap

Growing this toward the full v3 feature set: Thread Analysis (paste a whole conversation),
Player Stopper, an expanded safety plan, and optional AI "Deep Reads" via a user-supplied key.

## Not medical or legal advice

Girl Talk offers supportive guidance from a friend's perspective. It is not professional,
legal, or medical advice. In an emergency, call your local emergency number.

## Archive

- `archive/grok-experiment-original.html` — the earlier Grok-based experiment this build
  grew from. Kept for reference.
