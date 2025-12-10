#!/usr/bin/env python3
"""Verify all 18 clients have onboarding form data"""
from pathlib import Path
import json
import re

CHEAT_SHEET = Path("index.html")

print("=" * 70)
print("📋 ONBOARDING FORM VERIFICATION")
print("=" * 70)

# List of all 18 active clients (excluding RocketFlood)
REQUIRED_CLIENTS = [
    "Maudsley Insurance",
    "Gerety Insurance",
    "Arroyo Insurance",
    "Prime",
    "Insurance Express",
    "Allee",
    "Koosh Insurance",
    "UWIB",
    "Insurable",
    "IMD INSURANCE",
    "Eastman Risk",
    "Woot Insurance",
    "WEER INSURANCE",
    "Bulow",
    "GRIT Insurance",
    "Huneycutt",
    "Arcstone Insurance",
    "Ingram Insurance"
]

with open(CHEAT_SHEET, 'r') as f:
    content = f.read()

# Extract all business names
business_names = re.findall(r'businessName:\s*"([^"]+)"', content)

print(f"\n📊 Found {len(business_names)} clients in cheat sheet\n")
print("-" * 70)

missing_data = []
complete_clients = []
placeholder_data = []

for i, name in enumerate(business_names, 1):
    print(f"\n{i}. {name}")

    # Find the client block
    pattern = r'businessName: "' + re.escape(name) + r'".*?(?=businessName:|};)'
    match = re.search(pattern, content, re.DOTALL)

    if match:
        client_block = match.group()

        # Check for critical onboarding data
        has_owner = 'ownerName:' in client_block and 'ownerName: ""' not in client_block
        has_real_phone = 'ownerPhone:' in client_block and '555-' not in client_block
        has_email = 'ownerEmail:' in client_block and 'ownerEmail: ""' not in client_block
        has_states = 'licensedStates:' in client_block and 'licensedStates: []' not in client_block
        has_industries = 'targetIndustries:' in client_block and 'targetIndustries: []' not in client_block
        has_timezone = 'timezone:' in client_block and 'timezone: ""' not in client_block
        has_real_address = 'address:' in client_block and not any(x in client_block for x in ['123 Main St', '456 Oak Ave', 'address: ""'])
        has_ghl_location = 'ghlLocationId:' in client_block and 'placeholder' not in client_block
        has_brokers = 'brokers: [' in client_block and 'brokers: []' not in client_block

        # Check if using placeholder data
        is_placeholder = '555-' in client_block or 'placeholder' in client_block or '123 Main St' in client_block or '456 Oak Ave' in client_block

        missing = []
        if not has_owner: missing.append("owner name")
        if not has_real_phone: missing.append("real phone")
        if not has_email: missing.append("email")
        if not has_states: missing.append("licensed states")
        if not has_industries: missing.append("target industries")
        if not has_timezone: missing.append("timezone")
        if not has_real_address: missing.append("real address")
        if not has_ghl_location: missing.append("GHL location ID")
        if not has_brokers: missing.append("broker/team info")

        if is_placeholder:
            placeholder_data.append(name)
            print(f"   ⚠️  PLACEHOLDER DATA - needs real onboarding info")
        elif missing:
            missing_data.append((name, missing))
            print(f"   ⚠️  MISSING: {', '.join(missing)}")
        else:
            complete_clients.append(name)
            print(f"   ✅ COMPLETE")

print("\n" + "=" * 70)
print("📊 SUMMARY")
print("=" * 70)
print(f"Complete with onboarding data: {len(complete_clients)}/18")
print(f"Using placeholder data: {len(placeholder_data)}/18")
print(f"Missing critical data: {len(missing_data)}/18")

if placeholder_data:
    print("\n⚠️  CLIENTS WITH PLACEHOLDER DATA (need real onboarding forms):")
    for client in placeholder_data:
        print(f"  - {client}")

if missing_data:
    print("\n⚠️  CLIENTS MISSING DATA:")
    for client, missing in missing_data:
        print(f"  - {client}: needs {', '.join(missing)}")

print("\n" + "=" * 70)
