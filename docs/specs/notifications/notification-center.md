# SF5: In-App Notification Center

**Feature:** [Notifications (Email, LINE & Telegram)](overview.md)
**Prefix:** NTF-CENTER

## Requirements

| ID | Requirement | Priority |
|----|------------|----------|
| NTF-CENTER-01 | Bell icon in the header shows unread count badge | Must |
| NTF-CENTER-02 | Dropdown/page shows recent notifications in chronological order | Must |
| NTF-CENTER-03 | Each notification: icon, short message, timestamp, read/unread status | Must |
| NTF-CENTER-04 | Click a notification to navigate to the relevant page | Must |
| NTF-CENTER-05 | "Mark all as read" action | Should |
| NTF-CENTER-06 | Users can toggle each channel independently: Email ON/OFF, LINE ON/OFF, Telegram ON/OFF | Must |
| NTF-CENTER-07 | Toggle by category: Events, Bookings, Lectures, Community, Trust Score | Should |
| NTF-CENTER-08 | Default: all notifications ON for all channels | Must |
| NTF-CENTER-09 | Preferences are respected — never send a notification the user has turned off | Must |

## Frontend Components

- `NotificationBell` (Client) — Bell icon in navbar with unread count badge. Click opens dropdown. Polls for updates
  - `NotificationDropdown` (Client) — Last 10 notifications, "Mark all read" button, "View all" link
    - `NotificationItem` (Client) — Icon by type, short message, relative timestamp, read/unread styling. Click navigates + marks read
- `NotificationCenter` (Server) — Full page: paginated notification list. Filter: All/Unread. Grouped by date
  - `NotificationItem` (Client) — Reused from dropdown
- `NotificationPreferences` (Client) — Settings grid: rows = categories (Events/Bookings/Lectures/Community/Trust), cols = channels (Email/LINE/Telegram). Toggle switches
  - `NotificationToggle` (Client) — Single toggle switch component

## API Routes

| Route | Method | Logic |
|-------|--------|-------|
| `app/api/notifications` | GET | Current user's notifications. Paginated. Optional `unread=true` filter |
| `app/api/notifications/unread-count` | GET | Unread count for bell badge polling |
| `app/api/notifications/mark-read` | POST | Mark specific IDs or all as read |
| `app/api/notifications/preferences` | GET | Current user's preference matrix |
| `app/api/notifications/preferences` | PUT | Update preferences |
