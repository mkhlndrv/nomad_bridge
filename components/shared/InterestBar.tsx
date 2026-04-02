"use client";

import { Users } from "lucide-react";

interface InterestBarProps {
  currentCount: number;
  threshold: number;
  status?: string;
}

export default function InterestBar({ currentCount, threshold, status }: InterestBarProps) {
  if (threshold <= 0) {
    return (
      <div className="flex items-center gap-1.5 text-sm text-gray-600">
        <Users className="h-4 w-4" />
        <span>{currentCount} interested</span>
      </div>
    );
  }

  const percent = Math.min(100, Math.round((currentCount / threshold) * 100));
  const isThresholdMet = currentCount >= threshold;

  if (status === "APPROVED") {
    return (
      <div className="text-sm text-green-600 font-medium">Approved</div>
    );
  }
  if (status === "UNDER_REVIEW") {
    return (
      <div>
        <div className="flex justify-between items-center mb-1 text-sm">
          <span className="text-yellow-700 font-medium">Under Review</span>
          <span className="text-gray-500">{currentCount} / {threshold}</span>
        </div>
        <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
          <div className="h-2 rounded-full bg-yellow-500 transition-all duration-300" style={{ width: `${percent}%` }} />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-1 text-sm">
        <span className="flex items-center gap-1 text-gray-600">
          <Users className="h-3.5 w-3.5" />
          {currentCount} / {threshold} interested
        </span>
      </div>
      <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
        <div
          className={`h-2 rounded-full transition-all duration-300 ${isThresholdMet ? "bg-green-500" : "bg-blue-500"}`}
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="text-xs text-gray-500 mt-1">
        {isThresholdMet ? "Threshold reached!" : `${threshold - currentCount} more needed`}
      </p>
    </div>
  );
}
