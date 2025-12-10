#!/usr/bin/env node

/**
 * Cheat Sheet Data Merge Analysis
 * Compares onboarding-data.json with existing cheat-sheet-v2.html data
 * Generates dry-run preview of proposed additive changes
 */

const fs = require('fs');
const path = require('path');

// ============= CONFIGURATION =============
const SIMILARITY_THRESHOLD = 0.85;

// USPS state code mapping (full name -> 2-letter code)
const STATE_CODES = {
    'alabama': 'AL', 'alaska': 'AK', 'arizona': 'AZ', 'arkansas': 'AR',
    'california': 'CA', 'colorado': 'CO', 'connecticut': 'CT', 'delaware': 'DE',
    'florida': 'FL', 'georgia': 'GA', 'hawaii': 'HI', 'idaho': 'ID',
    'illinois': 'IL', 'indiana': 'IN', 'iowa': 'IA', 'kansas': 'KS',
    'kentucky': 'KY', 'louisiana': 'LA', 'maine': 'ME', 'maryland': 'MD',
    'massachusetts': 'MA', 'michigan': 'MI', 'minnesota': 'MN', 'mississippi': 'MS',
    'missouri': 'MO', 'montana': 'MT', 'nebraska': 'NE', 'nevada': 'NV',
    'new hampshire': 'NH', 'new jersey': 'NJ', 'new mexico': 'NM', 'new york': 'NY',
    'north carolina': 'NC', 'north dakota': 'ND', 'ohio': 'OH', 'oklahoma': 'OK',
    'oregon': 'OR', 'pennsylvania': 'PA', 'rhode island': 'RI', 'south carolina': 'SC',
    'south dakota': 'SD', 'tennessee': 'TN', 'texas': 'TX', 'utah': 'UT',
    'vermont': 'VT', 'virginia': 'VA', 'washington': 'WA', 'west virginia': 'WV',
    'wisconsin': 'WI', 'wyoming': 'WY'
};

// Acronyms to preserve in Title Case
const PROTECTED_ACRONYMS = [
    'HVAC', 'LLC', 'LLP', 'Inc', 'GRIT', 'UWIB', 'IMD', 'MSP', 'IT',
    'CEO', 'CFO', 'CTO', 'USA', 'USPS', 'LRO', 'HOA', 'RE'
];

