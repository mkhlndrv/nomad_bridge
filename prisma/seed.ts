import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import path from "path";

const url = "file:" + path.join(__dirname, "..", "dev.db");
const adapter = new PrismaBetterSqlite3({ url });
const prisma = new PrismaClient({ adapter });

async function main() {
  // Clean existing data
  await prisma.recordingNote.deleteMany();
  await prisma.recording.deleteMany();
  await prisma.notificationPreference.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.forumBookmark.deleteMany();
  await prisma.forumVote.deleteMany();
  await prisma.forumReply.deleteMany();
  await prisma.forumPost.deleteMany();
  await prisma.collaborationFeedback.deleteMany();
  await prisma.collaborationApplication.deleteMany();
  await prisma.collaborationOpportunity.deleteMany();
  await prisma.bookingInterest.deleteMany();
  await prisma.bookingRequest.deleteMany();
  await prisma.eventMaterial.deleteMany();
  await prisma.eventPhoto.deleteMany();
  await prisma.eventRsvp.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.facility.deleteMany();
  await prisma.trustScoreLog.deleteMany();
  await prisma.event.deleteMany();
  await prisma.user.deleteMany();

  // ─── Users ───────────────────────────────────────────
  const alice = await prisma.user.create({
    data: {
      id: "user-alice",
      name: "Alice Chen",
      email: "alice@nomad.dev",
      bio: "Full-stack dev from Taiwan, coworking addict. Love building web apps and exploring Bangkok's cafe scene.",
      role: "NOMAD",
      trustScore: 42,
      skills: "TypeScript, React, Node.js, Python, UX Design",
      location: "Bangkok, Thailand",
      emailVerified: true,
      verificationLevel: "COMMUNITY_VERIFIED",
    },
  });

  const bob = await prisma.user.create({
    data: {
      id: "user-bob",
      name: "Bob Martinez",
      email: "bob@nomad.dev",
      bio: "Designer & yoga teacher from Mexico. Passionate about mindful design and community building.",
      role: "NOMAD",
      trustScore: 18,
      skills: "UI Design, Figma, Yoga, Photography, Spanish",
      location: "Chiang Mai, Thailand",
      emailVerified: true,
      verificationLevel: "EMAIL_VERIFIED",
    },
  });

  const chula = await prisma.user.create({
    data: {
      id: "user-chula",
      name: "Dr. Somchai Prasert",
      email: "somchai@chula.ac.th",
      bio: "Associate Professor of Computer Science at Chulalongkorn University. Organizing tech events and workshops.",
      role: "UNIVERSITY",
      trustScore: 100,
      skills: "Machine Learning, Research, Teaching",
      location: "Bangkok, Thailand",
      emailVerified: true,
      verificationLevel: "COMMUNITY_VERIFIED",
    },
  });

  const dave = await prisma.user.create({
    data: {
      id: "user-dave",
      name: "Dave Kim",
      email: "dave@nomad.dev",
      bio: "Content creator & photographer from Korea. Just arrived in Bangkok!",
      role: "NOMAD",
      trustScore: 0,
      skills: "Photography, Video Editing, Korean",
      location: "Seoul → Bangkok",
      emailVerified: false,
      verificationLevel: "NONE",
    },
  });

  const emma = await prisma.user.create({
    data: {
      id: "user-emma",
      name: "Emma Wilson",
      email: "emma@nomad.dev",
      bio: "Data scientist from UK, exploring Southeast Asia while working remotely.",
      role: "NOMAD",
      trustScore: -3,
      location: "London → Bangkok",
      emailVerified: true,
      verificationLevel: "EMAIL_VERIFIED",
    },
  });

  const admin = await prisma.user.create({
    data: {
      id: "user-admin",
      name: "Platform Admin",
      email: "admin@nomadbridge.dev",
      role: "ADMIN",
      trustScore: 100,
      emailVerified: true,
      verificationLevel: "COMMUNITY_VERIFIED",
    },
  });

  const venueManager = await prisma.user.create({
    data: {
      id: "user-venue-mgr",
      name: "Nattaya Srisuk",
      email: "nattaya@kmutt.ac.th",
      bio: "Facility coordinator at KMUTT. Managing campus coworking and event spaces.",
      role: "VENUE_MANAGER",
      trustScore: 50,
      emailVerified: true,
      verificationLevel: "COMMUNITY_VERIFIED",
    },
  });

  // ─── Trust Score Logs ───────────────────────────────
  await prisma.trustScoreLog.createMany({
    data: [
      { userId: alice.id, delta: 5, reason: "Event attendance: Web3 Workshop", newScore: 5 },
      { userId: alice.id, delta: 10, reason: "Completed guest lecture on React", newScore: 15 },
      { userId: alice.id, delta: 5, reason: "Event attendance: AI Meetup", newScore: 20 },
      { userId: alice.id, delta: 3, reason: "Positive feedback (5 stars)", newScore: 23 },
      { userId: alice.id, delta: 10, reason: "Completed mentorship program", newScore: 33 },
      { userId: alice.id, delta: 3, reason: "Positive feedback (4 stars)", newScore: 36 },
      { userId: alice.id, delta: 3, reason: "Positive feedback (5 stars)", newScore: 39 },
      { userId: alice.id, delta: 3, reason: "Positive feedback (4 stars)", newScore: 42 },
      { userId: bob.id, delta: 5, reason: "Event attendance: Design Sprint", newScore: 5 },
      { userId: bob.id, delta: 10, reason: "Completed yoga workshop", newScore: 15 },
      { userId: bob.id, delta: 3, reason: "Positive feedback (4 stars)", newScore: 18 },
      { userId: emma.id, delta: 5, reason: "Event attendance: Data Science talk", newScore: 5 },
      { userId: emma.id, delta: -3, reason: "No-show at booked event", newScore: 2 },
      { userId: emma.id, delta: -2, reason: "Late booking cancellation", newScore: 0 },
      { userId: emma.id, delta: -3, reason: "No-show at Thai Language Exchange", newScore: -3 },
    ],
  });

  // ─── Events ──────────────────────────────────────────
  const event1 = await prisma.event.create({
    data: {
      id: "event-1",
      title: "Web3 Workshop at Chula",
      description: "Hands-on workshop building dApps on Ethereum",
      date: new Date("2026-04-15T14:00:00Z"),
      venue: "Chulalongkorn University, Chamchuri 10",
      capacity: 30,
      university: "Chulalongkorn University",
      category: "WORKSHOP",
      tags: "web3,blockchain,ethereum",
      rsvpCount: 12,
      creatorId: chula.id,
    },
  });

  const event2 = await prisma.event.create({
    data: {
      id: "event-2",
      title: "Bangkok Nomad Meetup",
      description: "Monthly meetup for digital nomads in Bangkok. Networking, talks, and Thai food!",
      date: new Date("2026-04-20T18:00:00Z"),
      venue: "Hubba-to Coworking, Ekkamai",
      capacity: 50,
      university: "Community",
      category: "SOCIAL",
      tags: "networking,nomad,social",
      rsvpCount: 25,
      creatorId: alice.id,
    },
  });

  const event3 = await prisma.event.create({
    data: {
      id: "event-3",
      title: "Thai Language Exchange",
      description: "Practice Thai with university students who want to practice English",
      date: new Date("2026-04-22T16:00:00Z"),
      venue: "Thammasat University, Rangsit Campus",
      capacity: 20,
      university: "Thammasat University",
      category: "SOCIAL",
      tags: "language,thai,exchange",
      rsvpCount: 8,
      creatorId: chula.id,
    },
  });

  // ─── RSVPs ───────────────────────────────────────────
  await prisma.eventRsvp.createMany({
    data: [
      { userId: alice.id, eventId: event1.id },
      { userId: bob.id, eventId: event1.id },
      { userId: dave.id, eventId: event2.id },
      { userId: emma.id, eventId: event2.id },
      { userId: bob.id, eventId: event3.id },
    ],
  });

  // ─── Facilities (C.4) ──────────────────────────────────
  await prisma.facility.create({
    data: {
      id: "facility-1",
      name: "Chula Co-Learning Space",
      university: "Chulalongkorn University",
      type: "COWORKING",
      description: "Modern coworking space with fast WiFi, AC, and great city views. Perfect for remote workers and study groups.",
      location: "Chamchuri Square, 4th Floor",
      available: true,
      pricePerHour: 0,
      operatingHours: "08:00-20:00 Mon-Fri",
      amenities: "WiFi, Power Outlets, AC, Whiteboard, Projector",
      capacity: 40,
      interestThreshold: 5,
      managerId: venueManager.id,
    },
  });

  await prisma.facility.create({
    data: {
      id: "facility-2",
      name: "KMUTT Innovation Lab",
      university: "KMUTT",
      type: "LAB",
      description: "Fully equipped maker lab with 3D printers, electronics workstations, and presentation area.",
      location: "KMUTT Bangmod, Building 14",
      available: true,
      pricePerHour: 200,
      operatingHours: "09:00-18:00 Mon-Sat",
      amenities: "3D Printer, Soldering Station, Projector, WiFi",
      capacity: 20,
      interestThreshold: 3,
      managerId: venueManager.id,
    },
  });

  await prisma.facility.create({
    data: {
      id: "facility-3",
      name: "Thammasat Library Commons",
      university: "Thammasat University",
      type: "LIBRARY",
      description: "Quiet study area with access to academic databases and comfortable seating.",
      location: "Rangsit Campus, Main Library 2F",
      available: true,
      pricePerHour: 0,
      operatingHours: "07:00-21:00 Mon-Sun",
      amenities: "WiFi, Power Outlets, Quiet Zone, Coffee Corner",
      capacity: 60,
      interestThreshold: 8,
    },
  });

  await prisma.facility.create({
    data: {
      id: "facility-4",
      name: "Chula Sports Complex Gym",
      university: "Chulalongkorn University",
      type: "GYM",
      description: "Full gym with cardio machines, free weights, and group class rooms.",
      location: "Chula Sports Complex, Building B",
      available: true,
      pricePerHour: 150,
      operatingHours: "06:00-22:00 Mon-Sun",
      amenities: "Cardio Equipment, Free Weights, Showers, Lockers",
      capacity: 30,
      interestThreshold: 5,
    },
  });

  // ─── Forum Posts (C.5) ───────────────────────────────
  const now = new Date();
  const hoursAgo = (h: number) => new Date(now.getTime() - h * 3600000);

  const thread1 = await prisma.forumPost.create({
    data: {
      id: "thread-1",
      title: "Best coworking spaces near Ari BTS?",
      content:
        "Hey everyone! I just moved to the Ari area and looking for good coworking spots nearby. Ideally with good WiFi (50+ Mbps), AC, and decent coffee. Budget around 200-400 THB/day. Any recommendations?",
      category: "COWORKING",
      pinned: false,
      netScore: 8,
      lastActivity: hoursAgo(1),
      userId: alice.id,
    },
  });

  const thread2 = await prisma.forumPost.create({
    data: {
      id: "thread-2",
      title: "📌 Welcome to NomadBridge Forum — Read First!",
      content:
        "Welcome to the NomadBridge community forum! This is your space to share tips, ask questions, and connect with fellow nomads in Bangkok.\n\nGuidelines:\n- Be respectful and helpful\n- Search before posting\n- Use appropriate categories\n- No spam or self-promotion\n\nHappy connecting! 🎉",
      category: "GENERAL",
      pinned: true,
      netScore: 15,
      lastActivity: hoursAgo(48),
      userId: admin.id,
    },
  });

  const thread3 = await prisma.forumPost.create({
    data: {
      id: "thread-3",
      title: "Visa run tips — Cambodia border crossing 2026",
      content:
        "Just did a visa run to Poipet last week. Here are my updated tips:\n\n1. Take the early bus from Mo Chit (6am)\n2. Bring 1500 THB + photos for the visa\n3. Ignore the 'helpers' at the border\n4. The whole process takes about 3 hours\n5. Come back the same day — no need to stay overnight\n\nAny questions? Happy to help!",
      category: "TIPS",
      pinned: false,
      netScore: 12,
      lastActivity: hoursAgo(3),
      userId: bob.id,
    },
  });

  const thread4 = await prisma.forumPost.create({
    data: {
      id: "thread-4",
      title: "Looking for apartment in Silom — budget 15k THB",
      content:
        "Moving from Chiang Mai to Bangkok next month. Looking for a studio or 1BR in the Silom/Sathorn area. Budget is around 15,000 THB/month. Need good internet for remote work. Any leads or recommendations for condo buildings?",
      category: "HOUSING",
      pinned: false,
      netScore: 3,
      lastActivity: hoursAgo(6),
      userId: emma.id,
    },
  });

  const thread5 = await prisma.forumPost.create({
    data: {
      id: "thread-5",
      title: "Anyone going to the Chula web3 workshop?",
      content:
        "Just saw the Web3 Workshop at Chula event on NomadBridge. Looks interesting! Anyone else planning to go? Would be great to meet up beforehand. I'm particularly interested in the dApp building session.",
      category: "EVENTS",
      pinned: false,
      netScore: 5,
      lastActivity: hoursAgo(12),
      userId: dave.id,
    },
  });

  // ─── Forum Replies ───────────────────────────────────
  const reply1 = await prisma.forumReply.create({
    data: {
      id: "reply-1",
      content:
        "Check out CAMP by Maya on Phahonyothin! It's technically a cafe but has great WiFi and only costs 150 THB for a coffee that gets you all-day seating.",
      netScore: 5,
      isBestAnswer: true,
      authorId: bob.id,
      threadId: thread1.id,
      createdAt: hoursAgo(1),
    },
  });

  await prisma.forumReply.create({
    data: {
      id: "reply-2",
      content:
        "I recommend The Work Loft on Soi Ari 1. Monthly pass is about 5,000 THB and includes good coffee. WiFi is consistently 100+ Mbps.",
      netScore: 3,
      authorId: dave.id,
      threadId: thread1.id,
      createdAt: hoursAgo(0.5),
    },
  });

  await prisma.forumReply.create({
    data: {
      id: "reply-3",
      content: "Thanks for the detailed tips! How long did the whole trip take door-to-door from Bangkok?",
      netScore: 1,
      authorId: alice.id,
      threadId: thread3.id,
      createdAt: hoursAgo(2),
    },
  });

  await prisma.forumReply.create({
    data: {
      id: "reply-4",
      content:
        "About 12 hours total. Left Bangkok at 5am, back by 5pm. It's a long day but totally doable.",
      netScore: 2,
      authorId: bob.id,
      threadId: thread3.id,
      createdAt: hoursAgo(1.5),
    },
  });

  await prisma.forumReply.create({
    data: {
      id: "reply-5",
      content:
        "Try Siri Sathorn Suites or Lumpini Suite Sathorn. Both are in your budget range and have good internet.",
      netScore: 2,
      authorId: alice.id,
      threadId: thread4.id,
      createdAt: hoursAgo(5),
    },
  });

  await prisma.forumReply.create({
    data: {
      id: "reply-6",
      content: "Also look at the Silom condos on HipFlat — lots of options under 15k.",
      netScore: 1,
      authorId: dave.id,
      threadId: thread4.id,
      createdAt: hoursAgo(4),
    },
  });

  await prisma.forumReply.create({
    data: {
      id: "reply-7",
      content: "Yes! I RSVPed already. Let's grab coffee at the Chula campus cafe before it starts?",
      netScore: 3,
      authorId: alice.id,
      threadId: thread5.id,
      createdAt: hoursAgo(10),
    },
  });

  await prisma.forumReply.create({
    data: {
      id: "reply-8",
      content: "Count me in too! I'll be there with my friend who's studying blockchain at Chula.",
      netScore: 2,
      authorId: emma.id,
      threadId: thread5.id,
      createdAt: hoursAgo(8),
    },
  });

  await prisma.forumReply.create({
    data: {
      id: "reply-9",
      content: "Welcome to the community! Feel free to ask anything about the Bangkok nomad scene. 😊",
      netScore: 4,
      authorId: alice.id,
      threadId: thread2.id,
      createdAt: hoursAgo(24),
    },
  });

  await prisma.forumReply.create({
    data: {
      id: "reply-10",
      content: "Great to be here! Already loving the platform.",
      netScore: 1,
      authorId: emma.id,
      threadId: thread2.id,
      createdAt: hoursAgo(20),
    },
  });

  // ─── Forum Votes ─────────────────────────────────────
  // Thread votes
  await prisma.forumVote.createMany({
    data: [
      { userId: bob.id, targetType: "THREAD", direction: "UP", threadId: thread1.id },
      { userId: dave.id, targetType: "THREAD", direction: "UP", threadId: thread1.id },
      { userId: emma.id, targetType: "THREAD", direction: "UP", threadId: thread3.id },
      { userId: alice.id, targetType: "THREAD", direction: "UP", threadId: thread5.id },
      { userId: bob.id, targetType: "THREAD", direction: "DOWN", threadId: thread4.id },
    ],
  });

  // Reply votes
  await prisma.forumVote.createMany({
    data: [
      { userId: alice.id, targetType: "REPLY", direction: "UP", replyId: reply1.id },
      { userId: dave.id, targetType: "REPLY", direction: "UP", replyId: reply1.id },
    ],
  });

  // ─── Forum Bookmarks ────────────────────────────────
  await prisma.forumBookmark.createMany({
    data: [
      { userId: alice.id, threadId: thread3.id },
      { userId: bob.id, threadId: thread1.id },
    ],
  });

  // ─── Recordings (C.8) ───────────────────────────────
  await prisma.recording.create({
    data: {
      id: "rec-1",
      title: "Web3 Workshop — Full Recording",
      sourceType: "YOUTUBE",
      sourceUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      thumbnailUrl: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
      duration: 5400,
      transcript: "Welcome to the Web3 workshop...\n[00:05] Today we'll build a dApp...\n[00:30] Let's start with Solidity basics...",
      highlights: JSON.stringify([
        { time: 300, label: "Solidity Intro" },
        { time: 1800, label: "Smart Contract Deploy" },
        { time: 3600, label: "Frontend Integration" },
      ]),
      visibility: "PUBLIC",
      viewCount: 45,
      eventId: event1.id,
      uploaderId: chula.id,
    },
  });

  await prisma.recording.create({
    data: {
      id: "rec-2",
      title: "Bangkok Nomad Meetup — Lightning Talks",
      sourceType: "TLDV",
      sourceUrl: "https://tldv.io/app/meetings/mock-meeting-id",
      duration: 3600,
      transcript: "Hi everyone, welcome to the monthly meetup...\n[00:10] Our first speaker is Alice...",
      visibility: "ATTENDEES_ONLY",
      viewCount: 12,
      eventId: event2.id,
      uploaderId: alice.id,
    },
  });

  console.log("🌱 Seed data created successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
