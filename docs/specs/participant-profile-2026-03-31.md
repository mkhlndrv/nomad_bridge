# Specification: Participant Profile & Verification

## Intent / Vibe

Every nomad on NomadBridge should feel like a trusted, visible member of the community — not an anonymous visitor. The profile should tell a story: who they are, what skills they bring, where they've been active, and how reliable they are. University staff reviewing an RSVP or guest lecture application should be able to glance at a profile and feel confident about who they're inviting onto campus. The trust score should feel fair, transparent, and motivating — rewarding good behavior rather than punishing mistakes.

## Core Requirements

### SF1: Profile Display

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

### SF2: Profile Editing

| ID | Requirement | Priority |
|----|------------|----------|
| PRF-EDIT-01 | Users can edit their name, bio, skills, photo, and location | Must |
| PRF-EDIT-02 | Email cannot be changed (used as unique identifier) | Must |
| PRF-EDIT-03 | Role is assigned at registration and can only be changed by admin | Must |
| PRF-EDIT-04 | Changes save immediately with visual confirmation | Should |

### SF3: Trust Score System

| ID | Requirement | Priority |
|----|------------|----------|
| PRF-TRUST-01 | Score starts at 0 for new users | Must |
| PRF-TRUST-02 | Attending an event (checked in via QR): +5 | Must |
| PRF-TRUST-03 | Completing a guest lecture: +10 | Must |
| PRF-TRUST-04 | Receiving a positive rating (4-5 stars): +3 per rating | Should |
| PRF-TRUST-05 | Consistent booking attendance (no no-shows for 5 bookings): +5 bonus | Could |
| PRF-TRUST-06 | No-show at an event (RSVP but didn't check in): -3 | Must |
| PRF-TRUST-07 | Late booking cancellation (< 24 hours): -2 | Should |
| PRF-TRUST-08 | Receiving a negative rating (1-2 stars): -2 per rating | Should |
| PRF-TRUST-09 | Score cannot go below -10 (floor) | Must |
| PRF-TRUST-10 | Score is visible to the user on their profile and to others viewing their profile | Must |

### SF4: Verification Levels

| ID | Requirement | Priority |
|----|------------|----------|
| PRF-VERIFY-01 | Unverified: Default state. Can browse and RSVP | Must |
| PRF-VERIFY-02 | Email Verified: Confirmed email address. Required to create posts or apply for lectures | Must |
| PRF-VERIFY-03 | Community Verified: Trust score >= 30. Gets a verification badge on profile. Can access premium facilities | Must |

## Component Breakdown

### SF1: Profile Display

- `ProfileHeader` (Server) — Avatar, name, role badge, verification badge, trust score, bio
  - `ProfileAvatar` (Server) — Circular avatar with fallback placeholder. Verification badge overlay
    - `VerificationBadge` (Server) — Displays level: Unverified (gray), Email Verified (blue), Community Verified (green shield) [see SF4]
  - `TrustScoreBadge` (Server) — Color-coded score display: green (>=30), yellow (0-29), red (<0). Shared UI component [see SF3]
- `SkillTags` (Server) — Horizontal list of skill tag badges
- `ActivitySummary` (Server) — 4 stat cards: events attended, lectures given, bookings made, forum posts. Each with lucide icon
- `TrustScoreCard` (Server) — Current score, color indicator, progress toward next verification level, "View History" link [see SF3]

### SF2: Profile Editing

- `ProfileEditForm` (Client) — Editable fields: name, bio, skills (tag input), photo upload (2MB), location. Email read-only
  - `SkillTagInput` (Client) — Autocomplete tag input for adding/removing skills

### SF3: Trust Score System

- `TrustScoreCard` (Server) — Also referenced in SF1
  - `TrustScoreHistory` (Client) — Paginated timeline of score changes with reason, delta, date, running total

### SF4: Verification Levels

- `VerificationBadge` (Server) — Also referenced in SF1

### Shared Logic

**`lib/trust-score.ts`:**
- `adjustTrustScore(userId, delta, reason)` — atomic update with floor of -10, creates log entry
- `calculateVerificationLevel(user)` — returns level based on email verified + trust score >= 30

### Backend API Routes

**SF1: Profile Display**

| Route | Method | Logic |
|-------|--------|-------|
| `app/api/profile` | GET | Current user's profile with activity counts (aggregated from EventRsvp, Booking, etc.) |
| `app/api/profile/[id]` | GET | Another user's public profile. Excludes email. Includes activity summary |

**SF2: Profile Editing**

| Route | Method | Logic |
|-------|--------|-------|
| `app/api/profile` | PATCH | Update profile. Validate name/bio length, skills array. Cannot change email/role |
| `app/api/profile/avatar` | POST | Upload profile photo. 2MB limit, JPEG/PNG |

**SF3: Trust Score System**

| Route | Method | Logic |
|-------|--------|-------|
| `app/api/profile/trust-history` | GET | Paginated trust score change log for current user |

## Edge Cases & Constraints

- New users with score 0 should not feel penalized — use encouraging language ("Build your reputation!").
- Users with negative trust score (< 0) should see a warning and suggestions for improvement.
- Trust score changes should be logged for transparency (user can see history).
- Profile photo upload: max 2MB, JPEG/PNG only, square crop suggested.
- Empty profiles should show helpful prompts ("Add your bio to stand out").
- Prevent display of email addresses to other users (privacy).

## Acceptance Criteria

- Users can view and edit their own profile (PRF-DISPLAY-01, PRF-EDIT-01).
- Trust score updates automatically based on platform activity (PRF-TRUST-02 through PRF-TRUST-08).
- Verification badges display correctly at each level (PRF-VERIFY-01, PRF-VERIFY-02, PRF-VERIFY-03).
- Activity summary counts are accurate (PRF-DISPLAY-04).
- Other users can view profiles but not edit them (PRF-DISPLAY-07, PRF-EDIT-02, PRF-EDIT-03).
- Profile is responsive on mobile and desktop.
- Trust score breakdown is accessible to the profile owner (PRF-DISPLAY-09, PRF-TRUST-10).

## Definition of Done

- Profile page renders correctly with all sections
- Edit flow saves changes and shows confirmation
- Trust score calculation is correct and automated
- Verification levels display appropriate badges
- Activity counts match actual database records
- Responsive design on all screen sizes
- Atomic commits used throughout implementation