// ============= EXISTING CHEAT SHEET DATA =============
const existingClients = [
    {
        businessName: "Allee Agency Inc.",
        licensedStates: ["AL", "AZ", "CA", "CO", "GA", "KY", "MD", "MS", "MO", "NE", "TN", "TX", "UT", "VA"],
        targetIndustries: ["Construction", "Restaurants", "Retail - Main Street", "PROPERTY - LRO", "PRIVATE PRACTICE Doctors/Dentists"],
        brokers: [
            {name: "Ryan Allee", phone: "6157175652", email: "ryan@alleeins.com"},
            {name: "Will Rogers", phone: "6156648321", email: "will@alleeins.com"},
            {name: "Jim McKee", phone: "6153770017", email: "jim@alleeins.com"},
            {name: "Rayneshia Dawkins", phone: "6157169945", email: "rayneshia@alleeins.com"}
        ]
    },
    {
        businessName: "Arroyo Insurance Services - South Bay",
        licensedStates: ["CA"],
        targetIndustries: ["Wholesale Distribution", "Manufacturing", "Commercial Real Estate - Industrial, Shopping Centers, Apartments, Property Managers", "Construction - Solar, Roofing, Plumbing, HVAC", "Hospitality - Restaurants, Bar/Tavern"],
        brokers: [
            {name: "Robert Kelly", phone: "3103568206", email: "robertk@arroyoins.com"},
            {name: "Ryan McDonald", phone: "4243985624", email: "ryanm@arroyoins.com"},
            {name: "Seamus McDonald", phone: "3103568214", email: "seamusm@arroyoins.com"},
            {name: "William Dessert", phone: "3103568210", email: "williamd@arroyoins.com"}
        ]
    },
    {
        businessName: "The Bulow Group, Inc",
        licensedStates: ["IL"],
        targetIndustries: ["Restaurant Groups", "Construction", "Hardware Stores", "Manufacturing/Food Distributors", "Waste Haulers & Garbage"],
        brokers: [
            {name: "Nick Hogevenn", phone: "", email: ""},
            {name: "Tom DeMatteo", phone: "", email: ""},
            {name: "Bobby Daw", phone: "", email: ""},
            {name: "Rob Randick", phone: "", email: ""}
        ]
    },
    {
        businessName: "WEER INSURANCE AND FINANCIAL SERVICES, INC",
        licensedStates: ["IL", "IN", "WI", "OH", "FL", "CA", "TX", "GA"],
        targetIndustries: ["Artisian & General Contractors", "Real Estate Investors - Appartment Buildings, Commercial Strip Centers, Condo Associations", "Restaurants", "Bars - only in IL & WI", "Commercial Auto"],
        brokers: [
            {name: "Tiffany Trevino", phone: "8472781099 ext 104", email: "tiffany@weeryouragent.com"},
            {name: "Steve Gallardo", phone: "8472781099 ext 102", email: "steve@weeryouragent.com"},
            {name: "Sherrie Hurley", phone: "8472781099 ext", email: "sherrie@weeryouragent.com"},
            {name: "Kasia Biedrawa", phone: "8472781099 ext 105", email: "kasia@weeryouragent.com"}
        ]
    },
    {
        businessName: "Insurance Express",
        licensedStates: ["FL", "NY"],
        targetIndustries: ["Construction", "Manufacturing", "Commercial Auto (non-trucking)", "Commercial Strip Malls", "Commercial Residential (Apt/Condo)"],
        brokers: [
            {name: "Charles Maniglia", phone: "", email: "cmaniglia@insuranceexpress.com"}
        ]
    },
    {
        businessName: "UWIB Risk Inc",
        licensedStates: ["TN"],
        targetIndustries: ["Artisan Contractors (HVAC, Plumbing, Electrical, Roofing, Etc)", "Restaurants", "Manufacturing", "Property Manager"],
        brokers: [
            {name: "Eric Schirding", phone: "6265785154", email: "eschirding@uwib.com"},
            {name: "Jesse Nielsen", phone: "6262046983", email: "jesse@uwib.com"},
            {name: "David Murphy", phone: "(951) 462-2405", email: "david@uwib.com"}
        ]
    },
    {
        businessName: "Koosh Insurance",
        licensedStates: ["FL"],
        targetIndustries: ["Commercial Real Estate", "Residential Real Estate", "Restaurants", "Construction", "Hotels"],
        brokers: [
            {name: "Itay Sela", phone: "9544956965", email: "itai@koosh-ins.com"}
        ]
    },
    {
        businessName: "STATE FARM - TIM MAUDSLEY AGENT",
        licensedStates: ["NV"],
        targetIndustries: ["ARTISAN SERVICE CONTRACTORS", "HOMEOWNERS ASSOCIATIONS", "RESTAURANTS", "AUTO REPAIR", "LESSOR RISK - BUILDING OWNERS"],
        brokers: [
            {name: "KADEN MAALOUF", phone: "7029984545", email: "KADEN.MAALOUF.VADRFZ@STATEFARM.COM"},
            {name: "JEREMY WINCHESTER", phone: "7029984545", email: "JEREMY.WINCHESTER.VAB79Y@STATEFARM.COM"},
            {name: "GABRIELA ANDRADE", phone: "7029984545", email: "GABRIELA.ANDRADE.VADYCA@STATEFARM.COM"}
        ]
    },
    {
        businessName: "Insurable, Inc.",
        licensedStates: ["PA"],
        targetIndustries: ["Construction-Artisan", "Workers Comp", "Machine Shops", "Physical fitness facilities GYMS", "Auto Body and Mechanical Shops"],
        brokers: [
            {name: "Sharie Castle", phone: "(412) 244-1000", email: "SCastle@InsurableInc.com"},
            {name: "Ron Minnich", phone: "(412) 244-1000", email: "RMinnich@InsurableInc.com"},
            {name: "Brian Bortz", phone: "(412) 244-1000", email: "Brian@InsurableInc.com"}
        ]
    },
    {
        businessName: "GRIT Insurance",
        licensedStates: ["UT", "ID", "CO", "AZ", "TX", "OR", "WA", "CA", "MT", "NV", "ND", "WY"],
        targetIndustries: ["Commercial Contractors", "Landscape Contractors", "Excavation Contractors", "Manufacturing"],
        brokers: [
            {name: "Kirk Chester", phone: "801-948-8091", email: "Kirk@gritinsurance.com"},
            {name: "Justin Peterson", phone: "801-948-8090", email: "Justin@gritinsurance.com"},
            {name: "Easton Rentmeister", phone: "801-948-8092", email: "Easton@gritinsurance.com"}
        ]
    },
    {
        businessName: "Gerety Insurance",
        licensedStates: ["DE", "MD", "PA", "VA"],
        targetIndustries: ["Construction", "Restaurants", "Manufacturing", "Local Trucking", "Technology"],
        brokers: [
            {name: "Sully Gerety", phone: "443-686-1115", email: "sully@geretyinsurance.com"},
            {name: "Cindy Dotson", phone: "443-827-9024", email: "cindy@geretyinsurance.com"}
        ]
    },
    {
        businessName: "IMD INSURANCE & Financial Services LLC",
        licensedStates: ["TX", "IL", "CA"],
        targetIndustries: ["Construction", "R.E Investors Commercial (Multifamily)", "Professional Services - Attorneys", "MSP's", "Restaurants"],
        brokers: [
            {name: "Jose Aleman", phone: "+50584758462", email: "jose@imdins.com"},
            {name: "Marlon Hazsuel", phone: "+50558105735", email: "marlon@imdins.com"}
        ]
    },
    {
        businessName: "PRIME INSURANCE SERVICES",
        licensedStates: ["NJ", "NY", "PA", "TX", "CA", "CT", "FL"],
        targetIndustries: ["CONSTRUCTION", "RESTAURANTS", "BUILDINGS / LESSORS RISK", "WHOLESALER/MFG", "Builder's Risk"],
        brokers: [
            {name: "MIN CHOI", phone: "2012854123", email: "MIN@PRIMEISERVICES.COM"}
        ]
    },
    {
        businessName: "Ingram Insurance Agency, LLC",
        licensedStates: ["NH", "UT", "WY", "AL", "AR", "DE", "FL", "GA", "ID", "IL", "IN", "IA", "KY", "MD", "MN", "MS", "NV", "OH", "OK", "OR", "PA", "SC", "TN", "TX", "VA", "WA", "CO"],
        targetIndustries: ["Artisan Contractor, NO General Contractors", "Restaurants", "Professional Services - anything in an office", "HVAC/ELEC/PLUMBING Contractors", "WORK COMP - All classes"],
        brokers: [
            {name: "Chris Ingram", phone: "615-675-5154", email: ""}
        ]
    },
    {
        businessName: "Premier Group Insurance",
        licensedStates: ["IN", "IL", "OH"],
        targetIndustries: ["Construction (1-10)", "Restaurants (Bars)", "Retail (Mom & Pop)", "Condo Association"],
        brokers: [
            {name: "Michael Langen", phone: "219-695-3034", email: "mlangen@premiergrpins.com"},
            {name: "James Langen", phone: "219-695-3044", email: "jwlangen@premiergrpins.com"},
            {name: "Tai Cruise", phone: "219-695-3043", email: "tcruise@premiergrpins.com"},
            {name: "Jim Snedeker", phone: "219-266-2382", email: "jsnedeker@premiergrpins.com"}
        ]
    },
    {
        businessName: "Eastman Risk Advisors",
        licensedStates: ["UT"],
        targetIndustries: ["Commercial property", "Electricians", "Plumbers", "HVAC", "Lube/oil shops"],
        brokers: [
            {name: "Caleb Beickel", phone: "8018880550", email: "Caleb@Eastmanrisk.com"},
            {name: "Maddy Beickel", phone: "8018880550", email: "Maddy@Eastmanrisk.com"},
            {name: "Isabella Brown", phone: "8018880550", email: "Bella@Eastmanrisk.com"},
            {name: "Mari Higuera", phone: "8018880550", email: "Mari@Eastmanrisk.com"}
        ]
    }
];

