#!/usr/bin/env python3

from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak
from reportlab.lib.enums import TA_LEFT, TA_CENTER
from reportlab.lib.colors import HexColor
import os

# Read the text report
with open('/Users/nicktoma/Desktop/Cheat-Sheet-Merge-Analysis.txt', 'r') as f:
    content = f.read()

# Create PDF
pdf_path = '/Users/nicktoma/Desktop/Cheat-Sheet-Merge-Analysis.pdf'
doc = SimpleDocTemplate(pdf_path, pagesize=letter,
                        rightMargin=0.5*inch, leftMargin=0.5*inch,
                        topMargin=0.5*inch, bottomMargin=0.5*inch)

# Styles
styles = getSampleStyleSheet()

title_style = ParagraphStyle(
    'CustomTitle',
    parent=styles['Heading1'],
    fontSize=16,
    textColor=HexColor('#1a1a1a'),
    spaceAfter=12,
    alignment=TA_CENTER,
    fontName='Helvetica-Bold'
)

heading_style = ParagraphStyle(
    'CustomHeading',
    parent=styles['Heading2'],
    fontSize=12,
    textColor=HexColor('#2c3e50'),
    spaceAfter=8,
    spaceBefore=12,
    fontName='Helvetica-Bold'
)

subheading_style = ParagraphStyle(
    'CustomSubHeading',
    parent=styles['Heading3'],
    fontSize=10,
    textColor=HexColor('#34495e'),
    spaceAfter=6,
    spaceBefore=8,
    fontName='Helvetica-Bold'
)

body_style = ParagraphStyle(
    'CustomBody',
    parent=styles['BodyText'],
    fontSize=9,
    textColor=HexColor('#2c3e50'),
    fontName='Courier',
    leftIndent=10,
    spaceAfter=4
)

verdict_style = ParagraphStyle(
    'VerdictStyle',
    parent=styles['BodyText'],
    fontSize=11,
    textColor=HexColor('#27ae60'),
    fontName='Helvetica-Bold',
    spaceAfter=8,
    alignment=TA_CENTER
)

warning_style = ParagraphStyle(
    'WarningStyle',
    parent=styles['BodyText'],
    fontSize=10,
    textColor=HexColor('#e74c3c'),
    fontName='Helvetica-Bold',
    spaceAfter=8,
    alignment=TA_CENTER
)

# Build story
story = []

# Title
story.append(Paragraph("CHEAT SHEET DATA MERGE", title_style))
story.append(Paragraph("DRY-RUN PREVIEW ANALYSIS", title_style))
story.append(Paragraph("⚠️ NO CHANGES APPLIED YET ⚠️", warning_style))
story.append(Spacer(1, 0.3*inch))

# Executive Summary
story.append(Paragraph("📊 EXECUTIVE SUMMARY", heading_style))
story.append(Paragraph("Total Clients Analyzed: <b>13</b>", body_style))
story.append(Paragraph("Clients Matched: <b>13/13 (100%)</b>", body_style))
story.append(Paragraph("Real Changes Needed: <b>0</b>", body_style))
story.append(Spacer(1, 0.2*inch))

story.append(Paragraph("✅ VERDICT: Your cheat sheet is ALREADY COMPLETE!", verdict_style))
story.append(Spacer(1, 0.1*inch))

story.append(Paragraph("The only 'differences' detected are typos in the source JSON:", body_style))
story.append(Paragraph("• 'WISCONSIN' instead of 'WI' (duplicate state)", body_style))
story.append(Paragraph("• 'Commercail' instead of 'Commercial' (spelling error)", body_style))
story.append(Paragraph("• 'Residental' instead of 'Residential' (spelling error)", body_style))
story.append(Paragraph("• 'Eletrical' instead of 'Electrical' (spelling error)", body_style))
story.append(Spacer(1, 0.3*inch))

# Detected Issues
story.append(Paragraph("DETECTED 'ADDITIONS' (All are typos - ignore)", heading_style))
story.append(Spacer(1, 0.2*inch))

