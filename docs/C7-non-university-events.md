# C.7 — Non-University Events

## Overview
Allows trusted community members (trust score ≥ 10) to create and manage community events. Includes discovery integration, RSVP with capacity checks, organizer dashboard with check-in tracking.

## Routes

| Route | Type | Description |
|-------|------|-------------|
| `/events` | Page | Event discovery with all/community tabs |
| `/events/new` | Page | Create community event form |
| `/events/dashboard` | Page | Organizer dashboard with stats and attendee management |

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/events/community` | List community events (filter by type, search, paginate) |
| POST | `/api/events/community` | Create event (trust gate: score ≥ 10) |
| GET | `/api/events/community/[id]` | Event detail with RSVP list (organizer view) |
| POST | `/api/events/community/[id]/rsvp` | Toggle RSVP with capacity check |
| POST | `/api/events/community/[id]/checkin` | Toggle check-in (organizer or self) |

## Components

- **CreateEventForm** — Event creation with type, venue, date, capacity, trust gate warning

## Schema Changes

- **Event** — Added `isCommunity` (Boolean), `eventType` (String, nullable)
- **EventRsvp** — Added `checkedIn` (Boolean)
- Event types: MEETUP, WORKSHOP, SKILL_SHARE, SOCIAL, COWORKING_SESSION

## Features
- Trust gate: minimum score of 10 to create community events
- 5 event types with filtering
- RSVP with capacity enforcement
- Organizer dashboard with upcoming/past events, RSVP counts, check-in tracking
- Self check-in and organizer check-in of attendees
