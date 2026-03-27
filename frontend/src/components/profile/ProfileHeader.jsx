import { Star, MapPin, Calendar, Award } from 'lucide-react'
import { formatAbsolute } from '@/utils/formatDate'

export function ProfileHeader({ user = {} }) {
  const getInitials = (name) => {
    return name
      ?.split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase() || 'U'
  }

  const getTierColor = (tier) => {
    const tiers = {
      new: 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300',
      rising: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
      trusted:
        'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
      top: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300',
      elite: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300',
    }
    return tiers[tier] || tiers.new
  }

  return (
    <div className="card p-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Avatar */}
        <div className="flex-shrink-0">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-32 h-32 rounded-xl object-cover"
            />
          ) : (
            <div className="w-32 h-32 bg-primary-600 rounded-xl flex items-center justify-center">
              <span className="text-5xl font-bold text-white">
                {getInitials(user.name)}
              </span>
            </div>
          )}
        </div>

        {/* Profile Info */}
        <div className="flex-1">
          <div className="flex flex-wrap items-start gap-3 mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {user.name}
              </h1>
              {user.role === 'developer' && user.tier && (
                <span className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium ${getTierColor(user.tier)}`}>
                  {user.tier.charAt(0).toUpperCase() + user.tier.slice(1)} Tier
                </span>
              )}
            </div>
          </div>

          {/* Bio */}
          {user.bio && (
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {user.bio}
            </p>
          )}

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Rating */}
            <div className="text-center md:text-left">
              <div className="flex items-center gap-1 mb-1">
                <Star className="w-4 h-4 text-warning fill-warning" />
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  {(user.rating || 0).toFixed(1)}
                </span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Avg Rating
              </p>
            </div>

            {/* Reviews */}
            <div className="text-center md:text-left">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {user.reviewCount || 0}
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Reviews
              </p>
            </div>

            {/* Completed */}
            {user.role === 'developer' && (
              <div className="text-center md:text-left">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {user.completedProjects || 0}
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Completed
                </p>
              </div>
            )}

            {/* Member Since */}
            <div className="text-center md:text-left">
              <div className="flex items-center gap-1 mb-1 justify-center md:justify-start">
                <Calendar className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Joined {formatAbsolute(user.createdAt)}
              </p>
            </div>
          </div>

          {/* Location */}
          {user.location && (
            <div className="flex items-center gap-2 mt-6 text-gray-600 dark:text-gray-400">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{user.location}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
