---
name: "mjh-surface-audit"
description: "Catch drift between the vault's real facts (Entity Facts, Price Card) and anything published to a surface outside the vault — a GitHub repo, a Base44 app, a public artifact, a client-facing page. The vault's own weekly llc-system-audit only reaches the vault and Notion; nothing currently checks external surfaces once a fact leaves the system that watches it. Use before publishing anything with a hard number or fact to an external platform, and periodically against any external surface already live."
status: "PROPOSED — not yet live. Written 2026-08-26 by a cloud/web session with no vault file access, after finding real, live drift in its own working repo: a client demo and a Base44 build spec both shipped with pricing ($149/$349) that had gone stale relative to the live CivilitySync package card ($175/$325/$299) by the time this session actually saw the current numbers. Nothing flagged it automatically — it was found by chance, mid-conversation. Needs a session with real save-skill access to review and register."
---

# MJH Surface Audit

**One job: nothing that leaves the vault should be allowed to go stale silently.** The weekly `llc-system-audit` protects the vault and Notion against each other. This protects everything else.

## The gap this fixes, with the actual case that found it

Earlier this session (before `mjh-operate` existed as loadable content here), a demo prototype and a full Base44 app-build spec were written using pricing pulled from a vault note dated 2026-08-10 ($149 Quick Look / $349 Full Assessment). Two weeks later the numbers had moved. **This case study originally recorded the correction wrongly, and the error is instructive enough to keep visible rather than quietly fix:** it cited the Herring Drones service card ($325 / $395 / $450 / $550 / $1,200-1,900mo) as the demo's correct successor. It is not. The demo is a *CivilitySync package* page, so its card is Quick Look $175 / Full Assessment $325 / Seasonal $299 — confirmed by Marcus 2026-09-12, who ruled that the two price lists are **two coexisting product lines** and that you must always quote the named card and never mix them.

So this skill, written to catch drift, initially committed the exact adjacent error — pulling a real number off the wrong card. That is worth stating plainly, because it shows the failure mode is not only "the number went stale" but also **"the number is current but belongs to a different product line."** A surface audit must therefore check *which card a number came from*, not merely whether the digits match something authoritative somewhere.

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
