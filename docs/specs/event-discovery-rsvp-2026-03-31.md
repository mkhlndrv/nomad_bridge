# Specification: University Event Discovery & RSVP

## Intent / Vibe

Create a welcoming, effortless experience where digital nomads can discover academic events at Bangkok universities, RSVP with one click, and stay connected after the event through materials and recordings. The discovery flow should feel like scrolling a curated feed — relevant, visual, and fast. Nomads should also be able to snap a photo of a physical event board on campus and have the platform extract event details automatically — bridging the gap between offline bulletin boards and digital discovery.

## Core Requirements

### SF1: Event Feed & Discovery

| ID | Requirement | Priority |
|----|------------|----------|
| EVT-FEED-01 | Show a clean, scrollable feed of upcoming events sorted by date | Must |
| EVT-FEED-02 | Each event card displays: title, date & time (Bangkok timezone), university name, venue, short description, topic tags, RSVP count vs capacity, and a thumbnail image | Must |
| EVT-FEED-03 | Support filtering by: university, date range, event category (workshop, seminar, social, sports, cultural), and topic tags | Must |
| EVT-FEED-04 | Search by keyword across titles, descriptions, and tags | Should |
| EVT-FEED-05 | Events from all universities appear in one unified feed | Must |
| EVT-FEED-06 | Full event information: description, schedule, speakers (if any), location with map placeholder, university branding | Must |
| EVT-FEED-07 | Clear capacity indicator ("12/50 spots remaining") with visual progress bar | Must |
| EVT-FEED-08 | Prominent "RSVP Now" button — changes to "Cancel RSVP" if already registered | Must |
| EVT-FEED-09 | Photo gallery section showing event images or uploaded board photos | Should |
| EVT-FEED-10 | Post-event materials section (visible after event date passes) | Should |

### SF2: RSVP System

| ID | Requirement | Priority |
|----|------------|----------|
| EVT-RSVP-01 | One-click RSVP for authenticated users | Must |
| EVT-RSVP-02 | Enforce capacity limits strictly: if space available, register immediately; if full, offer waitlist with position number | Must |
| EVT-RSVP-03 | After successful RSVP, show confirmation and generate a simple QR code as a check-in pass | Must |
| EVT-RSVP-04 | Prevent duplicate RSVPs (database-level unique constraint on userId + eventId) | Must |
| EVT-RSVP-05 | Allow users to cancel their RSVP, which decrements the count and promotes the next waitlisted person | Must |

### SF3: Event Photo Upload

| ID | Requirement | Priority |
|----|------------|----------|
| EVT-PHOTO-01 | Nomads can take a photo of a physical university event board/poster and upload it | Should |
| EVT-PHOTO-02 | The platform stores the image and creates a draft event from it (manually filled in by the uploader or admin) | Should |
| EVT-PHOTO-03 | Photos are displayed on the event detail page as a reference for the original announcement | Should |
| EVT-PHOTO-04 | Simple upload flow: camera button on the event feed, snap/upload, tag with university, submit | Should |

### SF4: Post-Event Materials

| ID | Requirement | Priority |
|----|------------|----------|
| EVT-MAT-01 | Organizers can upload slides, PDFs, recordings, or links after the event | Should |
| EVT-MAT-02 | Attendees receive a notification when materials are posted | Could |
| EVT-MAT-03 | Materials are listed on the event detail page with file type icons and download links | Should |
| EVT-MAT-04 | Materials are searchable by event title and tags | Could |

## Component Breakdown

### Page Components

| Component | Type | Responsibility |
|-----------|------|----------------|
| `EventDetail` | Server | Full event layout: hero image, description, schedule, speakers, capacity bar, RSVP button, photos, materials. Composes SF2-SF4 components |

### SF1: Event Feed & Discovery

#### Frontend UI Components

| Component | Type | Responsibility |
|-----------|------|----------------|
| `EventFeed` | Server | Fetches and renders paginated event list with filters |
|   `EventFilterBar` | Client | University dropdown, category pills, date range, search. Updates URL params |
|   `EventCard` | Server | Event summary card: thumbnail, title, date, university, venue, tags, capacity bar. Links to detail |
|     `CapacityBar` | Server | Visual progress bar: RSVP count vs capacity (shared UI component) |
|   `EventBoardUpload` | Client | Camera/upload button on the event feed for onsite event board photos |

