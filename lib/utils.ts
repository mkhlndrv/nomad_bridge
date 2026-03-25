export function parseTags(tags: string | null): string[] {
  return tags ? tags.split(",").map((t) => t.trim()).filter(Boolean) : [];
}

export function formatTags(tags: string[]): string {
  return tags.join(", ");
}

export function formatDateBangkok(date: Date): string {
  return date.toLocaleDateString("en-US", {
    timeZone: "Asia/Bangkok",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatTimeBangkok(date: Date): string {
  return date.toLocaleTimeString("en-US", {
    timeZone: "Asia/Bangkok",
    hour: "2-digit",
    minute: "2-digit",
  });
}
