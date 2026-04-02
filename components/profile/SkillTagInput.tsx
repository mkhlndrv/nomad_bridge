"use client";

import { useState, type KeyboardEvent } from "react";
import { X } from "lucide-react";

interface SkillTagInputProps {
  value: string[];
  onChange: (skills: string[]) => void;
}

export default function SkillTagInput({ value, onChange }: SkillTagInputProps) {
  const [input, setInput] = useState("");

  function addSkill(raw: string) {
    const skill = raw.trim();
    if (skill && !value.includes(skill)) {
      onChange([...value, skill]);
    }
    setInput("");
  }

  function removeSkill(skill: string) {
    onChange(value.filter((s) => s !== skill));
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addSkill(input);
    }
    if (e.key === "Backspace" && input === "" && value.length > 0) {
      removeSkill(value[value.length - 1]);
    }
  }

  return (
    <div className="rounded-lg border border-gray-300 bg-white px-3 py-2 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
      <div className="flex flex-wrap gap-1.5">
        {value.map((skill) => (
          <span
            key={skill}
            className="inline-flex items-center gap-1 rounded-full bg-blue-50 border border-blue-200 px-2.5 py-0.5 text-sm text-blue-700"
          >
            {skill}
            <button
              type="button"
              onClick={() => removeSkill(skill)}
              className="hover:text-blue-900"
              aria-label={`Remove ${skill}`}
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => { if (input.trim()) addSkill(input); }}
          placeholder={value.length === 0 ? "Type a skill and press Enter" : "Add more..."}
          className="flex-1 min-w-[120px] border-0 bg-transparent p-0 text-sm text-gray-900 placeholder-gray-400 outline-none focus:ring-0"
        />
      </div>
    </div>
  );
}
