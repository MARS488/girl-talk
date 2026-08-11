# CivilitySync Operational Toolkit

**Purpose:** Stage 0-1 execution tools for Marcus Herring LLC / CivilitySync drone business.

**Status:** All files ready for use. Start here.

---

## What's Inside

### 1. **Quote Generator** (`civilitysync_quote_generator.py`)

**Why:** Before you quote a job, you need to know your margin. This tool prevents you from pricing blind.

**How to use:**
```bash
python3 civilitysync_quote_generator.py storm 3
# Generates: quote for 3-acre storm damage assessment

python3 civilitysync_quote_generator.py lidar 15 5000
# Generates: quote for 15-acre LiDAR job at custom $5,000 price (shows margin impact)
```

**What you get:**
- Recommended price based on property size
- Full cost breakdown (your time, travel, batteries, software, processing)
- Gross margin % (the number that tells you if it's worth doing)
- Margin health ("healthy", "strong", or "too thin — don't quote this")
- For LiDAR jobs: deposit recommendation (covers equipment rental + processing)

**Workflow:**
1. Property comes in
2. Estimate acreage + service type
3. Run quote generator
4. See the margin
5. Quote with confidence

---

### 2. **Service Agreement Template** (`SERVICE_AGREEMENT_TEMPLATE.md`)

**Why:** Legal protection + clarity for every job. Includes the new deposit clause for LiDAR work.

**What's in it:**
- Scope of work
- Pricing & payment terms
- Deposit clause (required for equipment rental jobs)
- Weather/scheduling terms
- Data ownership & liability
- Revision policy
- Signature block

**How to use:**
1. Copy to a Word/Google Doc
2. Fill in brackets: [Client Name], [Property Address], [Price], [Service Type]
3. Add specific LiDAR terms if needed
4. Send to client, get signature before flying

**Key feature:** Deposit clause protects you when renting equipment or outsourcing processing. Upfront cost guarantee.

---

### 3. **Partner Outreach Packages**

#### A. `PARTNER_OUTREACH_SOUTHEASTERN_SURVEY.md`

**The pitch:** "Be your aerial capture arm. You certify; we fly."

**Why it works:**
- Surveying firms don't want to own drone programs
- They want aerial data, not the headache
- Capture/certify split is win/win
- You get recurring work; they get faster turnarounds

**How to use:**
1. Customize with Barbara's name + Southeastern Survey specifics
2. Send as an email or print + walk it in
3. The proposal leads to coffee → pilot flight → first paid job

**What's pre-written:**
- The problem (surveying is getting faster, firms need aerial data)
- The solution (outsource capture, own the certification)
- Simple workflow
- Pricing (what you'll charge them)
- Next steps (coffee → flight → partnership)

#### B. `PARTNER_OUTREACH_ENVIRONMENTAL_FIRM.md`

**The pitch:** "Add aerial data layer to every environmental audit."

**Why it works:**
- Environmental firms do audits; audits need site documentation
- Aerial imagery makes reports more valuable
- Clients will pay for "we have aerial before/after + 3-year monitoring"
- You get recurring monitoring work; they get richer deliverables

**How to use:**
1. Customize for the actual environmental firm (Murray Gaskins or similar)
2. Reference their current audit work + add aerial layer
3. Send + follow up with coffee chat
4. Pilot flight on their next job

**What's pre-written:**
- Use cases (ESAs, wetland work, habitat monitoring, restoration tracking)
- Workflow (you handle flying + processing; they handle client + certification)
- Pricing
- Referral loop option (optional but powerful)
- Next steps

**Key advantage:** This vertical is aligned with your north star (land stewardship). Recurring work + mission-driven.

---

### 4. **Stage 0 Progress Tracker** (`STAGE0_PROGRESS_TRACKER.csv`)

**Why:** One honest number. Track it religiously.

**What to track:**
- Date of each flight
- Property address + acreage
- Service type (Storm Assessment / LiDAR / Scan)
- Whether the client paid
- Amount
- Feedback ("Would you use this again?")
- Notes

**The gate check:**
Stage 0 clears when:
- 3+ properties flown
- 2+ "would use again" responses
- At least 1 paid job

**How to use:**
1. Copy to Google Sheets or Excel
2. Add a row after every flight
3. Collect feedback within 48 hours (one text: "Was that useful?")
4. Review weekly — see the gate progress

---

### 5. **Dashboard Setup** (`DASHBOARD_SETUP.md`)

**Why:** See progress at a glance. Discipline through clarity.

**What it tracks:**
- Total properties flown
- Revenue to date
- Average job size
- Feedback score ("% would use again")
- Days since first flight
- Jobs per month (annualized)
- Stage 0 gate status (in progress vs. cleared)

**How to set it up:**
1. Create Google Sheet or Excel file
2. Copy the formulas from DASHBOARD_SETUP.md
3. Link it to your Flight Log
4. Every Friday: glance at the dashboard, update partner outreach status

**Key metric:** If you're flown 3 properties with 2+ positive responses and 1 paid job → Stage 0 is cleared → move to Stage 1 (land recurring contract).

---

## The 7-Day Startup Plan

### Day 1-2: Setup
- [ ] Read this README
- [ ] Customize Service Agreement with your name + LLC info
- [ ] Create Google Sheets dashboard + link to Flight Log
- [ ] Customize partner outreach proposals (names, contact info, any local details)

### Day 3-4: Outreach
- [ ] Send Southeastern Survey proposal (email or print + walk-in)
- [ ] Send Environmental Firm proposal (or research which firm first)
- [ ] Schedule coffee with at least one partner

### Day 5-6: Fly
- [ ] Pick 2-3 properties (yours if demo, real clients if possible)
- [ ] Run quote generator for each
- [ ] Use Service Agreement for any paid jobs
- [ ] Log flights in tracker

### Day 7: Review
- [ ] Collect feedback on deliverables
- [ ] Check dashboard — do you see the metrics moving?
- [ ] Update partner tracker — any responses yet?
- [ ] Plan Week 2 (more properties, follow up with partners)

---

## Running the Quote Generator

### Prerequisites
```bash
# You need Python 3.6+ installed
python3 --version
```

### Basic usage
```bash
# Storm/damage assessment for 3-acre property
python3 civilitysync_quote_generator.py storm 3

# LiDAR survey for 15 acres
python3 civilitysync_quote_generator.py lidar 15

# Custom price check (what if you charge $5,000 for a 15-acre LiDAR job?)
python3 civilitysync_quote_generator.py lidar 15 5000
```

### Output
The tool prints:
1. **Customer-facing proposal** (the price + what's included)
2. **Internal cost breakdown** (your costs, margin, health check)

---

## Notes

**This toolkit assumes:**
- You're based in Lowndes County / Valdosta, Georgia
- You have FAA Part 107 + business insurance (required before any paid work)
- You're targeting two initial verticals: storm/damage assessment + land stewardship/environmental
- You want to partner, not compete (Southeastern Survey + environmental firms are partners, not threats)
- You value simplicity over features (Google Sheets > custom app; one metric > dashboards)

**If you need to adjust:**
- Costs in the quote generator: edit `COSTS` dictionary
- Pricing tiers: edit `STORM_REBUILD_TIERS` or `LIDAR_TIERS`
- Service terms: modify `SERVICE_AGREEMENT_TEMPLATE.md`
- Dashboard formulas: adapt to your spreadsheet tool

**Key principle:** Start simple. If a tool makes your life harder, don't use it. Complexity kills execution.

---

## Next Move

**Stage 0: Pick 2-3 properties and fly them.** Everything above is in service of that.

1. Use the quote generator to know your margin
2. Send the partner proposals to land recurring work
3. Track progress on the dashboard
4. Move to Stage 1 (repeatable service) once Stage 0 clears

That's it. One foot in front of the other.

---

**Questions?** Refer back to the strategic docs for context:
- `../uploads/*/CivilitySync__Roadmap__North_Star.md` — the big picture
- `../uploads/*/CivilitySync__Business_Side_Operations__Money.md` — unit economics
- `../uploads/*/LiDAR__Wetland__Drainage_Service_Line_Rent_Dont_Buy.md` — LiDAR specifics
