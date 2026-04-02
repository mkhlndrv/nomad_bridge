# C.8 — Manage Recordings

## Overview
Recording library for event sessions. Supports multiple source types (tldv, YouTube, Vimeo, upload), visibility controls, transcript display, highlights, view counting, and personal timestamped notes.

## Routes

| Route | Type | Description |
|-------|------|-------------|
| `/recordings` | Page | Recording library grid with search and pagination |
| `/recordings/[id]` | Page | Recording player with transcript, highlights, and notes |

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/recordings` | List public recordings (search, filter by eventId, paginate) |
| POST | `/api/recordings` | Upload/link recording to event (auth required) |
| GET | `/api/recordings/[id]` | Recording detail with view count increment |
| GET | `/api/recordings/[id]/notes` | Get user's personal notes for recording |
| POST | `/api/recordings/[id]/notes` | Add timestamped note to recording |

## Components

- **RecordingNotes** — Client component for CRUD timestamped personal notes

## Models

- **Recording** — title, sourceType, sourceUrl, thumbnailUrl, duration, transcript, highlights (JSON), visibility, viewCount, sortOrder
- **RecordingNote** — content, timestamp (seconds), per-user per-recording

## Enums

- **RecordingSourceType** — TLDV, YOUTUBE, VIMEO, UPLOAD
- **RecordingVisibility** — PUBLIC, ATTENDEES_ONLY, UNLISTED

## Features
- Grid layout library with duration badges, view counts, source type labels
- YouTube embed support in player page
- Transcript display with scrollable container
- JSON-based highlights with timestamp links
- Personal timestamped notes with add form
- View count tracking (incremented on page load)
- Search across recording title and event title
