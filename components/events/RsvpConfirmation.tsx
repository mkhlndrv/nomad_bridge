"use client";

import { useEffect } from "react";
import { CheckCircle, Calendar, MapPin, ExternalLink } from "lucide-react";
import { formatDateBangkok, formatTimeBangkok } from "@/lib/utils";
import { generateGoogleCalendarUrl } from "@/lib/calendar-utils";

interface RsvpConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  eventId: string;
  userId: string;
  eventTitle: string;
  eventDate: string | Date;
  eventVenue: string;
  eventDescription?: string;
}

export default function RsvpConfirmation({
  isOpen,
  onClose,
  eventId,
  userId,
  eventTitle,
  eventDate,
  eventVenue,
  eventDescription,
}: RsvpConfirmationProps) {
  useEffect(() => {
    if (!isOpen) return;
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const date = new Date(eventDate);
  const qrData = `nomadbridge:event:${eventId}:user:${userId}`;
  const calendarUrl = generateGoogleCalendarUrl({
    title: eventTitle,
    date: eventDate,
    venue: eventVenue,
    description: eventDescription,
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl space-y-5 animate-in fade-in zoom-in-95">
        {/* Success header */}
        <div className="text-center">
          <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
          <h2 className="text-xl font-bold text-gray-900">You&apos;re registered!</h2>
          <p className="text-sm text-gray-500 mt-1">See you there</p>
        </div>

        {/* Event summary */}
        <div className="rounded-lg bg-gray-50 border border-gray-200 p-4 space-y-2">
          <h3 className="font-semibold text-gray-900">{eventTitle}</h3>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="h-4 w-4 shrink-0" />
            {formatDateBangkok(date)} · {formatTimeBangkok(date)}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="h-4 w-4 shrink-0" />
            {eventVenue}
          </div>
        </div>

        {/* QR Code placeholder */}
        <div className="text-center">
          <p className="text-xs text-gray-400 mb-2">Check-in Pass</p>
          <div className="inline-flex items-center justify-center w-48 h-48 rounded-lg bg-white border-2 border-gray-200 p-2">
            {/* Simple QR placeholder using CSS grid pattern */}
            <div className="w-full h-full flex items-center justify-center text-center">
              <div className="space-y-1">
                <div className="text-3xl">📱</div>
                <p className="text-xs text-gray-500 font-mono break-all">{qrData}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2">
          <a
            href={calendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
            Add to Google Calendar
          </a>
          <button
            onClick={onClose}
            className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