// ============= UTILITY FUNCTIONS =============

/**
 * Normalize state name to USPS 2-letter code
 */
function normalizeState(state) {
    const normalized = state.trim().toLowerCase();

    // Already a 2-letter code
    if (normalized.length === 2) {
        return normalized.toUpperCase();
    }

    // Full state name
    if (STATE_CODES[normalized]) {
        return STATE_CODES[normalized];
    }

    console.warn(`Warning: Unknown state "${state}"`);
    return state.toUpperCase();
}

/**
 * Smart Title Case with protected acronyms
 */
function smartTitleCase(text) {
    // Check if entire text is a protected acronym
    if (PROTECTED_ACRONYMS.includes(text.toUpperCase())) {
        return text.toUpperCase();
    }

    // Split into words and process each
    return text.split(/\s+/).map(word => {
        const upper = word.toUpperCase();

        // Check if word is a protected acronym
        if (PROTECTED_ACRONYMS.includes(upper)) {
            return upper;
        }

        // Check if word ends with protected acronym
        for (const acronym of PROTECTED_ACRONYMS) {
            if (upper.endsWith(acronym)) {
                const prefix = word.slice(0, -acronym.length);
                return prefix.charAt(0).toUpperCase() + prefix.slice(1).toLowerCase() + acronym;
            }
        }

        // Standard title case
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }).join(' ');
}

