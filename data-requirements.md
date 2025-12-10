# Data Requirements for Appointment Setters Cheat Sheet

## Client Information Needed

For each client, we need to collect the following information:

### Basic Client Details
- **Client Name**: Company/business name
- **Client Status**: Active, Inactive, On Hold, etc.
- **Business Type**: Type of business/industry they operate in

### GoHighLevel Integration
- **Primary GHL Phone Number**: Main number for this client
- **Additional GHL Numbers**: Any backup or specialized numbers
- **GHL Account Details**: Any specific GHL configuration notes

### Geographic Information
- **Licensed States**: All states where client is licensed to operate
  - Format: Two-letter state codes (e.g., CA, NY, TX)
- **Priority States**: States that get priority attention for leads
- **Restricted States**: Any states to avoid or special restrictions

### Team & Personnel
- **Primary Contact**: Main point of contact at client company
- **Secondary Contacts**: Backup contacts
- **Team Members**: Key people at the client company
  - Name, Role, Contact info, Special notes
- **Assigned Setter**: Which appointment setter is assigned to this client

### Business Targeting
- **Target Industries**: Industries to focus on for lead generation
  - Primary industries (highest priority)
  - Secondary industries (backup targets)
- **Industry Restrictions**: Industries to avoid
- **Ideal Customer Profile**: Description of perfect prospects

### Communication & Notes
- **Recent Feedback**: Notes from recent check-in calls
- **Special Instructions**: Any specific requirements or preferences
- **Communication Preferences**: Best times to call, preferred methods
- **Do Not Contact**: Any specific restrictions or no-call preferences
- **Success Metrics**: What they consider successful appointments

### Setter Information
- **Setter Name**: Full name of appointment setter
- **Setter Specialties**: Industries or client types they excel with
- **Setter Schedule**: When they typically work
- **Client Assignments**: Which clients they're responsible for

## Data Collection Format

### Preferred Input Method
- Spreadsheet format (CSV/Excel) for initial bulk input
- Structured forms for ongoing updates
- Direct Airtable entry for real-time changes

### Example Data Structure
```
Client Name | GHL Numbers | Licensed States | Team Members | Assigned Setter | Target Industries | Priority States | Recent Notes
ABC Corp | +1234567890, +1987654321 | CA,NY,TX | John Smith (Owner), Jane Doe (Manager) | Mike Johnson | Real Estate, Insurance | CA,NY | Wants more qualified leads, prefers morning calls
```

## Integration Requirements

### Airtable Schema
- Tables for Clients, Setters, States, Industries
- Relationship fields for connections
- Rich text fields for notes
- Date fields for last updated timestamps

### GoHighLevel Data
- Phone numbers and their status
- Contact information
- Campaign performance data
- Call logs and outcomes

## Update Frequency
- **Real-time**: Critical changes (phone numbers, client status)
- **Daily**: Notes and feedback updates
- **Weekly**: Performance metrics and adjustments
- **Monthly**: Full data review and cleanup