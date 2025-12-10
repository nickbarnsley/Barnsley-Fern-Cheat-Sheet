# Airtable Database Schema for Cheat Sheet

## Database Structure

### Table 1: Clients
**Purpose**: Main client information and configuration

| Field Name | Field Type | Description | Example |
|------------|------------|-------------|---------|
| Client Name | Single line text | Primary client identifier | "ABC Real Estate" |
| Client ID | Autonumber | Unique identifier | 1, 2, 3... |
| Status | Single select | Client status | Active, Inactive, On Hold |
| Business Type | Single line text | Type of business | "Real Estate Agency" |
| Primary GHL Phone | Phone number | Main GoHighLevel number | +1-555-123-4567 |
| Additional GHL Phones | Long text | Other GHL numbers (comma separated) | "+1-555-987-6543, +1-555-456-7890" |
| Licensed States | Multiple select | States where licensed | CA, NY, TX, FL |
| Priority States | Multiple select | Priority states for leads | CA, NY |
| Target Industries | Multiple select | Industries to target | Real Estate, Insurance |
| Assigned Setter | Link to Setters table | Who handles this client | Link to Mike Johnson |
| Recent Notes | Long text | Latest feedback/notes | "Wants more morning appointments" |
| Last Updated | Last modified time | Auto-timestamp | 2024-01-15 14:30:00 |
| Created Date | Created time | Auto-timestamp | 2024-01-01 09:00:00 |

### Table 2: Setters
**Purpose**: Appointment setter information and assignments

| Field Name | Field Type | Description | Example |
|------------|------------|-------------|---------|
| Setter Name | Single line text | Full name | "Mike Johnson" |
| Setter ID | Autonumber | Unique identifier | 1, 2, 3... |
| Email | Email | Contact email | mike@company.com |
| Phone | Phone number | Contact phone | +1-555-111-2222 |
| Specialties | Multiple select | Industry specialties | Real Estate, Solar |
| Active Status | Checkbox | Currently active | ✓ |
| Assigned Clients | Link to Clients table | Clients they handle | Links to client records |
| Work Schedule | Long text | When they work | "Mon-Fri 9AM-5PM PST" |
| Performance Notes | Long text | Performance feedback | "Great with real estate clients" |

### Table 3: Team Members
**Purpose**: Client company personnel information

| Field Name | Field Type | Description | Example |
|------------|------------|-------------|---------|
| Name | Single line text | Full name | "John Smith" |
| Client | Link to Clients table | Which client they work for | Link to ABC Real Estate |
| Role | Single line text | Their position | "Owner", "Manager" |
| Email | Email | Contact email | john@abcrealty.com |
| Phone | Phone number | Contact phone | +1-555-333-4444 |
| Primary Contact | Checkbox | Is this the main contact | ✓ |
| Notes | Long text | Special notes about this person | "Available weekday mornings" |

### Table 4: Industries
**Purpose**: Master list of target industries

| Field Name | Field Type | Description | Example |
|------------|------------|-------------|---------|
| Industry Name | Single line text | Industry identifier | "Real Estate" |
| Description | Long text | Industry description | "Residential and commercial..." |
| Active | Checkbox | Currently targeting | ✓ |
| Priority Level | Single select | High, Medium, Low | High |

### Table 5: States
**Purpose**: Master list of US states for licensing

| Field Name | Field Type | Description | Example |
|------------|------------|-------------|---------|
| State Code | Single line text | Two-letter code | "CA" |
| State Name | Single line text | Full state name | "California" |
| Active | Checkbox | Currently operating | ✓ |
| Notes | Long text | Special state considerations | "Requires specific licensing" |

### Table 6: Call Notes
**Purpose**: Track recent feedback and updates

| Field Name | Field Type | Description | Example |
|------------|------------|-------------|---------|
| Note ID | Autonumber | Unique identifier | 1, 2, 3... |
| Client | Link to Clients table | Related client | Link to ABC Real Estate |
| Date | Date | When note was created | 2024-01-15 |
| Category | Single select | Type of note | Feedback, Instruction, Update |
| Note Text | Long text | The actual note | "Client prefers morning calls" |
| Added By | Single line text | Who added the note | "John Manager" |
| Priority | Single select | Importance level | High, Medium, Low |

## Relationships

### Client → Setters
- Many-to-one: Multiple clients can have the same setter
- One-to-many: One setter can have multiple clients

### Client → Team Members
- One-to-many: One client can have multiple team members

### Client → Call Notes
- One-to-many: One client can have multiple notes

## API Integration Points

### Airtable API Endpoints
- `GET /v0/{baseId}/Clients` - Fetch all clients
- `GET /v0/{baseId}/Setters` - Fetch all setters
- `PATCH /v0/{baseId}/Clients/{recordId}` - Update client info
- `POST /v0/{baseId}/Call Notes` - Add new notes

### Data Sync Strategy
1. **Pull on Load**: Fetch fresh data when cheat sheet opens
2. **Periodic Refresh**: Auto-refresh every 15 minutes
3. **Manual Refresh**: Button to force data update
4. **Real-time Updates**: WebSocket connection for instant updates (future enhancement)

## Security Considerations
- API key stored securely (environment variables)
- Read-only access for cheat sheet display
- Write access only for authorized users
- Data validation on all inputs