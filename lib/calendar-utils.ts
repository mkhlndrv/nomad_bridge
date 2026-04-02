export function generateGoogleCalendarUrl({
  title,
  date,
  venue,
  description,
}: {
  title: string;
  date: string | Date;
  venue: string;
  description?: string;
}): string {
  const start = new Date(date);
  const end = new Date(start.getTime() + 2 * 60 * 60 * 1000); // Default 2 hours

  const fmt = (d: Date) =>
    d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    dates: `${fmt(start)}/${fmt(end)}`,
    location: venue,
    details: description ?? "",
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
