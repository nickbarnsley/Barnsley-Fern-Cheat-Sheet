#!/usr/bin/env node

/**
 * Generate comprehensive comparison report
 * Shows exactly what would be added from onboarding-data.json to cheat sheet
 */

const fs = require('fs');
const path = require('path');

// Load onboarding JSON data
const jsonData = JSON.parse(fs.readFileSync('onboarding-data.json', 'utf8'));

// Existing cheat sheet data (extracted from HTML)
const cheatSheetClients = {
    "The Bulow Group, Inc": {
        licensedStates: ["IL"],
        targetIndustries: ["Restaurant Groups", "Construction", "Hardware Stores", "Manufacturing/Food Distributors", "Waste Haulers & Garbage"],
        brokers: [
            {name: "Nick Hogevenn", phone: "", email: ""},
            {name: "Tom DeMatteo", phone: "", email: ""},
            {name: "Bobby Daw", phone: "", email: ""},
            {name: "Rob Randick", phone: "", email: ""}
        ]
    },
    "GRIT Insurance": {
        licensedStates: ["UT", "ID", "CO", "AZ", "TX", "OR", "WA", "CA", "MT", "NV", "ND", "WY"],
        targetIndustries: ["Commercial Contractors", "Landscape Contractors", "Excavation Contractors", "Manufacturing"],
        brokers: [
            {name: "Kirk Chester", phone: "801-948-8091", email: "Kirk@gritinsurance.com"},
            {name: "Justin Peterson", phone: "801-948-8090", email: "Justin@gritinsurance.com"},
            {name: "Easton Rentmeister", phone: "801-948-8092", email: "Easton@gritinsurance.com"}
        ]
    },
    "Ingram Insurance Agency, LLC": {
        licensedStates: ["NH", "UT", "WY", "AL", "AR", "DE", "FL", "GA", "ID", "IL", "IN", "IA", "KY", "MD", "MN", "MS", "NV", "OH", "OK", "OR", "PA", "SC", "TN", "TX", "VA", "WA", "CO"],
        targetIndustries: ["Artisan Contractor, NO General Contractors", "Restaurants", "Professional Services - anything in an office", "HVAC/ELEC/PLUMBING Contractors", "WORK COMP - All classes"],
        brokers: [
            {name: "Chris Ingram", phone: "615-675-5154", email: ""}
        ]
    },
    "WEER INSURANCE AND FINANCIAL SERVICES, INC": {
        licensedStates: ["IL", "IN", "WI", "OH", "FL", "CA", "TX", "GA"],
        targetIndustries: ["Artisian & General Contractors", "Real Estate Investors - Appartment Buildings, Commercial Strip Centers, Condo Associations", "Restaurants", "Bars - only in IL & WI", "Commercial Auto"],
        brokers: [
            {name: "Tiffany Trevino", phone: "8472781099 ext 104", email: "tiffany@weeryouragent.com"},
            {name: "Steve Gallardo", phone: "8472781099 ext 102", email: "steve@weeryouragent.com"},
            {name: "Sherrie Hurley", phone: "8472781099 ext", email: "sherrie@weeryouragent.com"},
            {name: "Kasia Biedrawa", phone: "8472781099 ext 105", email: "kasia@weeryouragent.com"}
        ]
    },
    "Arroyo Insurance Services - South Bay": {
        licensedStates: ["CA"],
        targetIndustries: ["Wholesale Distribution", "Manufacturing", "Commercial Real Estate - Industrial, Shopping Centers, Apartments, Property Managers", "Construction - Solar, Roofing, Plumbing, HVAC", "Hospitality - Restaurants, Bar/Tavern"],
        brokers: [
            {name: "Robert Kelly", phone: "3103568206", email: "robertk@arroyoins.com"},
            {name: "Ryan McDonald", phone: "4243985624", email: "ryanm@arroyoins.com"},
            {name: "Seamus McDonald", phone: "3103568214", email: "seamusm@arroyoins.com"},
            {name: "William Dessert", phone: "3103568210", email: "williamd@arroyoins.com"}
        ]
    },
    "STATE FARM - TIM MAUDSLEY AGENT": {
        licensedStates: ["NV"],
        targetIndustries: ["ARTISAN SERVICE CONTRACTORS", "HOMEOWNERS ASSOCIATIONS", "RESTAURANTS", "AUTO REPAIR", "LESSOR RISK - BUILDING OWNERS"],
        brokers: [
            {name: "KADEN MAALOUF", phone: "7029984545", email: "KADEN.MAALOUF.VADRFZ@STATEFARM.COM"},
            {name: "JEREMY WINCHESTER", phone: "7029984545", email: "JEREMY.WINCHESTER.VAB79Y@STATEFARM.COM"},
            {name: "GABRIELA ANDRADE", phone: "7029984545", email: "GABRIELA.ANDRADE.VADYCA@STATEFARM.COM"}
        ]
    },
    "PRIME INSURANCE SERVICES": {
        licensedStates: ["NJ", "NY", "PA", "TX", "CA", "CT", "FL"],
        targetIndustries: ["CONSTRUCTION", "RESTAURANTS", "BUILDINGS / LESSORS RISK", "WHOLESALER/MFG", "Builder's Risk"],
        brokers: [
            {name: "MIN CHOI", phone: "2012854123", email: "MIN@PRIMEISERVICES.COM"}
        ]
    },
    "Allee Agency Inc.": {
        licensedStates: ["AL", "AZ", "CA", "CO", "GA", "KY", "MD", "MS", "MO", "NE", "TN", "TX", "UT", "VA"],
        targetIndustries: ["Construction", "Restaurants", "Retail - Main Street", "PROPERTY - LRO", "PRIVATE PRACTICE Doctors/Dentists"],
        brokers: [
            {name: "Ryan Allee", phone: "6157175652", email: "ryan@alleeins.com"},
            {name: "Will Rogers", phone: "6156648321", email: "will@alleeins.com"},
            {name: "Jim McKee", phone: "6153770017", email: "jim@alleeins.com"},
            {name: "Rayneshia Dawkins", phone: "6157169945", email: "rayneshia@alleeins.com"}
        ]
    },
    "Koosh Insurance": {
        licensedStates: ["FL"],
        targetIndustries: ["Commercial Real Estate", "Residential Real Estate", "Restaurants", "Construction", "Hotels"],
        brokers: [
            {name: "Itay Sela", phone: "9544956965", email: "itai@koosh-ins.com"}
        ]
    },
    "UWIB Risk Inc": {
        licensedStates: ["TN"],
        targetIndustries: ["Artisan Contractors (HVAC, Plumbing, Electrical, Roofing, Etc)", "Restaurants", "Manufacturing", "Property Manager"],
        brokers: [
            {name: "Eric Schirding", phone: "6265785154", email: "eschirding@uwib.com"},
            {name: "Jesse Nielsen", phone: "6262046983", email: "jesse@uwib.com"},
            {name: "David Murphy", phone: "(951) 462-2405", email: "david@uwib.com"}
        ]
    },
    "Insurable, Inc.": {
        licensedStates: ["PA"],
        targetIndustries: ["Construction-Artisan", "Workers Comp", "Machine Shops", "Physical fitness facilities GYMS", "Auto Body and Mechanical Shops"],
        brokers: [
            {name: "Sharie Castle", phone: "(412) 244-1000", email: "SCastle@InsurableInc.com"},
            {name: "Ron Minnich", phone: "(412) 244-1000", email: "RMinnich@InsurableInc.com"},
            {name: "Brian Bortz", phone: "(412) 244-1000", email: "Brian@InsurableInc.com"}
        ]
    },
    "IMD INSURANCE & Financial Services LLC": {
        licensedStates: ["TX", "IL", "CA"],
        targetIndustries: ["Construction", "R.E Investors Commercial (Multifamily)", "Professional Services - Attorneys", "MSP's", "Restaurants"],
        brokers: [
            {name: "Jose Aleman", phone: "+50584758462", email: "jose@imdins.com"},
            {name: "Marlon Hazsuel", phone: "+50558105735", email: "marlon@imdins.com"}
        ]
    },
    "Eastman Risk Advisors": {
        licensedStates: ["UT"],
        targetIndustries: ["Commercial property", "Electricians", "Plumbers", "HVAC", "Lube/oil shops"],
        brokers: [
            {name: "Caleb Beickel", phone: "8018880550", email: "Caleb@Eastmanrisk.com"},
            {name: "Maddy Beickel", phone: "8018880550", email: "Maddy@Eastmanrisk.com"},
            {name: "Isabella Brown", phone: "8018880550", email: "Bella@Eastmanrisk.com"},
            {name: "Mari Higuera", phone: "8018880550", email: "Mari@Eastmanrisk.com"}
        ]
    }
};

