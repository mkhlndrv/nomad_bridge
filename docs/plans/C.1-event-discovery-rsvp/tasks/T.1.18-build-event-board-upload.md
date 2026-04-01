# T.1.18: Build EventBoardUpload Component

**Component:** C.1 — Event Discovery & RSVP
**Sprint:** 4 | **Milestone:** M3
**Estimated Time:** 25m
**Dependencies:** None
**Spec References:** EVT-PHOTO-01, EVT-PHOTO-02, EVT-PHOTO-04

## Description
Build the `EventBoardUpload` client component that allows nomads to photograph physical university event boards/posters and upload them. The component renders as a camera button on the event feed page. Clicking it opens a file input that accepts camera capture (on mobile) or file selection (on desktop). The upload flow includes: select/capture image, preview it, tag it with a university from a dropdown, and submit. On submission, the component calls the POST `/api/events/[id]/photos` endpoint (or creates a draft event via POST `/api/events/draft`). Enforce a 5MB file size limit and JPEG/PNG format restriction.

## Acceptance Criteria
- [ ] Camera/upload button renders on the event feed page with `Camera` icon from lucide-react
- [ ] Clicking the button opens a file input with `accept="image/jpeg,image/png"` and `capture="environment"` for mobile cameras
- [ ] Selected image shows a preview before submission
- [ ] University tag dropdown is required before submission
- [ ] File size validation: reject files > 5MB with error message
- [ ] File type validation: reject non-JPEG/PNG files
- [ ] Submit button sends the image as FormData to the API
- [ ] Loading state during upload with progress indication
- [ ] Success state: "Photo uploaded! A draft event will be created for review"
- [ ] Error state: clear error message with retry option
- [ ] Component can be dismissed/closed without uploading

## Files to Create/Modify
- `app/components/events/EventBoardUpload.tsx` — Upload component with camera/file input, preview, and submission
- `app/components/events/EventFeed.tsx` — (or page.tsx) Add the upload button to the feed layout

## Implementation Notes
- Use `<input type="file" accept="image/jpeg,image/png" capture="environment">` for mobile camera access.
- Store the selected file in `useState<File | null>` and create a preview URL with `URL.createObjectURL(file)`.
- Remember to revoke the object URL on cleanup: `URL.revokeObjectURL(previewUrl)` in a useEffect cleanup.
- File size check: `if (file.size > 5 * 1024 * 1024) { setError('File must be under 5MB') }`.
- Send as FormData: `const formData = new FormData(); formData.append('photo', file); formData.append('university', university);`.
- The upload button on the feed page should be a floating action button (FAB) style on mobile: `fixed bottom-6 right-6` with a camera icon.
- On desktop, it can be a regular button in the filter bar area.
- The draft event creation from a board photo is a stretch feature — for now, just upload the photo and tag it.

## Commit Message
`feat: build EventBoardUpload with camera capture and file validation`
