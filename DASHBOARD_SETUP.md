# CivilitySync Stage 0-1 Dashboard Setup

**Purpose:** One honest number to track. Clarity on whether Stage 0 has cleared its gate.

---

## The One Number (per stage)

- **Stage 0:** Properties flown. Gate: 3-5 with positive "would you use this again?" feedback.
- **Stage 1:** Paying jobs/month. Gate: 3+ per month, at least 1 recurring contract.
- **Stage 2:** Monthly Recurring Revenue (MRR). Gate: $2,000+/month of recurring contracts.

**Right now:** We're tracking Stage 0. Everything else follows.

---

## Quick Setup (Google Sheets / Excel)

### Sheet 1: Flight Log (Enter data here)

**Columns:**
| Date | Property Address | Acres | Service Type | Client Paid? | Amount | Feedback | Notes |
|------|------------------|-------|--------------|-------------|--------|----------|-------|

**Example rows:**
```
8/11/2026  | 4129 Spain Ferry Road | 0.5 | LiDAR Desktop | No | $0 | Demo | Free proof-of-concept
8/15/2026  | 123 Oak Lane | 2 | Storm Assessment | Yes | $1,500 | "Helpful" | First paid job
8/20/2026  | HOA Main Street | 15 | Neighborhood | Yes | $3,500 | "Would use again" | Recurring potential
```

**Data entry discipline:**
- Enter immediately after each flight
- Get feedback within 48 hours of delivery (one text/email: "Was this useful?")
- Mark "Would use again" if client has follow-up work or referred another client

---

### Sheet 2: Dashboard (Auto-calculated)

**Copy these formulas to track your progress:**

#### Stage 0 Summary
```
Total properties flown: =COUNTA(A2:A999)  // Count all flights
Paid vs free: =COUNTIF(D2:D999,"Yes") paid, =COUNTIF(D2:D999,"No") free
Revenue so far: =SUM(F2:F999)
Average job size: =AVERAGE(F2:F999)  // Ignore $0 jobs: use IF(F2>0,F2,"")
```

#### Key Metrics
```
"Would use again" count: =COUNTIF(G2:G999,"Would use again")
Feedback score: =COUNTIF(G2:G999,"Would use again") / COUNTA(A2:A999)
     // E.g., 2 out of 3 = 67% positive

Days since first flight: =TODAY() - MIN(A2:A999)
Jobs per month (annualized): =COUNT(A2:A999) / (Days/30)
```

#### Stage 0 Gate Check
```
Stage 0 cleared? = IF(AND(
  COUNTA(A2:A999) >= 3,
  COUNTIF(G2:G999,"Would use again") >= 2,
  COUNTIF(D2:D999,"Yes") >= 1
), "READY FOR STAGE 1", "IN PROGRESS")
```

---

### Sheet 3: Partner Tracker

**Purpose:** Track outreach to Southeastern Survey and environmental firm.

| Partner | Contact | Last Outreach | Status | Next Action | Date |
|---------|---------|----------------|--------|-------------|------|
| Southeastern Survey | Barbara | [date] | Proposal sent | Coffee chat | [date] |
| Environmental Firm | [name] | [date] | Initial research | Send proposal | [date] |
| Marketplace (Zeitview) | - | [date] | Research | Sign up | [date] |

---

## How to Use This

**Weekly (every Friday):**
1. Add any new flights to Flight Log
2. Collect feedback on recent deliveries
3. Check Stage 0 Gate status
4. Update Partner Tracker with any outreach

**The Stage 0 Gate Check:**
When you hit **3+ properties flown** AND **2+ "would use again"** AND **at least 1 paid job** → Stage 0 is cleared. You move to Stage 1 (land a recurring contract).

**Don't overthink it.** The metric is simple: can you prove the concept works and someone will pay for it?

---

## Expense Tracking (Parallel)

Track costs separately so you can calculate unit economics:

| Date | Category | Amount | Job | Notes |
|------|----------|--------|-----|-------|
| 8/15 | Battery replacement | $45 | Storm_Oak_Lane | DJI battery wear |
| 8/15 | Travel (mileage) | $30 | Storm_Oak_Lane | 20 mi @ $1.50/mi |
| 8/20 | Software (monthly) | $50 | General | DJI Terra monthly |

**Month-end summary:**
```
Total costs: =SUM(C2:C999)
Cost per job: = Total costs / Jobs flown that month
Gross margin: = Revenue - Costs
```

This feeds back into the Quote Generator for confidence on next tier.

---

## Dashboard Visualization (Nice-to-Have)

If you want a visual, add a simple chart:
- **X-axis:** Date
- **Y-axis:** Cumulative revenue
- **Show:** Stage 0 gate threshold as a line

Visual proof of progress. That's it.

---

## When to Expand

**Don't add Stage 1 metrics yet.** Once you land a recurring customer (HOA, monthly monitoring, seasonal contract), *then* switch the dashboard to track MRR and churn. Right now, focus on one number: **properties flown with positive feedback.**

Simplicity is the feature.
