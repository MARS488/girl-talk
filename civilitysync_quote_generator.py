#!/usr/bin/env python3
"""
CivilitySync Quote Generator
Converts property size + service type into a quote with margin analysis.
"""

from dataclasses import dataclass
from typing import Optional, Dict, Tuple
from datetime import datetime
import json

@dataclass
class ServiceTier:
    name: str
    base_price: float
    acres_start: float
    acres_end: float
    description: str

# Service tiers by vertical
STORM_REBUILD_TIERS = [
    ServiceTier("Quick Look", 500, 0, 1, "Single property aerial assessment + basic report"),
    ServiceTier("Full Assessment", 1500, 1, 5, "Complete damage documentation + before/after analysis"),
    ServiceTier("Neighborhood Sweep", 3000, 5, 20, "Multi-property storm survey + prioritized report"),
    ServiceTier("HOA/Subdivision", 5000, 20, 500, "Full neighborhood assessment + coordination support"),
]

LIDAR_TIERS = [
    ServiceTier("Desktop Screening", 800, 0, 5, "Free data analysis (USGS 3DEP + NWI) + 1-page report"),
    ServiceTier("Small Site LiDAR", 2500, 5, 25, "Drone LiDAR capture + basic processing"),
    ServiceTier("Medium Site LiDAR", 6000, 25, 100, "Full LiDAR + advanced processing + boundary mapping"),
    ServiceTier("Large Site LiDAR", 12000, 100, 1000, "Survey-grade LiDAR + certify-ready deliverables"),
]

COSTS = {
    "your_time_per_hour": 75,  # billable rate
    "flight_hours_per_acre": 0.25,  # rough estimate
    "travel_cost": 50,  # standard per-job
    "battery_wear_per_flight": 30,  # DJI batteries ~500 cycles, $150/battery
    "software_monthly": 50,  # averaged per job
    "processing_time_per_hour": 40,  # your processing time
    "lidar_rental_per_day": 700,  # DJI M350 RTK + Zenmuse L2
    "lidar_processing_outsource": 1500,  # flat fee for small site
}

@dataclass
class Quote:
    vertical: str
    property_size_acres: float
    tier_name: str
    price: float
    cost_breakdown: Dict[str, float]
    total_cost: float
    gross_margin: float
    margin_percent: float
    deposit_recommended: float
    notes: str

def calculate_costs(vertical: str, acres: float) -> Tuple[Dict[str, float], float]:
    """Calculate job costs based on vertical and property size."""
    costs = {}

    if vertical == "storm":
        flight_hours = max(1, acres * COSTS["flight_hours_per_acre"])
        costs["flight_time"] = flight_hours * COSTS["your_time_per_hour"]
        costs["travel"] = COSTS["travel_cost"]
        costs["battery_wear"] = COSTS["battery_wear_per_flight"]
        costs["software_allocation"] = COSTS["software_monthly"]
        costs["processing"] = 1.5 * COSTS["processing_time_per_hour"]  # 1.5 hrs typical
        total = sum(costs.values())

    elif vertical == "lidar":
        # LiDAR jobs have different costs
        # Use outsourced processing for small sites
        if acres <= 25:
            costs["rental_allocation"] = COSTS["lidar_rental_per_day"] * 0.5  # half day
            costs["processing_outsource"] = COSTS["lidar_processing_outsource"]
            costs["travel"] = COSTS["travel_cost"]
        else:
            # Larger sites spread rental cost over multiple acres
            rental_days = max(1, acres / 250)  # 250 acres/day typical
            costs["rental_allocation"] = COSTS["lidar_rental_per_day"] * rental_days
            costs["processing_outsource"] = COSTS["lidar_processing_outsource"] * (acres / 50)
            costs["travel"] = COSTS["travel_cost"]
        total = sum(costs.values())
    else:
        total = 0

    return costs, total

def find_tier(vertical: str, acres: float) -> Optional[ServiceTier]:
    """Find appropriate tier for property size."""
    tiers = STORM_REBUILD_TIERS if vertical == "storm" else LIDAR_TIERS
    for tier in tiers:
        if tier.acres_start <= acres < tier.acres_end:
            return tier
    return tiers[-1]  # Default to highest tier if over max