// State name to code mapping
const stateMap = {
    'utah': 'UT', 'idaho': 'ID', 'colorado': 'CO', 'arizona': 'AZ', 'texas': 'TX',
    'oregon': 'OR', 'washington': 'WA', 'california': 'CA', 'montana': 'MT',
    'nevada': 'NV', 'north dakota': 'ND', 'wyoming': 'WY', 'new hampshire': 'NH',
    'alabama': 'AL', 'arkansas': 'AR', 'delaware': 'DE', 'florida': 'FL',
    'georgia': 'GA', 'illinois': 'IL', 'indiana': 'IN', 'iowa': 'IA',
    'kentucky': 'KY', 'maryland': 'MD', 'minnesota': 'MN', 'mississippi': 'MS',
    'ohio': 'OH', 'oklahoma': 'OK', 'pennsylvania': 'PA', 'south carolina': 'SC',
    'tennessee': 'TN', 'virginia': 'VA', 'missouri': 'MO', 'nebraska': 'NE',
    'connecticut': 'CT', 'new york': 'NY', 'new jersey': 'NJ'
};

function normalizeStateName(state) {
    const lower = state.toLowerCase().trim();
    return stateMap[lower] || state.toUpperCase();
}

function normalizePhone(phone) {
    return (phone || '').replace(/\D/g, '');
}

