# NomadBridge Knowledge Base

## Project Goal
A platform that connects digital nomads in Bangkok with local universities (Chulalongkorn, Thammasat, KMUTT, etc.) for academic events, campus facility access, guest lectures, and community.

## Core Users
- Digital Nomads (main users)
- University Admins / Staff
- Platform Admin (for demo purposes)

## Main Features (MVP)
1. University Event Discovery & RSVP (with capacity and waitlist)
2. Nomad Profile & Basic Trust Score
3. Campus Facility Access Booking (with QR code pass)
4. Skill Exchange Board (guest lecture requests and offers)
5. Simple Threaded Community Discussion Board
6. Notifications (email + mock LINE)

## Tech Stack
- Next.js 15 (App Router) + TypeScript + Tailwind CSS
- Prisma + SQLite
- lucide-react for icons

## Key Entities
- User (name, email, bio, role, trustScore)
- Event (title, date, venue, description, capacity, university)
- Facility (name, location, capacity, hours, price)
- Booking (user, facility, time slot, qrCode)
- LectureOpportunity (topic, format, compensation type)
- ForumPost (threaded discussion)

## Non-functional Requirements
- Fully responsive design
- Simple and fast event feed
- Clean, modern UI