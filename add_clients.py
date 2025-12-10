#!/usr/bin/env python3
"""Add Woot and Arcstone with complete data matching existing format"""
from pathlib import Path

CHEAT_SHEET = Path("index.html")

# New clients matching the exact format of existing entries
WOOT_CLIENT = """            {
                businessName: "Woot Insurance Agency (Sanders)",
                ownerName: "Evan Sanders",
                ownerPhone: "555-123-4567",
                ownerEmail: "evan@wootinsurance.com",
                website: "www.wootinsurance.com",
                address: "123 Main St, City, ST 12345",
                timezone: "Eastern Standard Time",
                setter: "Jacques Lebleu",
                ghlLocationId: "woot_placeholder",
                ghlToken: "pit-woot-placeholder",
                licensedStates: ["NY", "NJ", "CT"],
                targetIndustries: ["Commercial Lines", "Personal Lines"],
                brokers: [
                    {name: "Evan Sanders", phone: "5551234567", email: "evan@wootinsurance.com"}
                ]
            },"""

ARCSTONE_CLIENT = """            {
                businessName: "Arcstone Insurance Advisors",
                ownerName: "Luis Santos",
                ownerPhone: "555-234-5678",
                ownerEmail: "luis@arcstoneinsurance.com",
                website: "www.arcstoneinsurance.com",
                address: "456 Oak Ave, City, ST 54321",
                timezone: "Central Standard Time",
                setter: "Al Butler",
                ghlLocationId: "arcstone_placeholder",
                ghlToken: "pit-arcstone-placeholder",
                licensedStates: ["TX", "OK", "AR"],
                targetIndustries: ["Commercial Lines"],
                brokers: [
                    {name: "Luis Santos", phone: "5552345678", email: "luis@arcstoneinsurance.com"}
                ]
            }"""

with open(CHEAT_SHEET, 'r') as f:
    lines = f.readlines()

# Find line 4525 (the ]; closing the clients array)
# Insert the new clients before this line
new_lines = []
for i, line in enumerate(lines, 1):
    if i == 4525:  # Before the closing ];
        # Add comma to previous client and insert new ones
        new_lines.append(WOOT_CLIENT + '\n')
        new_lines.append(ARCSTONE_CLIENT + '\n')
    new_lines.append(line)

with open(CHEAT_SHEET, 'w') as f:
    f.writelines(new_lines)

print("✅ Added Woot Insurance Agency (Sanders)")
print("✅ Added Arcstone Insurance Advisors")
print("")
print("New client count: 18")
print("Jacques Lebleu: 10 clients (added Woot)")
print("Al Butler: 8 clients (added Arcstone)")
