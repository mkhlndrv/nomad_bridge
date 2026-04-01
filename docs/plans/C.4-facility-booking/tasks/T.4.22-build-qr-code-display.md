# T.4.22: Build QrCodeDisplay Shared Component

**Component:** C.4 — Campus Facility Access Booking
**Sprint:** 5 | **Milestone:** M3
**Estimated Time:** 20m
**Dependencies:** None
**Spec References:** FAC-MGR-03, FAC-MYBK-03

## Description
Build a shared `QrCodeDisplay` client component that renders a QR code image from a string value. This component is used in the booking confirmation view, the "My Bookings" page, and anywhere a booking QR code needs to be displayed. Use a lightweight QR code generation library (e.g., `qrcode` or `qrcode.react`) to render the QR code as an SVG or canvas element. The component should be self-contained, accept a string value, and render a scannable QR code with appropriate sizing and styling.

## Acceptance Criteria
- [ ] `QrCodeDisplay` is a `"use client"` component accepting `value` (string) and optional `size` (number, default 200) props
- [ ] Renders a QR code image from the provided string value
- [ ] QR code is rendered as SVG for crisp display at any size
- [ ] Includes a subtle border/frame around the QR code for visual clarity
- [ ] Shows the booking code text below the QR code (e.g., "NB-FAC-abc123")
- [ ] Handles empty or undefined value gracefully — shows a placeholder message instead of a broken QR
- [ ] QR code is scannable when tested with a phone camera or QR scanner app
- [ ] Component is responsive: scales down on small screens while remaining scannable
- [ ] Accessible: includes `aria-label` describing the QR code purpose

## Files to Create/Modify
- `app/components/QrCodeDisplay.tsx` — Shared client component for rendering QR codes from string values

## Implementation Notes
- Install `qrcode.react` as a dependency — it provides a simple React component for QR code rendering with SVG output.
- The `value` prop is the QR code string generated on booking approval (format: `NB-FAC-{requestId}-{random6chars}`).
- Use SVG rendering mode (`renderAs="svg"`) for sharp display on retina screens.
- Add a white background with padding around the QR code to ensure scanners can read it.
- This component is shared across multiple features — keep it in the shared components directory.
- Consider adding a "Download QR" button that saves the QR as a PNG (stretch goal, not required).

## Commit Message
`feat: add QrCodeDisplay shared component`
