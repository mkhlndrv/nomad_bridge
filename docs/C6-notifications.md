# C.6 — Notifications

## Overview
Multi-channel notification system with in-app center, email/LINE/Telegram mock dispatchers, per-category preferences, rate limiting, and idempotency.

## Routes

| Route | Type | Description |
|-------|------|-------------|
| `/notifications` | Page | Full notification list with pagination |
| `/notifications/preferences` | Page | Per-category channel toggle matrix |

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/notifications` | List notifications (paginated, optional includeArchived) |
| GET | `/api/notifications/unread-count` | Unread badge count |
| POST | `/api/notifications/mark-read` | Mark specific or all notifications as read |
| GET | `/api/notifications/preferences` | Get per-category channel preferences |
| PUT | `/api/notifications/preferences` | Update preferences |

## Components

- **NotificationBell** — Header bell icon with unread count badge, polls every 30s
- **NotificationDropdown** — Popup with recent notifications, mark-all-read, link to full page

## Library Modules

- `lib/notification-types.ts` — Type definitions, category mapping, channel config
- `lib/notifications.ts` — `sendNotification()` orchestrator with rate limiting and dedup
- `lib/mock-email.ts` — Console-logged email mock
- `lib/mock-line.ts` — Console-logged LINE mock
- `lib/mock-telegram.ts` — Console-logged Telegram mock

## Models

- **Notification** — type, category, title, message, linkUrl, read, archived
- **NotificationPreference** — per-user per-category channel toggles (email, LINE, Telegram)

## Features
- 13 notification types across 5 categories (Events, Bookings, Lectures, Community, Trust)
- Rate limiting: max 10 notifications per user per hour
- Idempotency: same (userId, type, linkUrl) deduped within 5 minutes
- Per-category channel preferences with toggle matrix UI
- Real-time unread count polling (30s interval)
