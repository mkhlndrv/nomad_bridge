# SF1: Profile Display

**Feature:** [Participant Profile & Verification](overview.md)
**Prefix:** PRF-DISPLAY

## Requirements

| ID | Requirement | Priority |
|----|------------|----------|
| PRF-DISPLAY-01 | Display name, bio, profile photo (placeholder if none), role badge (Nomad / University Staff / Admin) | Must |
| PRF-DISPLAY-02 | "About Me" section: free-text bio where nomads describe their background, expertise, and interests | Must |
| PRF-DISPLAY-03 | Skills tags: self-declared skill/topic tags (e.g., "Machine Learning," "UX Design," "Photography") | Must |
| PRF-DISPLAY-04 | Activity summary: number of events attended, guest lectures given, bookings made, forum posts written | Must |
| PRF-DISPLAY-05 | Trust score displayed prominently with a visual indicator (color-coded: green = good, yellow = new/low, red = restricted) | Must |
| PRF-DISPLAY-06 | Location: current city (self-reported, optional) | Could |
| PRF-DISPLAY-07 | Profiles are viewable by other logged-in users | Must |
| PRF-DISPLAY-08 | University staff can view nomad profiles when reviewing RSVP lists or lecture applications | Must |
| PRF-DISPLAY-09 | Users can see their own trust score breakdown (which actions contributed) | Should |

## Frontend Components

- `ProfileHeader` (Server) — Avatar, name, role badge, verification badge, trust score, bio
  - `ProfileAvatar` (Server) — Circular avatar with fallback placeholder. Verification badge overlay
    - `VerificationBadge` (Server) — Displays level: Unverified (gray), Email Verified (blue), Community Verified (green shield) [see SF4]
  - `TrustScoreBadge` (Server) — Color-coded score display: green (>=30), yellow (0-29), red (<0). Shared UI component [see SF3]
- `SkillTags` (Server) — Horizontal list of skill tag badges
- `ActivitySummary` (Server) — 4 stat cards: events attended, lectures given, bookings made, forum posts. Each with lucide icon
- `TrustScoreCard` (Server) — Current score, color indicator, progress toward next verification level, "View History" link [see SF3]

## API Routes

| Route | Method | Logic |
|-------|--------|-------|
| `app/api/profile` | GET | Current user's profile with activity counts (aggregated from EventRsvp, Booking, etc.) |
| `app/api/profile/[id]` | GET | Another user's public profile. Excludes email. Includes activity summary |
