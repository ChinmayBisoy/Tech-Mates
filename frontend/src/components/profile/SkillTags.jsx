export function SkillTags({ skills = [] }) {
  if (!skills || skills.length === 0) {
    return (
      <p className="text-gray-600 dark:text-gray-400 text-sm">
        No skills listed
      </p>
    )
  }

  return (
    <div className="flex flex-wrap gap-2">
      {skills.map((skill) => (
        <span
          key={skill}
          className="inline-flex items-center px-3 py-1 bg-primary-100 dark:bg-primary-600/30 text-primary-700 dark:text-primary-100 rounded-full text-sm font-medium"
        >
          {skill}
        </span>
      ))}
    </div>
  )
}