def generate_quote(vertical: str, acres: float, override_price: Optional[float] = None) -> Quote:
    """Generate a quote with full cost breakdown."""
    tier = find_tier(vertical, acres)
    price = override_price or tier.base_price

    costs, total_cost = calculate_costs(vertical, acres)
    gross_margin = price - total_cost
    margin_percent = (gross_margin / price * 100) if price > 0 else 0

    # Deposit = cost + small buffer for LiDAR jobs (which have upfront rental)
    deposit_recommended = total_cost * 1.1 if vertical == "lidar" else 0

    # Generate notes based on margin health
    notes = ""
    if margin_percent < 30:
        notes = "⚠️ Margin is thin. Consider upselling or bundling with another service."
    elif margin_percent < 50:
        notes = "✓ Healthy margin. Good tier."
    else:
        notes = "✓✓ Strong margin. Consider this a repeatable pricing level."

    if vertical == "lidar" and deposit_recommended > 0:
        notes += f"\nDeposit required: ${deposit_recommended:.0f} (covers rental + outsourced processing)"

    return Quote(
        vertical=vertical,
        property_size_acres=acres,
        tier_name=tier.name,
        price=price,
        cost_breakdown=costs,
        total_cost=total_cost,
        gross_margin=gross_margin,
        margin_percent=margin_percent,
        deposit_recommended=deposit_recommended,
        notes=notes
    )

def format_quote_for_proposal(quote: Quote) -> str:
    """Format quote as a clean proposal section."""
    lines = [
        f"## Quote: {quote.tier_name}",
        f"**Property Size:** {quote.property_size_acres} acres",
        f"**Service:** {quote.vertical.title()} | {quote.tier_name}",
        f"",
        f"**Price:** ${quote.price:,.2f}",
    ]

    if quote.deposit_recommended > 0:
        lines.append(f"**Deposit Required:** ${quote.deposit_recommended:,.2f}")

    lines.extend([
        f"",
        f"### What's Included",
        f"- Aerial assessment and data capture",
        f"- Report generation and delivery",
        f"- Revision round (1)",
        f"",
        f"### Timeline",
        f"- Scheduling: within 5 business days",
        f"- Flight: weather dependent",
        f"- Delivery: within 48 hours of flight",
    ])

    return "\n".join(lines)

def format_cost_breakdown(quote: Quote) -> str:
    """Format cost breakdown for internal reference."""
    lines = [
        f"=== COST BREAKDOWN (Internal) ===",
        f"Vertical: {quote.vertical.upper()} | Property: {quote.property_size_acres} acres",
        f"",
    ]

    for cost_item, amount in quote.cost_breakdown.items():
        lines.append(f"  {cost_item.replace('_', ' ').title():<30} ${amount:>8,.2f}")

    lines.extend([
        f"  {'':30} -----------",
        f"  {'Total Cost':<30} ${quote.total_cost:>8,.2f}",
        f"",
        f"  {'Selling Price':<30} ${quote.price:>8,.2f}",
        f"  {'Gross Margin':<30} ${quote.gross_margin:>8,.2f}",
        f"  {'Margin %':<30} {quote.margin_percent:>8.1f}%",
        f"",
        f"Notes: {quote.notes}",
    ])

    return "\n".join(lines)

if __name__ == "__main__":
    import sys

    if len(sys.argv) < 3:
        print("Usage: civilitysync_quote_generator.py <vertical> <acres> [price_override]")
        print("  vertical: 'storm' or 'lidar'")
        print("  acres: property size in acres")
        print("  price_override: (optional) custom price to evaluate margin")
        print("")
        print("Example: ./civilitysync_quote_generator.py storm 3")
        print("         ./civilitysync_quote_generator.py lidar 15 5000")
        sys.exit(1)

    vertical = sys.argv[1].lower()
    acres = float(sys.argv[2])
    override_price = float(sys.argv[3]) if len(sys.argv) > 3 else None

    if vertical not in ["storm", "lidar"]:
        print("Error: vertical must be 'storm' or 'lidar'")
        sys.exit(1)

    quote = generate_quote(vertical, acres, override_price)

    print(format_quote_for_proposal(quote))
    print("")
    print(format_cost_breakdown(quote))
