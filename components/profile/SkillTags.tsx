import { parseTags } from "@/lib/utils";

interface SkillTagsProps {
  skills?: string | null;
  isOwnProfile?: boolean;
}

export default function SkillTags({ skills, isOwnProfile = false }: SkillTagsProps) {
  const tags = parseTags(skills ?? "");

  if (tags.length === 0) {
    return (
      <div>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Skills</h2>
        <p className="text-gray-400 text-sm italic">
          {isOwnProfile ? "Add skills to help others find you" : "No skills listed"}
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Skills</h2>
      <div className="flex flex-wrap gap-2">
        {tags.map((skill) => (
          <span
            key={skill}
            className="inline-flex items-center rounded-full bg-blue-50 border border-blue-200 px-3 py-1 text-sm font-medium text-blue-700"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
