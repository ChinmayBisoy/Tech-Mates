import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { userAPI } from '@/api/user.api'
import { reviewAPI } from '@/api/review.api'
import { ProfileHeader } from '@/components/profile/ProfileHeader'
import { SkillTags } from '@/components/profile/SkillTags'
import { ReviewList } from '@/components/profile/ReviewList'
import { PageLoader } from '@/components/shared/PageLoader'
import { ErrorState } from '@/components/shared/ErrorState'

export function PublicProfile() {
  const { id } = useParams()

  const {
    data: userResponse,
    isLoading: userLoading,
    error: userError,
    refetch: refetchUser,
  } = useQuery({
    queryKey: ['profile', id],
    queryFn: () => userAPI.getProfile(id),
    enabled: !!id,
  })

  const user = userResponse?.data || {}

  const { data: reviewsResponse, isLoading: reviewsLoading } = useQuery({
    queryKey: ['reviews', 'user', id],
    queryFn: () => reviewAPI.getUserReviews(id),
    enabled: !!id,
  })

  const reviews = reviewsResponse?.reviews || []

  if (userLoading) return <PageLoader />

  if (userError) {
    return (
      <div className="min-h-screen bg-white dark:bg-base py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <ErrorState
            title="Profile not found"
            message="The user you're looking for doesn't exist"
            onRetry={() => refetchUser()}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-base py-12 px-4">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <ProfileHeader user={user} />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* About */}
            {user.bio && (
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  About
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                  {user.bio}
                </p>
              </div>
            )}

            {/* Skills */}
            {user.skills && user.skills.length > 0 && (
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Skills
                </h3>
                <SkillTags skills={user.skills} />
              </div>
            )}

            {/* Contact Info */}
            {user.portfolio || user.website || user.github || user.linkedin ? (
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Links
                </h3>
                <div className="space-y-3">
                  {user.portfolio && (
                    <a
                      href={user.portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-primary-600 dark:text-accent hover:text-primary-700 dark:hover:text-accent-400 text-sm font-medium transition-colors truncate"
                    >
                      Portfolio
                    </a>
                  )}
                  {user.website && (
                    <a
                      href={user.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-primary-600 dark:text-accent hover:text-primary-700 dark:hover:text-accent-400 text-sm font-medium transition-colors truncate"
                    >
                      Website
                    </a>
                  )}
                  {user.github && (
                    <a
                      href={user.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-primary-600 dark:text-accent hover:text-primary-700 dark:hover:text-accent-400 text-sm font-medium transition-colors truncate"
                    >
                      GitHub
                    </a>
                  )}
                  {user.linkedin && (
                    <a
                      href={user.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-primary-600 dark:text-accent hover:text-primary-700 dark:hover:text-accent-400 text-sm font-medium transition-colors truncate"
                    >
                      LinkedIn
                    </a>
                  )}
                </div>
              </div>
            ) : null}
          </div>

          {/* Right Content */}
          <div className="lg:col-span-2">
            {/* Reviews */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Reviews
              </h2>
              {reviewsLoading ? (
                <div className="card p-12 text-center">
                  <p className="text-gray-600 dark:text-gray-400">
                    Loading reviews...
                  </p>
                </div>
              ) : (
                <ReviewList reviews={reviews} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
