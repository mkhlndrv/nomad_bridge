const statusConfig: Record<string, { label: string; bgClass: string; textClass: string }> = {
  OPEN: { label: "Open", bgClass: "bg-green-50 border-green-200", textClass: "text-green-700" },
  IN_DISCUSSION: { label: "In Discussion", bgClass: "bg-yellow-50 border-yellow-200", textClass: "text-yellow-700" },
  MATCHED: { label: "Matched", bgClass: "bg-blue-50 border-blue-200", textClass: "text-blue-700" },
  COMPLETED: { label: "Completed", bgClass: "bg-gray-50 border-gray-200", textClass: "text-gray-600" },
  CANCELLED: { label: "Cancelled", bgClass: "bg-red-50 border-red-200", textClass: "text-red-700" },
};

interface CollaborationStatusBadgeProps {
  status: string;
}

export default function CollaborationStatusBadge({ status }: CollaborationStatusBadgeProps) {
  const config = statusConfig[status] ?? { label: status, bgClass: "bg-gray-50 border-gray-200", textClass: "text-gray-600" };

  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${config.bgClass} ${config.textClass}`}>
      {config.label}
    </span>
  );
}
