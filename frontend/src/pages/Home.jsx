import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { requirementAPI } from '@/api/requirement.api'
import { SkeletonCard } from '@/components/shared/SkeletonCard'
import { formatINR } from '@/utils/formatCurrency'
import { formatDeadline } from '@/utils/formatDate'
import { Star, Briefcase } from 'lucide-react'

export function Home() {
  const { data: openRequirementsResponse, isLoading: openRequirementsLoading } = useQuery({
    queryKey: ['requirements', 'open'],
    queryFn: () => requirementAPI.fetchOpenRequirements(6),
  })

  const requirements = openRequirementsResponse?.data || []

  return (
    <div className="min-h-screen bg-white dark:bg-base">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Find your tech mate.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-500">
              Build something great.
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Welcome to TechMates, the platform for freelancers and clients to connect, collaborate, and create exceptional projects.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register?role=user"
              className="px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-semibold"
            >
              I need something built
            </Link>
            <Link
              to="/register?role=developer"
              className="px-8 py-3 border-2 border-primary-600 text-primary-600 dark:text-accent rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors font-semibold"
            >
              I want to sell my work
            </Link>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto bg-gray-50 dark:bg-elevated rounded-xl p-8 mb-20">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600 dark:text-accent">
              2,400+
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Developers</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600 dark:text-accent">
              1,800+
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Projects</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600 dark:text-accent">
              ₹2.4Cr+
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Paid</p>
          </div>
        </div>
      </div>

      {/* Open Opportunities Section */}
      <div className="bg-gray-50 dark:bg-surface py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Open Opportunities
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Projects looking for developers
            </p>
          </div>

          {/* Requirements Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {openRequirementsLoading ? (
              <>
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="card p-6">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4" />
                    <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded mb-4" />
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
                  </div>
                ))}
              </>
            ) : requirements.length > 0 ? (
              requirements.map((requirement) => (
                <Link
                  key={requirement._id}
                  to={`/se-market/requirement/${requirement._id}`}
                  className="card p-6 hover:shadow-lg dark:hover:shadow-lg/10 transition-all duration-300 group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-accent transition-colors mb-2">
                        {requirement.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                        {requirement.description}
                      </p>
                    </div>
                    <Briefcase className="w-5 h-5 text-primary-600 dark:text-accent flex-shrink-0 ml-4" />
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {requirement.skills &&
                      requirement.skills.slice(0, 3).map((skill) => (
                        <span
                          key={skill}
                          className="text-xs px-2 py-1 bg-primary-100 dark:bg-primary-600/30 text-primary-700 dark:text-primary-100 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                    <span className="font-bold text-primary-600 dark:text-accent">
                      ₹{requirement.budget?.min ? (requirement.budget.min / 100).toLocaleString('en-IN') : '0'} - ₹{requirement.budget?.max ? (requirement.budget.max / 100).toLocaleString('en-IN') : '0'}
                    </span>
                    <span className="text-xs text-gray-600 dark:text-gray-400">
                      {formatDeadline(requirement.deadline)}
                    </span>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-2 text-center py-12">
                <p className="text-gray-600 dark:text-gray-400">
                  No open requirements at the moment
                </p>
              </div>
            )}
          </div>

          {requirements.length > 0 && (
            <div className="text-center">
              <Link
                to="/se-market"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary-600 text-primary-600 dark:text-accent rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors font-semibold"
              >
                Browse all opportunities →
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-white dark:bg-base py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-4">
            How It Works
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-16 max-w-2xl mx-auto">
            TechMates offers two simple ways to connect and collaborate
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            {/* SE Market */}
            <div className="bg-white dark:bg-base rounded-xl p-8 border border-gray-100 dark:border-gray-800">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Service Exchange Market
              </h3>
              <ol className="space-y-4">
                <li className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    1
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      Post Requirements
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Describe what you need built
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    2
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      Receive Proposals
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Developers bid on your project
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    3
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      Create Contract
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Agree on milestones and timeline
                    </p>
                  </div>
                </li>
              </ol>
            </div>

            {/* Project Market */}
            <div className="bg-white dark:bg-base rounded-xl p-8 border border-gray-100 dark:border-gray-800">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Project Market
              </h3>
              <ol className="space-y-4">
                <li className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-accent-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    1
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      Post Projects
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Sell pre-built projects and templates (Pro only)
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-accent-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    2
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      Browse & Discover
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Buyers find and purchase your work
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-accent-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    3
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      Instant Delivery
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Automatic download link or GitHub access
                    </p>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-12">
          TechMates Guarantee
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🔒</span>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Secure Escrow
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Payments held safely until work is complete and approved
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⭐</span>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Verified Reviews
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Real feedback from verified transactions only
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⚖️</span>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Dispute Resolution
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Fair and transparent dispute handling process
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
