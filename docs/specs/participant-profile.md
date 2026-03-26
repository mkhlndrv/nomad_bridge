# Specification: Participant Profile & Verification

## Intent / Vibe

Every nomad on NomadBridge should feel like a trusted, visible member of the community — not an anonymous visitor. The profile should tell a story: who they are, what skills they bring, where they've been active, and how reliable they are. University staff reviewing an RSVP or guest lecture application should be able to glance at a profile and feel confident about who they're inviting onto campus. The trust score should feel fair, transparent, and motivating — rewarding good behavior rather than punishing mistakes.

## Core Requirements

### Profile Page
- Display: name, bio, profile photo (optional, placeholder avatar if none), role badge (Nomad / University Staff / Admin).
- "About Me" section: free-text bio where nomads describe their background, expertise, and interests.
- Skills tags: self-declared skill/topic tags (e.g., "Machine Learning," "UX Design," "Photography").
- Activity summary: number of events attended, guest lectures given, bookings made, forum posts written.
- Trust score displayed prominently with a visual indicator (color-coded: green = good, yellow = new/low, red = restricted).
- Location: current city (self-reported, optional).

### Profile Editing
- Users can edit their name, bio, skills, photo, and location.
- Email cannot be changed (used as unique identifier).
- Role is assigned at registration and can only be changed by admin.
- Changes save immediately with visual confirmation.

### Trust Score System
- Score starts at 0 for new users.
- Score increases through positive actions:
  - Attending an event (checked in via QR): +5
  - Completing a guest lecture: +10
  - Receiving a positive rating (4-5 stars): +3 per rating
  - Consistent booking attendance (no no-shows for 5 bookings): +5 bonus
- Score decreases through negative actions:
  - No-show at an event (RSVP but didn't check in): -3
  - Late booking cancellation (< 24 hours): -2
  - Receiving a negative rating (1-2 stars): -2 per rating
- Score cannot go below -10 (floor).
- Score is visible to the user on their profile and to others viewing their profile.

### Verification Levels
- **Unverified:** Default state. Can browse and RSVP.
- **Email Verified:** Confirmed email address. Required to create posts or apply for lectures.
- **Community Verified:** Trust score ≥ 30. Gets a verification badge on profile. Can access premium facilities.

### Profile Visibility
- Profiles are viewable by other logged-in users.
- University staff can view nomad profiles when reviewing RSVP lists or lecture applications.
- Users can see their own trust score breakdown (which actions contributed).

## Edge Cases & Constraints
- New users with score 0 should not feel penalized — use encouraging language ("Build your reputation!").
- Users with negative trust score (< 0) should see a warning and suggestions for improvement.
- Trust score changes should be logged for transparency (user can see history).
- Profile photo upload: max 2MB, JPEG/PNG only, square crop suggested.
- Empty profiles should show helpful prompts ("Add your bio to stand out").
- Prevent display of email addresses to other users (privacy).

## Acceptance Criteria
- Users can view and edit their own profile.
- Trust score updates automatically based on platform activity.
- Verification badges display correctly at each level.
- Activity summary counts are accurate.
- Other users can view profiles (but not edit them).
- Profile is responsive on mobile and desktop.
- Trust score breakdown is accessible to the profile owner.

## Definition of Done
- Profile page renders correctly with all sections
- Edit flow saves changes and shows confirmation
- Trust score calculation is correct and automated
- Verification levels display appropriate badges
- Activity counts match actual database records
- Responsive design on all screen sizes
- Atomic commits used throughout implementation
