"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, ArrowLeft } from "lucide-react";
import CollaborationTypeSelector from "./CollaborationTypeSelector";

const FORMATS = [
  { value: "IN_PERSON", label: "In Person" },
  { value: "ONLINE", label: "Online" },
  { value: "HYBRID", label: "Hybrid" },
];

const COMPENSATIONS = [
  { value: "PAID", label: "Paid" },
  { value: "FREE", label: "Free" },
  { value: "FACILITY_ACCESS", label: "Facility Access" },
];

export default function CreateCollaborationForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    collaborationType: "",
    title: "",
    description: "",
    format: "IN_PERSON",
    compensation: "FREE",
    tags: "",
    preferredDateRange: "",
    // Lecture
    expectedAudience: "",
    department: "",
    talkFormat: "",
    // Skill Exchange
    requiredSkills: "",
    estimatedDuration: "",
    deliverables: "",
    // Mentorship
    frequency: "",
    topicArea: "",
    commitmentDuration: "",
    // Project
    projectDescription: "",
  });

  function update(key: string, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title || !form.description) {
      setError("Title and description are required");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const payload = {
        ...form,
        expectedAudience: form.expectedAudience ? parseInt(form.expectedAudience) : undefined,
      };

      const res = await fetch("/api/collaborations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to create collaboration");
        return;
      }

      router.push(`/collaborations/${data.id}`);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (step === 1) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">What type of collaboration?</h2>
          <p className="text-sm text-gray-500 mt-1">Select the type that best describes your opportunity</p>
        </div>
        <CollaborationTypeSelector
          selected={form.collaborationType || null}
          onSelect={(type) => update("collaborationType", type)}
        />
        <button
          type="button"
          disabled={!form.collaborationType}
          onClick={() => setStep(2)}
          className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Continue
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <button
        type="button"
        onClick={() => setStep(1)}
        className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
      >
        <ArrowLeft className="h-4 w-4" /> Back to type selection
      </button>

      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Shared fields */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => update("title", e.target.value)}
            placeholder="e.g., Guest Lecture on AI in Healthcare"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
          <textarea
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
            rows={4}
            placeholder="Describe what you're looking for or offering..."
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Format</label>
            <select
              value={form.format}
              onChange={(e) => update("format", e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              {FORMATS.map((f) => <option key={f.value} value={f.value}>{f.label}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Compensation</label>
            <select
              value={form.compensation}
              onChange={(e) => update("compensation", e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              {COMPENSATIONS.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Date Range</label>
          <input
            type="text"
            value={form.preferredDateRange}
            onChange={(e) => update("preferredDateRange", e.target.value)}
            placeholder="e.g., 2026-05-01 to 2026-05-31"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
          <input
            type="text"
            value={form.tags}
            onChange={(e) => update("tags", e.target.value)}
            placeholder="Separate tags with commas, e.g., AI, Python, Machine Learning"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Type-specific fields */}
      {form.collaborationType === "GUEST_LECTURE" && (
        <div className="space-y-4 border-t border-gray-200 pt-4">
          <h3 className="text-sm font-semibold text-gray-900">Lecture Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Expected Audience Size *</label>
              <input type="number" value={form.expectedAudience} onChange={(e) => update("expectedAudience", e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department *</label>
              <input type="text" value={form.department} onChange={(e) => update("department", e.target.value)} placeholder="e.g., Faculty of Engineering" className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" required />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Talk Format</label>
            <select value={form.talkFormat} onChange={(e) => update("talkFormat", e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
              <option value="">Select format</option>
              <option value="Lecture">Lecture</option>
              <option value="Workshop">Workshop</option>
              <option value="Panel">Panel Discussion</option>
              <option value="Q&A">Q&A Session</option>
              <option value="Lecture + Q&A">Lecture + Q&A</option>
            </select>
          </div>
        </div>
      )}

      {form.collaborationType === "SKILL_EXCHANGE" && (
        <div className="space-y-4 border-t border-gray-200 pt-4">
          <h3 className="text-sm font-semibold text-gray-900">Skill Exchange / Research Details</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Required Skills *</label>
            <input type="text" value={form.requiredSkills} onChange={(e) => update("requiredSkills", e.target.value)} placeholder="e.g., Python, PyTorch, NLP" className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" required />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Duration *</label>
              <input type="text" value={form.estimatedDuration} onChange={(e) => update("estimatedDuration", e.target.value)} placeholder="e.g., 3 months" className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Deliverables</label>
              <input type="text" value={form.deliverables} onChange={(e) => update("deliverables", e.target.value)} placeholder="e.g., Research paper, Model" className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
            </div>
          </div>
        </div>
      )}

      {form.collaborationType === "MENTORSHIP" && (
        <div className="space-y-4 border-t border-gray-200 pt-4">
          <h3 className="text-sm font-semibold text-gray-900">Mentorship Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Frequency *</label>
              <select value={form.frequency} onChange={(e) => update("frequency", e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" required>
                <option value="">Select frequency</option>
                <option value="Weekly">Weekly</option>
                <option value="Biweekly">Biweekly</option>
                <option value="Monthly">Monthly</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Commitment Duration</label>
              <input type="text" value={form.commitmentDuration} onChange={(e) => update("commitmentDuration", e.target.value)} placeholder="e.g., 2 months" className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Topic Area *</label>
            <input type="text" value={form.topicArea} onChange={(e) => update("topicArea", e.target.value)} placeholder="e.g., Startup Development" className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" required />
          </div>
        </div>
      )}

      {form.collaborationType === "PROJECT" && (
        <div className="space-y-4 border-t border-gray-200 pt-4">
          <h3 className="text-sm font-semibold text-gray-900">Project Details</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Project Description</label>
            <textarea value={form.projectDescription} onChange={(e) => update("projectDescription", e.target.value)} rows={3} placeholder="Describe the project in detail..." className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Required Skills</label>
              <input type="text" value={form.requiredSkills} onChange={(e) => update("requiredSkills", e.target.value)} placeholder="e.g., React, Node.js" className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Duration</label>
              <input type="text" value={form.estimatedDuration} onChange={(e) => update("estimatedDuration", e.target.value)} placeholder="e.g., 4 months" className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
            </div>
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50 transition-colors"
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin mx-auto" /> : "Post Collaboration"}
      </button>
    </form>
  );
}
