import { Check } from 'lucide-react'
import { cn } from '@/utils/cn'

export function RoleSelector({ value, onChange }) {
  const roles = [
    {
      id: 'user',
      title: 'I need a developer',
      description: 'Post projects and hire developers',
      icon: '💼',
    },
    {
      id: 'developer',
      title: 'I am a developer',
      description: 'Browse jobs and sell your work',
      icon: '👨‍💻',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {roles.map((role) => (
        <button
          key={role.id}
          onClick={() => onChange(role.id)}
          className={cn(
            'relative p-8 rounded-xl border-2 transition-all duration-200 text-left',
            value === role.id
              ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20'
              : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-surface hover:border-primary-400 dark:hover:border-primary-500'
          )}
        >
          {/* Checkmark */}
          {value === role.id && (
            <div className="absolute top-4 right-4 w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center">
              <Check className="w-4 h-4 text-white" />
            </div>
          )}

          {/* Icon */}
          <div className="text-4xl mb-4">{role.icon}</div>

          {/* Content */}
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {role.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            {role.description}
          </p>
        </button>
      ))}
    </div>
  )
}
