# Marcus Jay Herring LLC — Operations Toolkit

**Purpose:** Core operational infrastructure for Marcus Jay Herring LLC. Tools and templates for running the business, managing finances, selling, and tracking progress across all divisions.

**Current division:** CivilitySync (drone-based property assessment and coordination)  
**Future divisions:** Land stewardship, surveying, construction monitoring, and others as the business scales

---

## What This Is

Not a CivilitySync toolkit. This is the **LLC operations foundation** — the business infrastructure that works regardless of what service you're selling. Use it for CivilitySync now; use it for whatever comes next.

Includes:
- Business structure & legal foundation
- Universal quote/pricing system (margins for any service)
- Service agreement templates
- Sales & partnership outreach frameworks
- Business dashboard (LLC-level metrics)
- Process documentation

---

## Files

### 1. `LLC_BUSINESS_STRUCTURE.md`
**What:** The LLC setup, legal requirements, and operational foundation.

**Why:** You need this documented before any revenue comes in. Covers:
- LLC formation & good standing
- EIN + business bank account
- Insurance requirements (before flying for money)
- Part 107 compliance
- Basic bookkeeping setup
- Tax planning

---

### 2. `UNIVERSAL_QUOTE_CALCULATOR.py`
**What:** CLI tool to calculate margins for any service vertical.

**How to use:**
```bash
python3 UNIVERSAL_QUOTE_CALCULATOR.py civilitysync storm 3 1500
# Vertical: civilitysync | Service: storm | Acres: 3 | Price: $1,500
# Output: cost breakdown + margin analysis

python3 UNIVERSAL_QUOTE_CALCULATOR.py civilitysync lidar 15 2500
# Vertical: civilitysync | Service: lidar | Acres: 15 | Custom price: $2,500
```

**Why:** Before you quote any job, you need to know:
- What does it actually cost you (time + materials + overhead)?
- What margin are you making?
- Is this a repeatable pricing level?

Works for storm damage, LiDAR, property scans, or anything else. Add new verticals by updating the config.

---

### 3. `SERVICE_AGREEMENT_TEMPLATE.md`
**What:** Generic service agreement with deposit clause.

**Covers:**
- Scope & deliverables
- Pricing & payment terms
- **Deposit clause** (for jobs with third-party costs)
- Scheduling & weather terms
- Data ownership & liability
- Revision policy
- Signature block

**How to use:** Copy to Word/Google Doc, customize for the specific client/service, sign before work starts.

---

### 4. `SALES_PARTNERSHIP_FRAMEWORK.md`
**What:** Generic framework for pitching partnerships and selling services.

**Includes:**
- The problem/opportunity statement
- Your solution & what you bring
- The workflow (how it works together)
- Pricing structure
- Why it works for both sides
- Next steps

**How to use:** Start with this template; customize for each partner or vertical.

---

### 5. `BUSINESS_DASHBOARD_SETUP.md`
**What:** Google Sheets dashboard formulas for LLC-level metrics.

**Tracks:**
- Revenue (per division + total)
- Gross margin (per division + total)
- Jobs completed (per division + total)
- Average job size
- Customer acquisition cost vs. lifetime value
- Stage gate status (per division)

**How to use:** Copy formulas to Google Sheets; link to your Flight Log and Invoice tracker. Update weekly.

---

### 6. `OPERATIONS_CHECKLIST.md`
**What:** Everything that needs to be in place before the LLC can take paid work.

**Covers:**
- Legal foundation (LLC, EIN, insurance)
- Operations (process docs, safety, compliance)
- Sales (pricing, agreements, pitch)
- Finance (bookkeeping, tax planning)
- Equipment (maintenance, backup)

---

## How They Work Together

**Setup (Week 1):**
1. Read LLC_BUSINESS_STRUCTURE.md
2. Verify/complete the Operations Checklist
3. Customize Service Agreement with your LLC info
4. Create Google Sheets dashboard

**For each new service/vertical (Week 2+):**
1. Add to Universal Quote Calculator config
2. Create Sales/Partnership proposal using the framework
3. Start logging jobs in the calculator
4. Track on business dashboard

**For each customer job:**
1. Run quote calculator (know your margin)
2. Send customized Service Agreement (protect yourself)
3. Log in dashboard after completion
4. Review dashboard weekly for business health

---

## Key Principles

**Universal > Specific**
- These tools work for CivilitySync, land stewardship, surveying, construction monitoring, or anything else you decide to do
- Don't rebuild for each division; parameterize and extend

**Simple > Complex**
- Google Sheets > custom dashboards
- CSV logs > databases
- Templates > custom systems

**One metric per stage**
- Early: jobs completed + revenue
- Growth: gross margin + customer acquisition cost
- Scale: MRR + churn

---

## Customization

All files are starting points. Customize:
- Cost assumptions in quote calculator
- Service agreement terms for your state/industry
- Dashboard metrics for your business model
- Partnership framework for your verticals

---

## Next Steps

1. **Read** LLC_BUSINESS_STRUCTURE.md
2. **Verify** Operations Checklist items
3. **Customize** Service Agreement for your LLC
4. **Create** Google Sheets dashboard (copy formulas from BUSINESS_DASHBOARD_SETUP.md)
5. **Run** quote calculator for your first job (test it works)

Then start selling.

---

*This toolkit serves Marcus Jay Herring LLC and all current/future divisions.*
