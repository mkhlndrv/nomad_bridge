# T.1.20: Build PostEventMaterials Section

**Component:** C.1 — Event Discovery & RSVP
**Sprint:** 4 | **Milestone:** M3
**Estimated Time:** 20m
**Dependencies:** None
**Spec References:** EVT-MAT-01, EVT-MAT-03

## Description
Build the `PostEventMaterials` server component that displays a list of materials (slides, PDFs, recordings, links) associated with a past event. The component renders on the EventDetail page and is only visible when the event date has passed. Each material is displayed as a row with a file type icon, title, and a download/open link. Also build the `MaterialUploadForm` client component that allows organizers to upload new materials — a form with file upload or URL input, title field, and a file type selector (PDF, Slides, Video, Link).

## Acceptance Criteria
- [ ] `PostEventMaterials` component renders a list of materials with: file type icon, title, download link
- [ ] File type icons: `FileText` for pdf, `Presentation` for slides, `Video` for video, `ExternalLink` for link
- [ ] Each material has a clickable download/open action
- [ ] Section header: "Event Materials" with a `Folder` icon
- [ ] Shows "No materials uploaded yet" placeholder when the list is empty
- [ ] `MaterialUploadForm` renders: file input OR URL input (toggle), title text field, file type dropdown
- [ ] Upload form validates that either a file or URL is provided
- [ ] Upload form has a submit button that calls POST `/api/events/[id]/materials`
- [ ] Upload form only visible to event organizers (creator) — hide for regular attendees
- [ ] Both components are responsive

## Files to Create/Modify
- `app/components/events/PostEventMaterials.tsx` — Material list display component
- `app/components/events/MaterialUploadForm.tsx` — Material upload form client component

## Implementation Notes
- `PostEventMaterials` is a server component receiving `materials: EventMaterial[]` as a prop.
- Use lucide-react icons mapped by file type: `{ pdf: FileText, slides: Presentation, video: Video, link: ExternalLink }`.
- For download links: if `fileType` is "link", open in new tab; otherwise, use `<a download>` attribute.
- `MaterialUploadForm` uses `"use client"` and manages form state with useState.
- The form toggles between file upload and URL input based on a radio button or tab selector.
- File type options: "PDF", "Slides", "Video", "Link" — maps to the `fileType` field in EventMaterial.
- Send file as FormData similar to the photo upload flow.
- The `isOrganizer` check is done by the parent (EventDetail) and passed as a prop to conditionally render the form.

## Commit Message
`feat: build post-event materials display and upload form`
