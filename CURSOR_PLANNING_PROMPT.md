# Cheat Sheet Project - Planning Prompt for Cursor

## Project Overview
I'm building an automatically-updating cheat sheet for appointment setters and inbox managers that integrates with Airtable and GoHighLevel systems.

## Current Status
- ✅ **Completed**: Static HTML cheat sheet with comprehensive client information
- ✅ **Completed**: All 16 active clients with full onboarding details integrated
- ⏳ **Next Phase**: Make it dynamic with live API integration

## Existing Assets

### 1. Current Cheat Sheet (`cheat-sheet.html`)
- Location: `/Users/nicktoma/Desktop/Claude Code/Cheat-Sheet/cheat-sheet.html`
- Also on desktop: `/Users/nicktoma/Desktop/cheat-sheet.html`
- Features:
  - 16 active clients (9 for Brendan, 7 for Jacques)
  - Search functionality
  - Filter by setter (Brendan/Jacques)
  - Responsive design with gradient styling
  - Client cards with comprehensive info: team members, contact details, target industries, licensed states, revenue goals, close rates, top carriers

### 2. Airtable Integration
- **API Key**: `patOe0Tj79vik2Qrx.bede69a12d629090462fb258038c527dab560d54ce235edf86bb22d646bd7aa8`
- **Base ID**: `app3gCaXd7bblkw7L`
- **Base URL**: https://airtable.com/app3gCaXd7bblkw7L
- Status: Not yet integrated with live API

### 3. GoHighLevel Integration
- Needed for: Phone number management, contact data
- Status: API credentials TBD

### 4. Onboarding Forms
- Location: `/Users/nicktoma/Desktop/Onboarding Forms/`
- 13 PDF files with detailed client information
- All data has been manually extracted and added to HTML cheat sheet

### 5. Documentation Files
- `project-plan.md` - Overall project planning
- `ONBOARDING_CHECKLIST.md` - 4-phase onboarding process (Days 1-7)
- `data-requirements.md` - Data structure needs (if exists)
- `airtable-schema.md` - Database schema (if exists)

## Data Structure Required

For each client, the system needs:
- ✅ Client name and status (Active/Onboarding/Inactive)
- ✅ Owner information (name, phone, email)
- ✅ GoHighLevel phone numbers
- ✅ Licensed states (where they can operate)
- ✅ Team members (names, roles, contacts)
- ✅ Assigned setter (Brendan or Jacques)
- ✅ Target industries (top 5)
- ✅ Priority states for targeting
- ✅ Monthly revenue (current and goal)
- ✅ Close rate percentage
- ✅ Top carriers
- ✅ Ideal client profile
- ✅ Physical address, website, timezone
- ⏳ Recent notes/feedback from check-ins
- ⏳ Contact preferences

## Key Requirements

### Must-Have Features
1. **Live Data Updates**: Cheat sheet pulls from Airtable as single source of truth
2. **No Manual Updates**: All changes made in Airtable automatically reflect in cheat sheet
3. **Auto-Refresh**: Real-time or periodic data fetching
4. **Setter Assignment**: Filter by Brendan/Jacques
5. **Search Functionality**: Search across all client data
6. **Mobile Responsive**: Works on all devices
7. **Error Handling**: Graceful failures if API is down

### Nice-to-Have Features
- Status indicators (Active/Onboarding/Inactive)
- Progress tracking for onboarding clients
- Last updated timestamps
- Export functionality (PDF/Print)
- Offline mode with cached data

## Technical Decisions Needed

### Architecture Options
1. **Pure Frontend (Current)**
   - HTML/CSS/JavaScript only
   - Direct Airtable API calls from browser
   - Pros: Simple, no server needed
   - Cons: API key exposed, CORS issues possible

2. **Backend + Frontend**
   - Node.js/Express backend
   - Frontend makes requests to own API
   - Backend handles Airtable/GHL integration
   - Pros: Secure, scalable
   - Cons: More complex, needs hosting

3. **Serverless Functions**
   - Netlify/Vercel functions
   - Static frontend + API endpoints
   - Pros: Secure, scalable, easy deployment
   - Cons: Slight complexity increase

