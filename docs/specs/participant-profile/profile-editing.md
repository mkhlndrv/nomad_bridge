# SF2: Profile Editing

**Feature:** [Participant Profile & Verification](overview.md)
**Prefix:** PRF-EDIT
> Last updated: 2026-04-01

## Requirements

| ID | Requirement | Priority |
|----|------------|----------|
| PRF-EDIT-01 | Users can edit their name, bio, skills, photo, and location | Must |
| PRF-EDIT-02 | Email cannot be changed (used as unique identifier) | Must |
| PRF-EDIT-03 | Role is assigned at registration and can only be changed by admin | Must |
| PRF-EDIT-04 | Changes save immediately with visual confirmation | Should |

## Frontend Components

- `ProfileEditForm` (Client) — Editable fields: name, bio, skills (tag input), photo upload (2MB), location. Email read-only
  - `SkillTagInput` (Client) — Autocomplete tag input for adding/removing skills

## API Routes

| Route | Method | Logic |
|-------|--------|-------|
| `app/api/profile` | PATCH | Update profile. Validate name/bio length, skills array. Cannot change email/role |
| `app/api/profile/avatar` | POST | Upload profile photo. 2MB limit, JPEG/PNG |

## Precision Clarifications

- **Field validation limits:**
  - Name: required, max 100 characters. Error: `"Name is required"` or `"Name must be under 100 characters"`
  - Bio: optional, max 500 characters. Error: `"Bio must be under 500 characters"`
  - Skills: optional, max 10 tags. Each tag max 30 characters. Stored as comma-separated String. Error: `"Maximum 10 skill tags allowed"` or `"Each skill tag must be under 30 characters"`
  - Location: optional, max 100 characters. Error: `"Location must be under 100 characters"`
- **Immutable fields:** Email and role cannot be changed via the PATCH endpoint. If the request body includes `email` or `role`, silently ignore them (do not error)
- **Profile photo:** 2 MB limit, JPEG/PNG only. Error: `"File too large (max 2MB)"` or `"Only JPEG and PNG files are accepted"`. Stored in `public/uploads/avatars/`. The URL is saved to `User.avatarUrl`