/**
 * Levenshtein distance for fuzzy matching
 */
function levenshteinDistance(str1, str2) {
    const len1 = str1.length;
    const len2 = str2.length;
    const matrix = Array(len1 + 1).fill(null).map(() => Array(len2 + 1).fill(0));

    for (let i = 0; i <= len1; i++) matrix[i][0] = i;
    for (let j = 0; j <= len2; j++) matrix[0][j] = j;

    for (let i = 1; i <= len1; i++) {
        for (let j = 1; j <= len2; j++) {
            const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
            matrix[i][j] = Math.min(
                matrix[i - 1][j] + 1,
                matrix[i][j - 1] + 1,
                matrix[i - 1][j - 1] + cost
            );
        }
    }

    return matrix[len1][len2];
}

/**
 * Calculate similarity score (0-1)
 */
function similarity(str1, str2) {
    const s1 = str1.toLowerCase().trim();
    const s2 = str2.toLowerCase().trim();

    if (s1 === s2) return 1.0;

    const maxLen = Math.max(s1.length, s2.length);
    if (maxLen === 0) return 1.0;

    const distance = levenshteinDistance(s1, s2);
    return 1 - (distance / maxLen);
}

/**
 * Normalize broker for comparison
 */
function normalizeBroker(broker) {
    return {
        name: broker.name.toLowerCase().trim(),
        phone: (broker.phone || '').replace(/\D/g, ''),
        email: (broker.email || '').toLowerCase().trim()
    };
}

/**
 * Check if two brokers are the same
 */
function isSameBroker(b1, b2) {
    const n1 = normalizeBroker(b1);
    const n2 = normalizeBroker(b2);

    // Match by email if both have it
    if (n1.email && n2.email && n1.email === n2.email) return true;

    // Match by phone if both have it (at least 10 digits)
    if (n1.phone.length >= 10 && n2.phone.length >= 10) {
        const phone1 = n1.phone.slice(-10);
        const phone2 = n2.phone.slice(-10);
        if (phone1 === phone2) return true;
    }

    // Match by name similarity
    return similarity(n1.name, n2.name) >= 0.9;
}

// ============= MAIN ANALYSIS =============

function analyzeChanges() {
    // Load JSON data
    const jsonPath = path.join(__dirname, 'onboarding-data.json');
    const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

    const results = {
        matched: [],
        unmatched: [],
        totalAdditions: {
            licensedStates: 0,
            targetIndustries: 0,
            brokers: 0
        }
    };

    // Process each JSON client
    for (const jsonClient of jsonData.clients) {
        // Find matching existing client
        let bestMatch = null;
        let bestScore = 0;

        for (const existing of existingClients) {
            const score = similarity(jsonClient.businessName, existing.businessName);
            if (score > bestScore) {
                bestScore = score;
                bestMatch = existing;
            }
        }

        if (bestScore >= SIMILARITY_THRESHOLD) {
            // Match found - compute diffs
            const diff = {
                businessName: bestMatch.businessName,
                matchScore: bestScore,
                additions: {
                    licensedStates: [],
                    targetIndustries: [],
                    brokers: []
                }
            };

            // Compare licensed states
            if (jsonClient.licensedStates) {
                const existingStates = new Set(bestMatch.licensedStates.map(s => s.toUpperCase()));
                for (const state of jsonClient.licensedStates) {
                    const normalized = normalizeState(state);
                    if (!existingStates.has(normalized)) {
                        diff.additions.licensedStates.push(normalized);
                        results.totalAdditions.licensedStates++;
                    }
                }
            }

            // Compare target industries
            if (jsonClient.targetIndustries) {
                const existingIndustries = new Set(
                    bestMatch.targetIndustries.map(i => i.toLowerCase().trim())
                );
                for (const industry of jsonClient.targetIndustries) {
                    const normalized = smartTitleCase(industry);
                    if (!existingIndustries.has(industry.toLowerCase().trim())) {
                        diff.additions.targetIndustries.push(normalized);
                        results.totalAdditions.targetIndustries++;
                    }
                }
            }

            // Compare brokers
            if (jsonClient.brokers) {
                for (const jsonBroker of jsonClient.brokers) {
                    const exists = bestMatch.brokers.some(b => isSameBroker(b, jsonBroker));
                    if (!exists) {
                        diff.additions.brokers.push(jsonBroker);
                        results.totalAdditions.brokers++;
                    }
                }
            }

            // Only add to results if there are actual additions
            if (diff.additions.licensedStates.length > 0 ||
                diff.additions.targetIndustries.length > 0 ||
                diff.additions.brokers.length > 0) {
                results.matched.push(diff);
            }

        } else {
            // No match found
            results.unmatched.push({
                businessName: jsonClient.businessName,
                bestCandidate: bestMatch ? bestMatch.businessName : 'None',
                bestScore: bestScore
            });
        }
    }

    return results;
}

