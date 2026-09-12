# Chief of Staff ↔ Claude bridge

**Purpose:** Shared handoff so Claude (claude.ai / Claude Code) and Grok Bot Chief of Staff stay aligned on Marcus Jay Herring LLC / CivilitySync.

**Repo:** `MARS488/girl-talk`  
**Working branch:** `claude/marcus-herring-llc-w3vre4`  
**Updated:** 2026-09-12 by Chief of Staff (Grok Bot) — vault correction applied

**Live dialogue:** Dropbox `/LLC Business/dialogue/` (per-turn files) + cheap poll `/LLC Business/COS_CLAUDE_STATE.json`. Old `COS_CLAUDE_DIALOGUE.md` is a read-only pointer.

---

## How to use this file

1. **Claude:** Read this file at the start of LLC / CivilitySync sessions. Prefer the Dropbox dialogue for turn-by-turn collab. Update this bridge when durable status changes.
2. **CoS:** Refresh this file after deep ops scans or after Marcus makes a decision. Prefer editing here over scattering status only in chat.
3. **Conflicts:** If Dropbox, Notion, and this repo disagree — call it out here. Marcus decides. Obsidian vault is master for some trackers; Claude has vault access; CoS does not (Claude mirrors key docs into Dropbox).

---

## Shared systems

| System | Access | Role |
|--------|--------|------|
| This GitHub branch | Claude + CoS | Specs, scripts, playbooks, bridge |
| Dropbox `/LLC Business/` | Claude + CoS | Strategy md, portfolio, dialogue, vault mirrors |
| Notion Command Center + Drone Jobs + Todos | CoS connected | Live CRM / status mirror |
| Google Drive | CoS connected | Files / training packets |
| Obsidian vault | Claude only | Canonical operate / constraint engine |

---

## Locked business facts (as of 2026-09-12, vault-corrected)

- **Entity:** Marcus Jay Herring, LLC (GA) — EIN **41-2527098** (not 42-…)
- **Brands:** Herring Drones (paid), Angel Blue Jay (portfolio), CivilitySync (platform / provenance)
- **Pricing — two product lines (Marcus 2026-09-12):**
  - **CivilitySync packages:** Quick Look **$175** · Full Assessment **$325** · Seasonal **$299**/visit
  - **Herring Drones service rates (vault):** Listing Essentials **$325** · Property Documentation **$395** · Storm **$450** · Land Read **$550** · Progress Retainer **$1,200–1,900**/mo
  - Always quote the **named card**; do not mix. **`$149 / $349` is dead/stale**
- **Insurance / first-flight:** unbound remains true on paperwork, but **muted as next-action nags** (AI HANDOFF 2026-09-06). Do not raise as CoS #1.
- **Part 107:** #5051412, issued 2025-11-03; recurrent ~Nov 2027
- **Revenue:** $0 real jobs; Drone Jobs has example/test rows only
- **Portfolio:** curated **~31 images** (7 categories) exist locally/vault; Dropbox `/LLC Business/Portfolio/` still incomplete — both Dropbox connectors are text-only for creates; Marcus (or alternate) must upload binaries; CoS hosts share link via GitHub Pages

---

## Recommended near-term (vault-corrected CoS priority)

1. **Fly Angel Blue Jay portfolio piece** — live binding next action; 0 of 5 target examples; no insurance/client/money needed for self-doc
2. **Get curated portfolio into Dropbox + public share link** (31 images + HTML capability page + GC-packet PDF → Pages)
3. **Stamp out $149/$349** wherever it still appears publicly
4. Insurance / accountant / DBA / local license — **queued, muted, do not nag**
5. Regions LLC account ending 9740 — confirm when convenient (not blocking portfolio flight)

---

## Latest CoS notes

- **2026-09-12, Claude (cloud/repo session):** Applied the two-product-line decision to the repo. The demo prototype's prices were already the correct card ($175/$325/$299 = CivilitySync packages) so no numbers changed — but its banner now **names the card** and states that Herring Drones service rates are a separate card never to be mixed. Also corrected a real error in my own `PROPOSED_SKILL_mjh-surface-audit.md`: its case study had cited the *Herring Drones service card* as the demo's correct successor, which is the exact card-mixing mistake this decision rules out. Left the error visible and annotated rather than silently fixed, because it teaches the sharper lesson: drift isn't only "the number went stale," it's also **"the number is current but belongs to a different product line."** A surface audit has to check *which card a number came from*, not just whether the digits match something authoritative somewhere.
- 2026-09-12: Marcus confirmed CivilitySync package tiers and Herring Drones vault service rates **coexist** as two product lines.
- **2026-09-12, Claude (Claude Code, cloud session — no vault access this session):** Actioned bridge priority #3. `$149/$349` is now stamped out of the repo: `civilitysync-demo-prototype.html` updated to locked prices (Quick Look $175 / Full Assessment $325 / Seasonal $299/visit) with a dated source stamp in its banner, and the stale reference removed from `BASE44_APP_SPEC.md`. **Scope note: demo/spec files only — no live intake, public page, or client-facing quote was touched.** `BASE44_APP_SPEC.md` still requires any real build to read prices from the Price Card rather than hardcode them, so this doesn't recreate the same drift. Historical `$149/$349` references remain *only* inside `PROPOSED_SKILL_mjh-surface-audit.md`, on purpose — that file documents the drift as its worked case study; deleting the numbers there would remove the evidence. Also added `PROPOSED_SKILL_legal-exposure-map.md` (jurisdiction-neutral compliance-category map, sub-skill of the generalized operator OS). Commit `581b96a`.
  - ⚠️ **Possible pricing conflict for Marcus to settle, not for either AI to resolve:** this bridge locks Quick Look $175 / Full Assessment $325 / Seasonal $299. The vault's `mjh-operate` master skill (last verified against disk 2026-08-24) lists a different set — Listing Essentials $325 · Property Documentation $395 · Storm $450 · Land Read $550 · Progress Retainer $1,200–1,900/mo. These may be two different product lines (CivilitySync package tiers vs. Herring Drones service rates) rather than a contradiction — but nothing states that explicitly, and an AI guessing which applies to a given quote is exactly how a wrong number reaches a client. **Marcus: confirm whether these coexist or one supersedes the other.**
- 2026-09-12: CoS connected Dropbox, Notion, Google Drive, GitHub (`MARS488`). Deep-dived LLC ops. Cleared ~1 GB Dropbox bloat (duplicate DPA zip + LLC copy of Jan 03 video). Established this bridge + Dropbox dialogue.
- 2026-09-12 ~02:00 UTC: Claude vault correction accepted. Priorities re-ranked (insurance muted; fly portfolio #1). Dialogue auto-watch routine enabled. Greenlit Claude portfolio push to Dropbox. GitHub Pages setup in progress for shareable capability page.
- Ask Marcus before mutating live intake, insurance, or public brand/pricing.

---

## Protocol for Claude

When you change pricing, insurance status, Base44 gates, or job CRM rules: update this file’s “Latest CoS notes” (or the relevant section) and leave a one-line commit message Marcus can skim. Day-to-day collab: create next numbered file under Dropbox `/LLC Business/dialogue/` (protocol v2).
