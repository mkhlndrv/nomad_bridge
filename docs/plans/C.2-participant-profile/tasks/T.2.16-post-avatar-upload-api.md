# T.2.16: POST /api/profile/avatar — Photo Upload

**Component:** C.2 — Participant Profile & Verification
**Sprint:** 3 | **Milestone:** M3
**Estimated Time:** 25m
**Dependencies:** None
**Spec References:** PRF-EDIT-01, PRF-DISPLAY-01

## Description
Create the POST `/api/profile/avatar` API route that handles profile photo uploads. The endpoint accepts a multipart form data request with a single image file. It must validate: file size is <= 2MB, file type is JPEG or PNG only. On successful validation, save the file to the `public/uploads/avatars/` directory with a unique filename (using the user ID and timestamp to prevent collisions), update the user's `avatarUrl` field in the database, and return the new avatar URL. If the user already has an avatar, delete the old file before saving the new one. Return appropriate error messages for validation failures.

## Acceptance Criteria
- [ ] Route handler at `app/api/profile/avatar/route.ts` responds to POST
- [ ] Accepts multipart form data with an `avatar` file field
- [ ] Rejects files > 2MB with 400 error and clear message
- [ ] Rejects non-JPEG/PNG files with 400 error and clear message
- [ ] Saves file to `public/uploads/avatars/` with unique filename
- [ ] Updates user's `avatarUrl` in database
- [ ] Deletes old avatar file if user had a previous one
- [ ] Returns `{ avatarUrl: "/uploads/avatars/..." }` on success
- [ ] Returns 401 if no user identified
- [ ] Handles missing file field gracefully

## Files to Create/Modify
- `app/api/profile/avatar/route.ts` — Create POST route handler
- `public/uploads/avatars/.gitkeep` — Create directory placeholder (add `public/uploads/` to .gitignore)

## Implementation Notes
- Use Next.js built-in `request.formData()` to parse multipart data.
- Get the file: `const file = formData.get("avatar") as File`.
- Validate MIME type: check `file.type` is `"image/jpeg"` or `"image/png"`.
- Validate size: `file.size <= 2 * 1024 * 1024` (2MB).
- Generate filename: `${userId}-${Date.now()}.${ext}` where ext is derived from MIME type.
- Use Node.js `fs.writeFile` to save the buffer: `await fs.writeFile(path, Buffer.from(await file.arrayBuffer()))`.
- For old avatar deletion: read current `avatarUrl`, derive file path, use `fs.unlink` (wrapped in try/catch).
- Add `public/uploads/` to `.gitignore` to avoid committing uploaded files.
- Same temporary auth pattern as T.2.07.

## Commit Message
`feat: add POST /api/profile/avatar with file validation`
