# SF2: Profile Editing

**Feature:** [Participant Profile & Verification](overview.md)
**Prefix:** PRF-EDIT

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
