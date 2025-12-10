# BARNSLEY-AI Intelligence Rules
## Appointment Setter Cheat Sheet Management

**Last Updated:** December 9, 2025
**Purpose:** Permanent rules for managing the Appointment Setter Cheat Sheet and client data

---

## 📋 Table of Contents
1. [Client Status Management](#client-status-management)
2. [Client Counting Rules](#client-counting-rules)
3. [Airtable Synchronization](#airtable-synchronization)
4. [Setter Assignment Rules](#setter-assignment-rules)
5. [Onboarding Form Management](#onboarding-form-management)
6. [Data Update Procedures](#data-update-procedures)

---

## 1. Client Status Management

### Status Types

**ACTIVE** - Current clients receiving appointment setting services
- Include in active client count
- Include in setter assignment counts
- Display normally in cheat sheet

**ONBOARDING** - New clients being set up, not yet live
- Include in total client count
- DO NOT include in active client count (count separately)
- Setter may be "TBD" or "Onboarding - TBD"
- Display with onboarding badge/indicator

**LOST** or **INACTIVE** - Clients who have churned or ended service
- **CRITICAL: EXCLUDE from all active client counts**
- **CRITICAL: EXCLUDE from setter assignment counts**
- Remove from cheat sheet entirely OR
- Mark clearly as "LOST" if keeping for historical reference

**WARNING** - Active clients with upcoming issues
- Include in active count (still active)
- Add visible warning indicators
- Examples: Contract ending soon, not renewing, etc.

### Status Field Implementation

All client objects in `index.html` should include a `status` field:

```javascript
{
    businessName: "Example Client",
    status: "Active",  // or "Onboarding", "Lost", "Warning"
    // ... other fields
}
```

**Default Behavior:** If `status` field is missing, assume "Active"

---

## 2. Client Counting Rules

### ✅ CORRECT Client Count Formula

```
ACTIVE CLIENTS = Active status clients only
ONBOARDING CLIENTS = Onboarding status clients only
TOTAL CLIENTS = ACTIVE + ONBOARDING (NOT including Lost/Inactive)
```

### Example (Current as of Dec 9, 2025):
- Active: 18 clients
- Onboarding: 1 client (Capitol Group)
- **Total: 19 clients**
- Lost/Inactive: 0 clients (excluded from count)

### ❌ NEVER COUNT:
- Clients with "Lost" status
- Clients with "Inactive" status
- Clients marked for removal in Airtable
- Historical clients no longer receiving services

### Setter Distribution Counts
Only count **ACTIVE** clients for setter assignments:
- Jacques Lebleu: Count only Active clients assigned to Jacques
- Al Butler: Count only Active clients assigned to Al
- Onboarding clients count separately until assigned a setter

---

## 3. Airtable Synchronization

### Data Sync Priority

**ALWAYS sync from Airtable:**
1. Client status (Active, Onboarding, Lost, etc.)
2. GHL Location IDs
3. GHL Tokens
4. Setter assignments
5. Owner names and emails
6. Appointment counts (New Appointments Today, etc.)

**Use placeholders for missing data:**
- Phone numbers (use 555- format if not in Airtable)
- Addresses (use city/state if not in Airtable)
- Licensed states (use reasonable defaults)
- Target industries (use generic categories)
- Broker teams (use owner as default contact)

### Sync Frequency
- **Real-time:** Appointment counts (pulled from Airtable API)
- **Manual:** Client data updates (when notified of changes)
- **Weekly:** Full verification of all client statuses

### Status Change Protocol

When a client's Airtable status changes:

1. **Active → Lost/Inactive:**
   - **IMMEDIATELY** remove from cheat sheet OR add `status: "Lost"` field
   - **IMMEDIATELY** update client count documentation
   - Verify setter assignment counts are updated
   - Document reason for status change

2. **Onboarding → Active:**
   - Update `status: "Active"`
   - Assign to setter (Jacques or Al)
   - Update setter from "TBD" to actual setter name
   - Verify all onboarding data is complete

3. **Active → Warning:**
   - Add `status: "Warning"` or `warning: "reason"` field
   - Keep in active count (still active)
   - Add visual indicator in cheat sheet
   - Document end date or issue

---

## 4. Setter Assignment Rules

### Current Setters:
- **Jacques Lebleu** - Senior Setter
- **Al Butler** (Alfred) - Setter

### Assignment Protocol

**For Active Clients:**
- Must have explicit setter assignment ("Jacques Lebleu" or "Al Butler")
- Cannot use "TBD" for active clients
- If setter leaves, immediately reassign to remaining setter

**For Onboarding Clients:**
- Use "Onboarding - TBD" if setter not yet assigned
- Assign setter when client goes live
- Update setter field when activated

**For Lost/Inactive Clients:**
- Setter field becomes irrelevant (client excluded from counts)
- Keep historical setter assignment for records

### Load Balancing
- Aim for roughly equal distribution between setters
- Consider client complexity and industry when assigning
- Current target: 9-10 active clients per setter

---

## 5. Onboarding Form Management

### Onboarding Form URLs
All client records in Airtable have fillout.com onboarding form URLs:
```
https://forms.fillout.com/t/uuZqcNtaSnus?id=<RECORD_ID>
```

### Data Availability Check

**Before updating cheat sheet with "complete" onboarding data:**
1. Verify phone number exists in Airtable
2. Verify address exists in Airtable
3. Verify licensed states array is populated
4. Verify target industries field is populated
5. Verify broker team information exists

**If ANY field is missing:**
- Use placeholder data instead
- Add note that onboarding form is incomplete
- Follow up with team to complete form
- DO NOT mark as "verified onboarding data"

### Placeholder Data Standards

When onboarding data is incomplete, use these standards:

```javascript
{
    ownerPhone: "555-123-4567",  // Generic 555 number
    address: "City, STATE",       // City and state only
    licensedStates: ["ST"],       // Nearby states
    targetIndustries: ["Commercial Lines"],  // Generic category
    brokers: [
        {name: "Owner Name", phone: "5551234567", email: "owner@email.com"}
    ]
}
```

---

## 6. Data Update Procedures

### When to Update Cheat Sheet

**IMMEDIATE UPDATES REQUIRED:**
1. Client status changes (Active → Lost, Onboarding → Active)
2. GHL Location ID or Token changes
3. Setter reassignments
4. New clients added to Airtable
5. Owner email changes (critical for contact)

**WEEKLY UPDATES:**
1. Full Airtable sync to verify all data current
2. Check for onboarding forms completed
3. Update placeholder data with real data
4. Verify client counts match Airtable

**MONTHLY AUDITS:**
1. Review all client statuses in Airtable
2. Verify no Lost/Inactive clients in cheat sheet
3. Confirm all active clients have complete data
4. Update this intelligence rules document if needed

### Update Workflow

1. **Check Airtable** for latest client data
2. **Identify changes** (status, setter, contact info, etc.)
3. **Update index.html** with new data
4. **Run verification** (use Python scripts to count clients)
5. **Test cheat sheet** (open in browser, verify displays correctly)
6. **Commit changes** with descriptive message
7. **Deploy to GitHub Pages** (auto-deploys on push to main)
8. **Document changes** in summary file

### Commit Message Format

```
TYPE: Brief description

- Detailed change 1
- Detailed change 2

Client count: XX active + XX onboarding = XX total
```

**Examples:**
```
FIX: Update Arcstone email and GHL token

- Updated owner email to luis@arcstoneinsuranceadvisors.com
- Updated GHL Location ID and Token from Airtable
- Verified setter assignment (Al Butler)

Client count: 18 active + 1 onboarding = 19 total
```

```
ADD: New client - The Capitol Group of Companies

- Added Capitol Group with onboarding status
- Owner: Laura Sutton (Lsutton@Capitol-Group.com)
- GHL integration ready (location ID + token)
- Setter: Onboarding - TBD

Client count: 18 active + 1 onboarding = 19 total
```

```
REMOVE: Premier Group Insurance (LOST status)

- Client marked LOST/INACTIVE in Airtable
- Removed from active roster
- Corrected client count
- Note: Different from PRIME INSURANCE SERVICES (ACTIVE)

Client count: 18 active + 1 onboarding = 19 total
```

---

## 7. Critical Distinctions

### Similar Client Names

**⚠️  PRIME INSURANCE SERVICES ≠ PREMIER GROUP INSURANCE**

| Client | Status | Owner | Location | Notes |
|--------|--------|-------|----------|-------|
| PRIME INSURANCE SERVICES | **ACTIVE** | Min Choi | New Jersey | Keep in roster |
| Premier Group Insurance | **LOST** | Jim Langen | Indiana | Removed from roster |

**Rule:** Always verify full business name in Airtable before making changes

---

## 8. JavaScript Helper Functions

The cheat sheet includes intelligent client management functions:

```javascript
// Get only active clients (excludes Lost/Inactive)
getActiveClients()

// Get clients by specific status
getClientsByStatus('Active')
getClientsByStatus('Onboarding')
getClientsByStatus('Lost')

// Get comprehensive client counts
getClientCounts()
// Returns: { total, active, onboarding, lost, activeTotal, jacquesTotal, alTotal }
```

**Usage in Console:**
```javascript
// Verify current counts
console.log('📊 Client Counts:', getClientCounts());

// List all active clients
console.log('Active Clients:', getActiveClients().map(c => c.businessName));

// Check onboarding status
console.log('Onboarding:', getClientsByStatus('Onboarding').map(c => c.businessName));
```

---

## 9. Warning Flags

### Woot Insurance Agency (Sanders)

**⚠️  CRITICAL WARNING:**
- **Status in Airtable:** Active (as of Dec 9, 2025)
- **Airtable Notes:** "Client lost and not renewing effective April 30, 2025"
- **Action Required:** Monitor status and remove from active roster after April 30, 2025

**This client demonstrates the need for:**
1. Regular Airtable status checks
2. Proactive client status updates
3. Warning indicators for upcoming changes

---

## 10. Future Enhancements

### Planned Intelligence Features

1. **Automatic Airtable Sync**
   - Real-time status updates
   - Automatic client count adjustments
   - Alerts for status changes

2. **Visual Status Indicators**
   - Color-coded client cards by status
   - Warning badges for upcoming issues
   - Onboarding progress indicators

3. **Client Health Monitoring**
   - Track appointment booking rates
   - Flag underperforming clients
   - Alert for potential churn

4. **Setter Performance Metrics**
   - Appointments per client
   - Booking rates by setter
   - Load balancing recommendations

---

## 📝 Summary of Core Rules

1. **EXCLUDE Lost/Inactive clients from ALL counts**
2. **ALWAYS sync critical data from Airtable (status, GHL, setter)**
3. **USE placeholders for missing onboarding data**
4. **VERIFY client counts after every update**
5. **COMMIT changes with descriptive messages**
6. **MONITOR Airtable for status changes weekly**
7. **UPDATE cheat sheet immediately when status changes**

---

**These rules ensure:**
- ✅ Accurate client counts at all times
- ✅ Clear distinction between Active, Onboarding, and Lost clients
- ✅ Reliable data synchronization with Airtable
- ✅ Transparent and traceable update history
- ✅ Scalable system as client base grows

---

*Document maintained by BARNSLEY-AI*
*For questions or updates, refer to this document before making changes*
