export type NotificationType =
  | "RSVP_CONFIRMATION"
  | "EVENT_REMINDER"
  | "EVENT_CANCELLED"
  | "WAITLIST_PROMOTED"
  | "POST_EVENT_MATERIALS"
  | "BOOKING_CONFIRMATION"
  | "BOOKING_REMINDER"
  | "BOOKING_CANCELLED"
  | "LECTURE_INVITE"
  | "LECTURE_APPLICATION"
  | "LECTURE_FEEDBACK"
  | "TRUST_SCORE_CHANGE"
  | "FORUM_REPLY";

export type NotificationCategory =
  | "EVENTS"
  | "BOOKINGS"
  | "LECTURES"
  | "COMMUNITY"
  | "TRUST";

export type Channel = "email" | "line" | "telegram";

export interface NotificationTypeConfig {
  category: NotificationCategory;
  defaultChannels: Channel[];
  icon: string;
  label: string;
}

export const NOTIFICATION_TYPE_MAP: Record<NotificationType, NotificationTypeConfig> = {
  RSVP_CONFIRMATION: {
    category: "EVENTS",
    defaultChannels: ["email", "line", "telegram"],
    icon: "CalendarCheck",
    label: "RSVP Confirmation",
  },
  EVENT_REMINDER: {
    category: "EVENTS",
    defaultChannels: ["email", "line", "telegram"],
    icon: "Clock",
    label: "Event Reminder",
  },
  EVENT_CANCELLED: {
    category: "EVENTS",
    defaultChannels: ["email", "line", "telegram"],
    icon: "XCircle",
    label: "Event Cancelled",
  },
  WAITLIST_PROMOTED: {
    category: "EVENTS",
    defaultChannels: ["email", "line", "telegram"],
    icon: "ArrowUpCircle",
    label: "Waitlist Promoted",
  },
  POST_EVENT_MATERIALS: {
    category: "EVENTS",
    defaultChannels: ["email"],
    icon: "Mail",
    label: "Post-Event Materials",
  },
  BOOKING_CONFIRMATION: {
    category: "BOOKINGS",
    defaultChannels: ["email", "line", "telegram"],
    icon: "CheckCircle",
    label: "Booking Confirmed",
  },
  BOOKING_REMINDER: {
    category: "BOOKINGS",
    defaultChannels: ["email", "line"],
    icon: "Clock",
    label: "Booking Reminder",
  },
  BOOKING_CANCELLED: {
    category: "BOOKINGS",
    defaultChannels: ["email", "line", "telegram"],
    icon: "XCircle",
    label: "Booking Cancelled",
  },
  LECTURE_INVITE: {
    category: "LECTURES",
    defaultChannels: ["email", "line", "telegram"],
    icon: "GraduationCap",
    label: "Lecture Invitation",
  },
  LECTURE_APPLICATION: {
    category: "LECTURES",
    defaultChannels: ["email", "line"],
    icon: "FileText",
    label: "Lecture Application",
  },
  LECTURE_FEEDBACK: {
    category: "LECTURES",
    defaultChannels: ["email"],
    icon: "Star",
    label: "Lecture Feedback",
  },
  TRUST_SCORE_CHANGE: {
    category: "TRUST",
    defaultChannels: ["line", "telegram"],
    icon: "Shield",
    label: "Trust Score Update",
  },
  FORUM_REPLY: {
    category: "COMMUNITY",
    defaultChannels: ["line", "telegram"],
    icon: "MessageCircle",
    label: "Forum Reply",
  },
} as const;

export const NOTIFICATION_CATEGORIES: NotificationCategory[] = [
  "EVENTS",
  "BOOKINGS",
  "LECTURES",
  "COMMUNITY",
  "TRUST",
];

export interface NotificationPayload {
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  linkUrl?: string;
  metadata?: Record<string, unknown>;
}
