# Data Mapping: Current Cheat Sheet → Airtable Schema

## Current Cheat Sheet Analysis

### Client Count: 24+ Insurance Agencies
- L.G. Cortez Insurance
- Premier Group Insurance  
- One Choice Insurance Brokers
- Insurance Express
- Arroyo Insurance Services - South Bay
- The Bulow Group
- Gerety Insurance
- GRIT Insurance
- TEKRiSQ, INC.
- Freedom Insurance, Inc.
- Aims Insurance
- Fortified Insurance
- Crum Insurance Agency
- Allee Insurance Agency
- Alkeme Insurance
- Southwest Commercial
- Ingram Insurance Agency
- WEER Insurance and Financial Services, Inc.
- MAUDSLEY Insurance Agency
- PRIME Insurance Services
- KOOSH Insurance
- UWIB Risk Inc
- Insurable, Inc.
- Doctors First, Inc.
- IMD INSURANCE & Financial Services LLC
- Eastman Risk Advisors

### Data Structure Mapping

| Current Cheat Sheet Field | Airtable Table | Airtable Field | Notes |
|---------------------------|----------------|----------------|-------|
| **Client Name** | Clients | Client Name | Primary identifier |
| **GHL Phone Number** | Clients | Primary GHL Phone | Main contact number |
| **Setter Assignment** | Clients | Assigned Setter | Link to Setters table |
| **Owner Name** | Team Members | Name | Role: "Owner" |
| **Owner Email** | Team Members | Email | Primary contact |
| **Owner Phone** | Team Members | Phone | If available |
| **Website** | Clients | Website | Company website |
| **Quote Funnel Link** | Clients | Quote Link | Lead capture URL |
| **Address** | Clients | Address | Business address |
| **Timezone** | Clients | Timezone | For appointment scheduling |
| **Areas Served** | Clients | Licensed States | States they can operate in |
| **Broker Names** | Team Members | Name | Multiple brokers per client |
| **Broker Emails** | Team Members | Email | Contact information |
| **Broker Phones** | Team Members | Phone | Direct contact |
| **Special Notes** | Clients | Recent Notes | Campaign notes, restrictions |
| **Industry Preferences** | Clients | Target Industries | What they want to target |
| **Restrictions** | Clients | Restrictions | What to avoid |

### Setter Information
**Current Setters Identified:**
- Jacques (multiple clients)
- Brendan (multiple clients)
- [Unassigned] (some clients)

### Geographic Coverage Analysis
**Most Common States:**
- CA (California) - 8+ clients
- TX (Texas) - 6+ clients  
- FL (Florida) - 5+ clients
- IL (Illinois) - 4+ clients
- NY (New York) - 3+ clients

### Industry Focus Areas
**Common Target Industries:**
- Real Estate
- Construction/Contractors
- Manufacturing
- Commercial Auto
- General Commercial

### Special Notes & Restrictions
**Key Patterns:**
- "No Personal Lines" (Alkeme)
- "No truckers with 1 truck" (Southwest Commercial)
- "DO NOT BOOK REAL ESTATE LEADS" (One Choice)
- "Likes Construction/Manufacturing" (Crum)
- "Box trucks, Motels 10 units or less" (MAUDSLEY)

## Data Import Strategy

### Phase 1: Client Records
1. Create main client records with basic info
2. Add GHL phone numbers
3. Assign setters
4. Add geographic coverage

### Phase 2: Team Members
1. Create owner records
2. Add broker/team member records
3. Link to appropriate clients

### Phase 3: Special Instructions
1. Add campaign notes
2. Document restrictions
3. Note industry preferences

### Phase 4: Integration Setup
1. Configure API connections
2. Set up auto-refresh
3. Test data flow

## Next Steps
1. **Set up Airtable base** with the mapped structure
2. **Import current data** from cheat sheet
3. **Create web interface** that displays this data
4. **Add search/filter** capabilities
5. **Implement real-time updates**

## Benefits of Automation
- **No more manual updates** when client info changes
- **Real-time data** for setters
- **Searchable/filterable** by state, industry, setter
- **Mobile-friendly** access
- **Automatic sync** with Airtable changes
- **Scalable** as you add more clients

