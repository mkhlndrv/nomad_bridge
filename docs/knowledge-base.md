# NomadBridge Knowledge Base

## Project Goal
A platform that connects digital nomads in Bangkok with local universities (Chulalongkorn, Thammasat, KMUTT, etc.) for academic events, campus facility access, guest lectures, and community.

## Core Users
- Digital Nomads (main users)
- University Admins / Staff
- Event Organizers (nomads who host community events)
- Platform Admin (for demo purposes)

## Main Features (MVP)
1. University Event Discovery & RSVP (with capacity, waitlist, photo upload of onsite event boards, and post-event materials)
2. Participant Profile & Verification (with Basic Trust Score)
3. Skill Exchange Board (two-sided guest lecture marketplace)
4. Campus Facility Access Booking (with QR code pass and cancellation policy)
5. Community Discussion Board (threaded forum with categories)
6. Notifications (LINE + Email with in-app notification center)
7. Non-University Events Organizer (nomad-hosted meetups, workshops, skill shares)
8. Manage Recordings (tl;dv integration for live event and webinar recordings)

## Tech Stack
- Next.js 15 (App Router) + TypeScript + Tailwind CSS
- Prisma + SQLite
- lucide-react for icons

## Key Entities
- User (name, email, bio, role, trustScore, verification level)
- Event (title, date, venue, description, capacity, university, category, isCommunit)
- EventRsvp (userId + eventId unique pair)
- Facility (name, university, type, location, hours, price, availability)
- Booking (user, facility, time slot, status, qrCode)
- LectureOpportunity (topic, format, compensation type, status)
- ForumPost (title, content, category, replies, upvotes)
- Notification (userId, type, channel, message, read status)
- Recording (eventId, source, url, transcript, visibility)

## Non-functional Requirements
- Fully responsive design (mobile-first)
- Simple and fast event feed
- Clean, modern UI with consistent card-based layouts
- All dates stored in UTC, displayed in Asia/Bangkok timezone
