# SF3: Event Photo Upload

**Feature:** [University Event Discovery & RSVP](overview.md)
**Prefix:** EVT-PHOTO

## Requirements

| ID | Requirement | Priority |
|----|------------|----------|
| EVT-PHOTO-01 | Nomads can take a photo of a physical university event board/poster and upload it | Should |
| EVT-PHOTO-02 | The platform stores the image and creates a draft event from it (manually filled in by the uploader or admin) | Should |
| EVT-PHOTO-03 | Photos are displayed on the event detail page as a reference for the original announcement | Should |
| EVT-PHOTO-04 | Simple upload flow: camera button on the event feed, snap/upload, tag with university, submit | Should |

## Frontend Components

| Component | Type | Responsibility |
|-----------|------|----------------|
| `EventBoardUpload` | Client | Camera/upload for onsite event board photos. 5MB limit, JPEG/PNG. Creates draft event |
| `EventPhotoGallery` | Server | Grid of uploaded event photos with lightbox. Displayed on event detail page |

## API Routes

| Route | Method | Logic |
|-------|--------|-------|
| `app/api/events/[id]/photos` | POST | Upload event photo. 5MB limit, JPEG/PNG |
| `app/api/events/draft` | POST | Create draft event from board photo upload. Requires admin approval |
