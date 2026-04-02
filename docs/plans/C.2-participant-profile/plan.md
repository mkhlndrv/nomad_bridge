# C.2: Participant Profile & Verification — Implementation Plan

**Spec:** `docs/specs/participant-profile/overview.md`
**Prefix:** PRF | **Sub-features:** 4 | **Requirements:** 26
**Dependencies:** None (foundational — built first)
**Sprints:** 3 | **Tasks:** 17

---

## Sprint 1 — Schema + Mockups [Milestone M1: Mockup Ready]

| Task | Title | Est. | Deps |
|------|-------|------|------|
| [T.2.01](tasks/T.2.01-update-user-schema.md) | Update User schema for profile fields | 25m | — |
| [T.2.02](tasks/T.2.02-create-profile-seed-data.md) | Create profile seed data | 20m | T.2.01 |
| [T.2.03](tasks/T.2.03-build-profile-header.md) | Build ProfileHeader mockup | 25m | T.2.02 |
| [T.2.04](tasks/T.2.04-build-trust-score-badge.md) | Build TrustScoreBadge shared component | 20m | — |
| [T.2.05](tasks/T.2.05-build-skill-tags-activity.md) | Build SkillTags + ActivitySummary mockups | 25m | — |
| [T.2.06](tasks/T.2.06-build-profile-page-layout.md) | Build profile page layout | 25m | T.2.03, T.2.04, T.2.05 |

### M1 Definition of Done
- [ ] Profile page renders at `/profile` and `/profile/[id]` with seed data
- [ ] TrustScoreBadge shows green (>=30), yellow (0-29), red (<0)
- [ ] SkillTags render as horizontal badge list
- [ ] ActivitySummary shows 4 stat cards with lucide icons
- [ ] Layout responsive at 375px and 1280px
- [ ] Seed data: 5 users with varying trust scores and roles

### M1 Tests
- [ ] TrustScoreBadge renders correct color for scores: 50, 15, -3
- [ ] Profile page renders all sections without errors
- [ ] Responsive layout check at mobile/desktop breakpoints

---

## Sprint 2 — API Routes + Data Connection [Milestone M2: Basic Functionality]

| Task | Title | Est. | Deps |
|------|-------|------|------|
| [T.2.07](tasks/T.2.07-get-profile-api.md) | GET /api/profile — current user profile | 25m | T.2.01 |
| [T.2.08](tasks/T.2.08-get-public-profile-api.md) | GET /api/profile/[id] — public profile | 20m | T.2.07 |
| [T.2.09](tasks/T.2.09-patch-profile-api.md) | PATCH /api/profile — update profile | 25m | T.2.07 |
| [T.2.10](tasks/T.2.10-connect-profile-page.md) | Connect profile page to API | 25m | T.2.07, T.2.08 |
| [T.2.11](tasks/T.2.11-build-profile-edit-form.md) | Build ProfileEditForm | 30m | T.2.09 |

### M2 Definition of Done
- [ ] GET /api/profile returns user with correct activity counts
- [ ] GET /api/profile/[id] excludes email, returns 404 for missing user
- [ ] PATCH /api/profile validates and saves name, bio, skills, location
- [ ] PATCH cannot change email or role
- [ ] Profile page shows real database data
- [ ] Edit form saves and reflects changes immediately
- [ ] Loading states shown during data fetch

### M2 Tests
- [ ] API: GET profile returns expected shape with activity counts
- [ ] API: GET public profile excludes email
- [ ] API: GET missing profile returns 404
- [ ] API: PATCH rejects name >100 chars
- [ ] API: PATCH cannot change email or role
- [ ] API: PATCH saves valid updates correctly

---

## Sprint 3 — Trust Score + Verification [Milestone M3: Full Functionality]

| Task | Title | Est. | Deps |
|------|-------|------|------|
| [T.2.12](tasks/T.2.12-implement-trust-score-lib.md) | Implement lib/trust-score.ts | 30m | T.2.01 |
| [T.2.13](tasks/T.2.13-get-trust-history-api.md) | GET /api/profile/trust-history | 20m | T.2.12 |
| [T.2.14](tasks/T.2.14-build-trust-score-card.md) | Build TrustScoreCard + TrustScoreHistory | 25m | T.2.13 |
| [T.2.15](tasks/T.2.15-build-verification-badge.md) | Build VerificationBadge component | 20m | T.2.12 |
| [T.2.16](tasks/T.2.16-post-avatar-upload-api.md) | POST /api/profile/avatar — photo upload | 25m | — |
| [T.2.17](tasks/T.2.17-wire-verification-badges.md) | Wire verification badges across profile | 20m | T.2.15 |

### M3 Definition of Done
- [ ] adjustTrustScore enforces floor of -10
- [ ] Trust score log entries created for every adjustment
- [ ] Trust history page shows paginated score changes
- [ ] Verification levels: unverified, email verified, community (>=30)
- [ ] VerificationBadge: gray, blue checkmark, green shield
- [ ] Avatar upload works with 2MB/JPEG+PNG validation
- [ ] Empty profiles show encouraging prompts
- [ ] All 26 PRF-* requirements from spec satisfied
- [ ] All unit and integration tests passing

### M3 Tests
- [ ] adjustTrustScore: positive delta
- [ ] adjustTrustScore: negative delta
- [ ] adjustTrustScore: floor enforcement at -10
- [ ] calculateVerificationLevel: all 3 levels
- [ ] Avatar upload: valid file accepted
- [ ] Avatar upload: >2MB rejected
- [ ] Avatar upload: non-image rejected
- [ ] Trust history: paginated, newest first