#### Backend API Routes

| Route | Method | Logic |
|-------|--------|-------|
| `app/api/events` | GET | List events with pagination, filtering (category, university, search, date), sort by date |
| `app/api/events` | POST | Create event. Validate capacity > 0, future date. Community events: check trust >= 10, active <= 5 |
| `app/api/events/[id]` | GET | Single event with creator, RSVPs, materials, photos. Compute `isRsvped` for current user |
| `app/api/events/[id]` | PATCH | Update event (organizer/admin only) |

### SF2: RSVP System

#### Frontend UI Components

| Component | Type | Responsibility |
|-----------|------|----------------|
| `RsvpButton` | Client | Handles RSVP toggle: "RSVP Now" / "Cancel RSVP" / "Join Waitlist" states. Calls API, optimistic UI. Lives inside EventDetail |
|   `RsvpConfirmation` | Client | Modal after RSVP success: QR code display, event summary, "Add to Calendar" link |
| `WaitlistIndicator` | Server | Shows waitlist position number |

#### Backend API Routes

| Route | Method | Logic |
|-------|--------|-------|
| `app/api/events/[id]/rsvp` | POST | RSVP via `$transaction`: check capacity, create EventRsvp, increment count. Waitlist if full. Trigger notification |
| `app/api/events/[id]/rsvp` | DELETE | Cancel RSVP via `$transaction`: delete, decrement count, promote waitlisted. Trigger notification |

### SF3: Event Photo Upload

#### Frontend UI Components

| Component | Type | Responsibility |
|-----------|------|----------------|
| `EventBoardUpload` | Client | Camera/upload for onsite event board photos. 5MB limit, JPEG/PNG. Creates draft event |
| `EventPhotoGallery` | Server | Grid of uploaded event photos with lightbox. Displayed on event detail page |

#### Backend API Routes

| Route | Method | Logic |
|-------|--------|-------|
| `app/api/events/[id]/photos` | POST | Upload event photo. 5MB limit, JPEG/PNG |
| `app/api/events/draft` | POST | Create draft event from board photo upload. Requires admin approval |

### SF4: Post-Event Materials

#### Frontend UI Components

| Component | Type | Responsibility |
|-----------|------|----------------|
| `PostEventMaterials` | Server | File list with type icons and download links. Shown after event date |
| `MaterialUploadForm` | Client | Form for organizers: file upload or URL, title, type selector |

#### Backend API Routes

| Route | Method | Logic |
|-------|--------|-------|
| `app/api/events/[id]/materials` | POST | Upload post-event material (organizer only). Notify attendees |

## Edge Cases & Constraints

- Events in the past should not allow RSVP but should remain browsable with a "Past Event" badge.
- Events with zero capacity should display "Registration Closed."
- Handle users who are already registered — show "You're registered" state.
- Show appropriate empty states: "No upcoming events," "No results for your filters."
- Gracefully handle network or server errors with retry suggestions.
- Photo uploads should be limited in size (max 5MB) and format (JPEG, PNG).
- Draft events from photo uploads require admin approval before appearing in the feed.

## Acceptance Criteria

- Users can browse and filter events without being logged in [EVT-FEED-01, EVT-FEED-03]
- Logged-in users can RSVP with immediate visual feedback (button state change, count update) [EVT-RSVP-01, EVT-RSVP-03]
- Capacity is strictly enforced — no over-registration [EVT-RSVP-02, EVT-RSVP-04]
- RSVP data is correctly saved and rsvpCount stays in sync [EVT-RSVP-02, EVT-RSVP-05]
- Photo upload flow works end-to-end: capture, upload, display on event [EVT-PHOTO-01, EVT-PHOTO-03]
- Post-event materials are uploadable by organizers and visible to attendees [EVT-MAT-01, EVT-MAT-03]
- The interface is fully responsive on mobile and desktop
- All error messages are clear and actionable

## Definition of Done

- Feature works end-to-end in development
- Fully responsive design (mobile-first)
- Basic error handling and user feedback
- RSVP logic uses Prisma $transaction to keep counts in sync
- Photo upload stores images and associates them with events
- Post-event materials are uploadable and downloadable
- At least one atomic commit per major part
