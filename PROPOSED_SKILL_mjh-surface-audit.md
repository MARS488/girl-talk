---
name: "mjh-surface-audit"
description: "Catch drift between the vault's real facts (Entity Facts, Price Card) and anything published to a surface outside the vault — a GitHub repo, a Base44 app, a public artifact, a client-facing page. The vault's own weekly llc-system-audit only reaches the vault and Notion; nothing currently checks external surfaces once a fact leaves the system that watches it. Use before publishing anything with a hard number or fact to an external platform, and periodically against any external surface already live."
status: "PROPOSED — not yet live. Written 2026-08-26 by a cloud/web session with no vault file access, after finding real, live drift in its own working repo: a client demo and a Base44 build spec both shipped with pricing ($149/$349) that had gone stale relative to the real Price Card ($325/$395/$450/$550/$1,200-1,900mo) by the time this session actually saw the current numbers. Nothing flagged it automatically — it was found by chance, mid-conversation. Needs a session with real save-skill access to review and register."
---

# MJH Surface Audit

**One job: nothing that leaves the vault should be allowed to go stale silently.** The weekly `llc-system-audit` protects the vault and Notion against each other. This protects everything else.

## The gap this fixes, with the actual case that found it

Earlier this session (before `mjh-operate` existed as loadable content here), a demo prototype and a full Base44 app-build spec were written using pricing pulled from a vault note dated 2026-08-10 ($149 Quick Look / $349 Full Assessment). Two weeks later, `mjh-operate` — the current source of truth — showed real numbers had moved: $325 / $395 / $450 / $550 / $1,200-1,900mo. Nothing caught the gap automatically. It surfaced only because a human happened to ask a question that led to reloading the master skill mid-conversation.

**The general failure mode:** any fact that gets copied out of the vault onto an external surface — a git repo, a live app, a printed flyer, a client email template — is a snapshot the moment it's written. Nothing currently re-checks that snapshot against the source. The vault's own audit can't reach these surfaces; most of them aren't files Claude has any standing access to at all.

## What counts as an external surface

Anything with vault-derived facts (pricing, entity name, EIN, insurance status, service descriptions, disclaimer language) living somewhere the weekly vault audit doesn't reach:
- A GitHub repo (like this one)
- A Base44 (or similar) app, once built
- A published Claude artifact (a demo, a dashboard)
- A client-facing document, once sent
- A social media bio, a Google Business profile, a printed flyer

## The check, in two modes

**Mode 1 — before publishing (prevention).** Any session about to write a hard fact onto an external surface should, in the same turn, ask: *"is this number/fact something the vault already has an authoritative value for, and have I confirmed it against the current source rather than an older note I happened to read?"* If the honest answer is "I'm working from a note that's more than a few weeks old," say so explicitly rather than publish silently — same discipline `mjh-operate`'s house rules already require ("say what you did not check").

**Mode 2 — periodic re-check (detection).** For a surface already live: pull the current value from whatever source is reachable this session (Entity Facts, Price Card, or `mjh-operate` itself if loaded), diff it against what's actually published, and report drift plainly — which surface, which fact, old value, new value, date the drift was found. Log the finding the same way any other fact-drift finding gets logged (append to the relevant change log, don't silently fix and move on unless it's routine maintenance the way the vault audit already treats duplicate-fact fixes).

## Known external surfaces as of this writing (seed the tracking list)

| Surface | What's on it | Last checked against source |
|---|---|---|
| github.com/mars488/girl-talk | Full operational toolkit, a CivilitySync demo, a Base44 spec | 2026-08-26 — pricing found stale, not yet corrected in the repo itself as of this entry |
| Published Claude artifacts (demo, Command Snapshot dashboard) | Client intake UX, live Notion job data | 2026-08-11 pull for the dashboard; demo pricing stale as above |

**Whoever adopts this skill should keep this table current** — it's the registry of "things that can go stale outside the vault's normal reach," and it's short enough right now to maintain by hand.

## Why this can't just be "run the weekly audit more broadly"

The weekly `llc-system-audit` works because it has direct file access to the vault and a Notion API connection. Most external surfaces (a live app, a printed flyer, someone's inbox) have neither. This skill is deliberately scoped to work the way `mjh-operate` does — usable by whatever session happens to be looking at the surface in question, with whatever access that session actually has, rather than assuming a single privileged auditor can reach everywhere. That's the only way it scales to surfaces the vault-side automation structurally can't touch.