function normalizeBrokerName(name) {
    return (name || '').toLowerCase().trim();
}

// Generate comparison
const report = [];
let totalStateAdditions = 0;
let totalIndustryAdditions = 0;
let totalBrokerAdditions = 0;

for (const jsonClient of jsonData.clients) {
    const cheatClient = cheatSheetClients[jsonClient.businessName];

    if (!cheatClient) {
        report.push({
            client: jsonClient.businessName,
            status: 'NOT_FOUND',
            message: 'Client not found in cheat sheet'
        });
        continue;
    }

    const additions = {
        client: jsonClient.businessName,
        status: 'MATCHED',
        states: { before: [], after: [], additions: [] },
        industries: { before: [], after: [], additions: [] },
        brokers: { before: [], after: [], additions: [] }
    };

    // Compare States
    const existingStates = new Set(cheatClient.licensedStates.map(s => s.toUpperCase()));
    additions.states.before = [...cheatClient.licensedStates].sort();

    if (jsonClient.licensedStates && jsonClient.licensedStates.length > 0) {
        const jsonStates = jsonClient.licensedStates.map(normalizeStateName);
        jsonStates.forEach(state => {
            if (!existingStates.has(state)) {
                additions.states.additions.push(state);
                totalStateAdditions++;
            }
        });
        additions.states.after = [...new Set([...cheatClient.licensedStates, ...additions.states.additions])].sort();
    } else {
        additions.states.after = additions.states.before;
    }

    // Compare Industries
    const existingIndustries = new Set(cheatClient.targetIndustries.map(i => i.toLowerCase().trim()));
    additions.industries.before = [...cheatClient.targetIndustries];

    if (jsonClient.targetIndustries && jsonClient.targetIndustries.length > 0) {
        jsonClient.targetIndustries.forEach(industry => {
            if (!existingIndustries.has(industry.toLowerCase().trim())) {
                additions.industries.additions.push(industry);
                totalIndustryAdditions++;
            }
        });
        additions.industries.after = [...cheatClient.targetIndustries, ...additions.industries.additions];
    } else {
        additions.industries.after = additions.industries.before;
    }

    // Compare Brokers
    additions.brokers.before = cheatClient.brokers.map(b => b.name);

    if (jsonClient.brokers && jsonClient.brokers.length > 0) {
        jsonClient.brokers.forEach(jsonBroker => {
            const jsonPhone = normalizePhone(jsonBroker.phone);
            const jsonEmail = (jsonBroker.email || '').toLowerCase().trim();
            const jsonName = normalizeBrokerName(jsonBroker.name);

            const exists = cheatClient.brokers.some(existingBroker => {
                const existingPhone = normalizePhone(existingBroker.phone);
                const existingEmail = (existingBroker.email || '').toLowerCase().trim();
                const existingName = normalizeBrokerName(existingBroker.name);

                // Match by email
                if (jsonEmail && existingEmail && jsonEmail === existingEmail) return true;

                // Match by phone (last 10 digits)
                if (jsonPhone.length >= 10 && existingPhone.length >= 10) {
                    if (jsonPhone.slice(-10) === existingPhone.slice(-10)) return true;
                }

                // Match by name
                if (jsonName === existingName) return true;

                return false;
            });

            if (!exists) {
                additions.brokers.additions.push(jsonBroker);
                totalBrokerAdditions++;
            }
        });
        additions.brokers.after = [...cheatClient.brokers.map(b => b.name), ...additions.brokers.additions.map(b => b.name)];
    } else {
        additions.brokers.after = additions.brokers.before;
    }

    // Only add to report if there are changes
    if (additions.states.additions.length > 0 ||
        additions.industries.additions.length > 0 ||
        additions.brokers.additions.length > 0) {
        report.push(additions);
    }
}