### Airtable Schema Questions
- What table(s) exist in the Airtable base?
- What are the field names for each data point?
- How is the data currently structured?
- Are there relationships between tables (clients, team members, etc.)?

### GoHighLevel Integration Questions
- What specific data do we need from GHL?
- Is it just phone numbers or other contact data?
- Do we have API credentials?
- How often does this data change?

## Workflow Goals

### Current Manual Process (To Be Eliminated)
1. Client fills out onboarding form (PDF)
2. Someone manually updates cheat sheet HTML
3. Team references potentially outdated information

### Desired Automated Process
1. Client information entered in Airtable
2. Cheat sheet automatically updates
3. Team always sees current, accurate data
4. GHL phone numbers sync automatically
5. No manual HTML editing ever needed

## Questions for Planning Session

1. **Airtable Schema**: What's the current structure? Do we need to design it from scratch?
2. **Hosting**: Where will this be hosted? (Local file, GitHub Pages, Netlify, Vercel, own server?)
3. **Authentication**: Who needs access? Is it public or password-protected?
4. **Update Frequency**: Real-time, every 5 minutes, on page refresh?
5. **Data Entry**: Who enters data into Airtable? Is there a form or direct entry?
6. **GHL Priority**: Is GoHighLevel integration Phase 1 or can it wait?
7. **Budget**: Any cost constraints for hosting/services?
8. **Timeline**: When does this need to be live?

## Success Criteria

The project is successful when:
- ✅ Cheat sheet displays all client information accurately
- ⏳ Data updates automatically from Airtable (no manual HTML editing)
- ⏳ Appointment setters can filter by their assigned clients
- ⏳ Search works across all client data
- ⏳ Mobile-friendly and fast-loading
- ⏳ No manual maintenance required
- ⏳ New clients added to Airtable appear automatically
- ⏳ Easy for non-technical team to use

## Current Client List (16 Active)

**Brendan's Clients (9):**
1. Allee Insurance Agency (TN)
2. Arroyo Insurance Services (CA)
3. The Bulow Group (IL)
4. Weer Insurance Group (IL)
5. Insurance Express (FL)
6. UWIB Risk & Insurance Solutions (TN/CA)
7. Koosh Insurance (FL)
8. Maudsley Insurance - State Farm (NV)
9. Insurable Inc (PA)

**Jacques' Clients (7):**
1. Grit Insurance Group (UT)
2. Gerety Insurance (MD)
3. IMD Insurance (TX)
4. Prime Insurance Services (NJ)
5. Ingram Insurance Agency (TN)
6. Premier Group Insurance (IN)
7. Eastman Risk Advisors (UT)

## File Structure
```
/Users/nicktoma/Desktop/Claude Code/Cheat-Sheet/
├── cheat-sheet.html (current static version)
├── project-plan.md
├── ONBOARDING_CHECKLIST.md
├── CURSOR_PLANNING_PROMPT.md (this file)
└── [Future files will include API integration, backend if needed]
```

## What I Need Help Planning

1. **Airtable Schema Design**: Best way to structure the data
2. **Architecture Decision**: Pure frontend vs. backend vs. serverless
3. **API Integration Strategy**: How to fetch and display live data
4. **Security**: How to protect API keys
5. **Deployment Plan**: Where and how to host
6. **Phase Breakdown**: What to build in what order
7. **Error Handling**: What happens when API fails
8. **Data Migration**: How to get current data into Airtable
9. **Testing Strategy**: How to ensure it works reliably
10. **Documentation**: What docs needed for team to maintain

## Output I Need from Planning Session

- **Recommended architecture** with pros/cons
- **Airtable schema** design (tables, fields, relationships)
- **Phase-by-phase implementation plan** with clear milestones
- **Technology stack** recommendations
- **Deployment strategy**
- **Security best practices** for API keys
- **Estimated complexity/time** for each phase
- **Risk assessment** and mitigation strategies

---

**Note**: This is for planning only. Once we have a solid plan, I'll create a comprehensive prompt/document to give back to Claude Code to implement the solution.
