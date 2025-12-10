#!/usr/bin/env python3
"""Remove Premier Group Insurance (LOST status)"""
import re
from pathlib import Path

CHEAT_SHEET = Path("index.html")

print("🗑️  REMOVING PREMIER GROUP INSURANCE (LOST STATUS)")
print("=" * 70)

with open(CHEAT_SHEET, 'r') as f:
    content = f.read()

# Count before
clients_before = len(re.findall(r'businessName:\s*"([^"]+)"', content))
print(f"Clients before: {clients_before}")

# Find and remove the entire Premier Group Insurance block
# Match from the opening brace to the closing brace including all content
premier_pattern = r',?\s*\{\s*businessName:\s*"Premier Group Insurance"[^}]*(?:\{[^}]*\}[^}]*)*\}'

# Try to find it first
if re.search(premier_pattern, content):
    print("✅ Found Premier Group Insurance block")
    content_fixed = re.sub(premier_pattern, '', content, count=1)
else:
    print("⚠️  Using alternative removal method")
    # Alternative: Find the block more carefully
    lines = content.split('\n')
    new_lines = []
    skip_until = None
    inside_premier = False
    brace_count = 0

    for i, line in enumerate(lines):
        if 'businessName: "Premier Group Insurance"' in line:
            inside_premier = True
            # Go back to find the opening brace
            j = i - 1
            while j >= 0:
                if '{' in new_lines[len(new_lines) - (i - j)]:
                    # Remove the opening brace line if it's just a brace
                    if new_lines[len(new_lines) - (i - j)].strip() in ['{', ',{', '},']:
                        new_lines.pop()
                    break
                j -= 1
            continue

        if inside_premier:
            # Count braces to find the end of this object
            brace_count += line.count('{') - line.count('}')
            if brace_count <= 0 and '}' in line:
                inside_premier = False
                # Skip the closing brace and comma
                continue
            continue

        new_lines.append(line)

    content_fixed = '\n'.join(new_lines)

# Count after
clients_after = len(re.findall(r'businessName:\s*"([^"]+)"', content_fixed))
print(f"Clients after: {clients_after}")

if clients_after == clients_before - 1:
    with open(CHEAT_SHEET, 'w') as f:
        f.write(content_fixed)
    print(f"\n✅ Successfully removed Premier Group Insurance")
    print(f"   Before: {clients_before} clients")
    print(f"   After: {clients_after} clients")
    print(f"   Expected: 19 (18 active + 1 onboarding)")
else:
    print(f"\n❌ Removal failed or unexpected count")
    print(f"   Before: {clients_before}")
    print(f"   After: {clients_after}")