# Client 1
story.append(Paragraph("CLIENT 1: WEER INSURANCE AND FINANCIAL SERVICES, INC", subheading_style))
story.append(Paragraph("<b>🗺️ Licensed States Issue:</b> Duplicate State Entry", body_style))
story.append(Paragraph("Current in cheat sheet: CA, FL, GA, IL, IN, OH, TX, WI (8 states)", body_style))
story.append(Paragraph("❌ JSON wants to add: 'WISCONSIN'", body_style))
story.append(Paragraph("⚠️ Analysis: Wisconsin already exists as 'WI' (2-letter code)", body_style))
story.append(Paragraph("✅ Recommendation: Ignore - not a real addition", body_style))
story.append(Spacer(1, 0.1*inch))

story.append(Paragraph("<b>🎯 Target Industries Issue:</b> Spelling Error", body_style))
story.append(Paragraph("❌ JSON has typo: 'Commercail' instead of 'Commercial'", body_style))
story.append(Paragraph("✅ Recommendation: Ignore - just a typo", body_style))
story.append(Spacer(1, 0.2*inch))

# Client 2
story.append(Paragraph("CLIENT 2: Koosh Insurance", subheading_style))
story.append(Paragraph("<b>🎯 Target Industries Issue:</b> Spelling Error", body_style))
story.append(Paragraph("Current: 'Residential Real Estate'", body_style))
story.append(Paragraph("❌ JSON has typo: 'Residental Real Estate'", body_style))
story.append(Paragraph("✅ Recommendation: Ignore - just a typo", body_style))
story.append(Spacer(1, 0.2*inch))

# Client 3
story.append(Paragraph("CLIENT 3: UWIB Risk Inc", subheading_style))
story.append(Paragraph("<b>🎯 Target Industries Issue:</b> Spelling Error", body_style))
story.append(Paragraph("Current: 'Artisan Contractors (HVAC, Plumbing, Electrical, Roofing, Etc)'", body_style))
story.append(Paragraph("❌ JSON has typo: 'Eletrical' instead of 'Electrical'", body_style))
story.append(Paragraph("✅ Recommendation: Ignore - just a typo", body_style))
story.append(Spacer(1, 0.3*inch))

# Other Clients
story.append(Paragraph("ALL OTHER CLIENTS (10 clients)", heading_style))
story.append(Paragraph("✅ NO CHANGES - Data already matches perfectly:", body_style))
story.append(Spacer(1, 0.1*inch))
other_clients = [
    "The Bulow Group, Inc",
    "GRIT Insurance",
    "Ingram Insurance Agency, LLC",
    "Arroyo Insurance Services - South Bay",
    "STATE FARM - TIM MAUDSLEY AGENT",
    "PRIME INSURANCE SERVICES",
    "Allee Agency Inc.",
    "Insurable, Inc.",
    "IMD INSURANCE & Financial Services LLC",
    "Eastman Risk Advisors"
]
for client in other_clients:
    story.append(Paragraph(f"• {client}", body_style))

story.append(Spacer(1, 0.3*inch))

# Field Breakdown
story.append(Paragraph("FIELD-BY-FIELD BREAKDOWN", heading_style))
story.append(Paragraph("<b>Licensed States:</b> 1 flagged (duplicate: WISCONSIN=WI) → Real additions: 0", body_style))
story.append(Paragraph("<b>Target Industries:</b> 3 flagged (all typos) → Real additions: 0", body_style))
story.append(Paragraph("<b>Team Members:</b> 0 flagged → Real additions: 0", body_style))
story.append(Spacer(1, 0.3*inch))

# Final Verdict
story.append(Paragraph("🎉 FINAL VERDICT", heading_style))
story.append(Paragraph("NO MERGE NEEDED", verdict_style))
story.append(Spacer(1, 0.1*inch))
story.append(Paragraph("Your cheat-sheet-v2.html already contains ALL information from the onboarding-data.json file.", body_style))
story.append(Paragraph("The only differences are typos in the JSON source, not missing data.", body_style))
story.append(Spacer(1, 0.2*inch))
story.append(Paragraph("<b>RECOMMENDATIONS:</b>", body_style))
story.append(Paragraph("✅ Keep your cheat sheet as-is (no changes needed)", body_style))
story.append(Paragraph("✅ Optionally fix typos in JSON source for consistency", body_style))
story.append(Spacer(1, 0.5*inch))

# Footer
story.append(Paragraph("───────────────────────────────────────────────────", body_style))
story.append(Paragraph("Generated: 2025-10-10 | Status: DRY-RUN PREVIEW (No files modified)", body_style))

# Build PDF
doc.build(story)

print(f"✅ PDF created successfully: {pdf_path}")