// ============= REPORT GENERATION =============

function generateReport(results) {
    console.log('╔════════════════════════════════════════════════════════════════════════╗');
    console.log('║           CHEAT SHEET DATA MERGE - DRY RUN PREVIEW                     ║');
    console.log('╚════════════════════════════════════════════════════════════════════════╝\n');

    console.log('📊 SUMMARY STATISTICS');
    console.log('─────────────────────────────────────────────────────────────────────────');
    console.log(`  Clients with additions: ${results.matched.length}`);
    console.log(`  Total licensed states to add: ${results.totalAdditions.licensedStates}`);
    console.log(`  Total target industries to add: ${results.totalAdditions.targetIndustries}`);
    console.log(`  Total brokers to add: ${results.totalAdditions.brokers}`);
    console.log(`  Unmatched clients: ${results.unmatched.length}\n`);

    if (results.matched.length > 0) {
        console.log('✅ MATCHED CLIENTS WITH PROPOSED ADDITIONS');
        console.log('═════════════════════════════════════════════════════════════════════════\n');

        for (const match of results.matched) {
            console.log(`📋 ${match.businessName} (Match: ${(match.matchScore * 100).toFixed(1)}%)`);
            console.log('─────────────────────────────────────────────────────────────────────────');

            if (match.additions.licensedStates.length > 0) {
                console.log(`  🗺️  Licensed States to Add (${match.additions.licensedStates.length}):`);
                console.log(`     ${match.additions.licensedStates.join(', ')}`);
            }

            if (match.additions.targetIndustries.length > 0) {
                console.log(`  🎯 Target Industries to Add (${match.additions.targetIndustries.length}):`);
                match.additions.targetIndustries.forEach(ind => {
                    console.log(`     • ${ind}`);
                });
            }

            if (match.additions.brokers.length > 0) {
                console.log(`  👥 Team Members to Add (${match.additions.brokers.length}):`);
                match.additions.brokers.forEach(broker => {
                    console.log(`     • ${broker.name}`);
                    if (broker.phone) console.log(`       Phone: ${broker.phone}`);
                    if (broker.email) console.log(`       Email: ${broker.email}`);
                });
            }

            console.log('');
        }
    }

    if (results.unmatched.length > 0) {
        console.log('⚠️  UNMATCHED CLIENTS (Will be ignored)');
        console.log('═════════════════════════════════════════════════════════════════════════\n');

        for (const unmatched of results.unmatched) {
            console.log(`  ❌ ${unmatched.businessName}`);
            console.log(`     Best candidate: ${unmatched.bestCandidate} (${(unmatched.bestScore * 100).toFixed(1)}%)`);
            console.log('');
        }
    }

    console.log('═════════════════════════════════════════════════════════════════════════');
    console.log('💡 NEXT STEPS');
    console.log('─────────────────────────────────────────────────────────────────────────');
    console.log('  1. Review the proposed additions above');
    console.log('  2. Verify that all additions are correct');
    console.log('  3. Check unmatched clients - do any need manual mapping?');
    console.log('  4. If approved, Claude will:');
    console.log('     • Create timestamped backup of cheat-sheet-v2.html');
    console.log('     • Apply all additions (states, industries, brokers)');
    console.log('     • Generate post-merge report with before/after samples');
    console.log('═════════════════════════════════════════════════════════════════════════\n');
}

// ============= EXECUTION =============

const results = analyzeChanges();
generateReport(results);

// Save results to JSON for programmatic access
fs.writeFileSync(
    path.join(__dirname, 'merge-preview.json'),
    JSON.stringify(results, null, 2)
);

console.log('📁 Detailed results saved to: merge-preview.json\n');