// Generate text report
let output = '';
output += '═══════════════════════════════════════════════════════════════════════════\n';
output += '                    CHEAT SHEET MERGE - DRY RUN PREVIEW\n';
output += '                         ⚠️  NO CHANGES APPLIED YET ⚠️\n';
output += '═══════════════════════════════════════════════════════════════════════════\n\n';

output += '📊 SUMMARY\n';
output += '───────────────────────────────────────────────────────────────────────────\n';
output += `Total Clients Analyzed: ${jsonData.clients.length}\n`;
output += `Clients with Changes: ${report.filter(r => r.status === 'MATCHED').length}\n`;
output += `Licensed States to Add: ${totalStateAdditions}\n`;
output += `Target Industries to Add: ${totalIndustryAdditions}\n`;
output += `Team Members to Add: ${totalBrokerAdditions}\n\n`;

if (report.filter(r => r.status === 'MATCHED').length === 0) {
    output += '✅ NO CHANGES NEEDED - All data is current!\n';
    output += '   The cheat sheet already contains all information from the JSON file.\n\n';
} else {
    output += '═══════════════════════════════════════════════════════════════════════════\n';
    output += '                          DETAILED CHANGES\n';
    output += '═══════════════════════════════════════════════════════════════════════════\n\n';

    for (const change of report) {
        if (change.status !== 'MATCHED') continue;

        output += `\n${'▓'.repeat(75)}\n`;
        output += `📋 ${change.client}\n`;
        output += `${'▓'.repeat(75)}\n\n`;

        // States
        if (change.states.additions.length > 0) {
            output += `🗺️  LICENSED STATES\n`;
            output += `   BEFORE (${change.states.before.length}): ${change.states.before.join(', ')}\n`;
            output += `   ➕ ADDING: ${change.states.additions.join(', ')}\n`;
            output += `   AFTER (${change.states.after.length}): ${change.states.after.join(', ')}\n\n`;
        }

        // Industries
        if (change.industries.additions.length > 0) {
            output += `🎯 TARGET INDUSTRIES\n`;
            output += `   BEFORE (${change.industries.before.length}):\n`;
            change.industries.before.forEach(ind => output += `      • ${ind}\n`);
            output += `   ➕ ADDING (${change.industries.additions.length}):\n`;
            change.industries.additions.forEach(ind => output += `      • ${ind}\n`);
            output += `   AFTER (${change.industries.after.length}):\n`;
            change.industries.after.forEach(ind => output += `      • ${ind}\n`);
            output += '\n';
        }

        // Brokers
        if (change.brokers.additions.length > 0) {
            output += `👥 TEAM MEMBERS\n`;
            output += `   BEFORE (${change.brokers.before.length}):\n`;
            change.brokers.before.forEach(name => output += `      • ${name}\n`);
            output += `   ➕ ADDING (${change.brokers.additions.length}):\n`;
            change.brokers.additions.forEach(broker => {
                output += `      • ${broker.name}\n`;
                if (broker.phone) output += `        📞 ${broker.phone}\n`;
                if (broker.email) output += `        📧 ${broker.email}\n`;
            });
            output += `   AFTER (${change.brokers.after.length}):\n`;
            change.brokers.after.forEach(name => output += `      • ${name}\n`);
            output += '\n';
        }
    }
}

output += '\n═══════════════════════════════════════════════════════════════════════════\n';
output += '                             NEXT STEPS\n';
output += '═══════════════════════════════════════════════════════════════════════════\n\n';
if (report.filter(r => r.status === 'MATCHED').length > 0) {
    output += '1. ✅ Review all proposed additions above\n';
    output += '2. ✅ Verify accuracy of new data\n';
    output += '3. ✅ Approve or request changes\n';
    output += '4. 🔄 Claude will then:\n';
    output += '   • Create timestamped backup of cheat-sheet-v2.html\n';
    output += '   • Apply all additions to the cheat sheet\n';
    output += '   • Generate final report with before/after comparison\n\n';
} else {
    output += '✨ No action needed - your cheat sheet is already complete!\n\n';
}

output += '═══════════════════════════════════════════════════════════════════════════\n';

console.log(output);

// Save detailed JSON
fs.writeFileSync('merge-preview-detailed.json', JSON.stringify(report, null, 2));

// Save text report
fs.writeFileSync('merge-preview-report.txt', output);

console.log('📁 Reports saved:');
console.log('   • merge-preview-detailed.json (machine-readable)');
console.log('   • merge-preview-report.txt (human-readable)');
