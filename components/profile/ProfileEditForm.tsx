"use client";

import { useState } from "react";
import { Lock, Check } from "lucide-react";
import SkillTagInput from "./SkillTagInput";
import { parseTags, formatTags } from "@/lib/utils";

interface ProfileEditFormProps {
  user: {
    name: string;
    email: string;
    bio?: string | null;
    skills?: string | null;
    location?: string | null;
    role: string;
  };
}

export default function ProfileEditForm({ user }: ProfileEditFormProps) {
  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState(user.bio ?? "");
  const [skills, setSkills] = useState<string[]>(parseTags(user.skills ?? ""));
  const [location, setLocation] = useState(user.location ?? "");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});
    setSaving(true);
    setSuccess(false);

    try {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          bio: bio.trim(),
          skills: formatTags(skills),
          location: location.trim(),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        if (data.details) {
          setErrors(data.details);
        } else {
          setErrors({ form: data.error || "Failed to update profile" });
        }
        return;
      }

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch {
      setErrors({ form: "Network error. Please try again." });
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {errors.form && (
        <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700">
          {errors.form}
        </div>
      )}

      {success && (
        <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-700 flex items-center gap-2">
          <Check className="h-4 w-4" />
          Profile updated successfully!
        </div>
      )}

      {/* Email (read-only) */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <div className="relative">
          <input
            type="email"
            value={user.email}
            disabled
            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-500 pr-10"
          />
          <Lock className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
        </div>
        <p className="text-xs text-gray-400 mt-1">Cannot be changed</p>
      </div>

      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Name <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={100}
          required
          className={`w-full rounded-lg border px-3 py-2 text-sm ${errors.name ? "border-red-300 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"} focus:border-transparent focus:ring-2 outline-none`}
        />
        {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
      </div>

      {/* Bio */}
      <div>
        <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
        <textarea
          id="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          maxLength={500}
          rows={3}
          className={`w-full rounded-lg border px-3 py-2 text-sm ${errors.bio ? "border-red-300 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"} focus:border-transparent focus:ring-2 outline-none resize-none`}
          placeholder="Tell others about yourself..."
        />
        <div className="flex justify-between text-xs mt-1">
          {errors.bio ? (
            <p className="text-red-600">{errors.bio}</p>
          ) : (
            <span />
          )}
          <span className="text-gray-400">{bio.length}/500</span>
        </div>
      </div>

      {/* Skills */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Skills</label>
        <SkillTagInput value={skills} onChange={setSkills} />
      </div>

      {/* Location */}
      <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
        <input
          id="location"
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          maxLength={100}
          className={`w-full rounded-lg border px-3 py-2 text-sm ${errors.location ? "border-red-300 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"} focus:border-transparent focus:ring-2 outline-none`}
          placeholder="e.g. Bangkok, Thailand"
        />
        {errors.location && <p className="text-xs text-red-600 mt-1">{errors.location}</p>}
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
        <a
          href="/profile"
          className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </a>
      </div>
    </form>
  );
}
