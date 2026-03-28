import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { Briefcase, Plus, DollarSign, Star, Eye, Users, ArrowRight, TrendingUp, Zap, CheckCircle, Clock } from 'lucide-react'

export default function ClientDashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [stats] = useState({
    totalSpent: 25000,
    activeProjects: 3,
    completedProjects: 12,
    totalDevelopers: 5,
    avgRating: 4.8,
    spentThisMonth: 8000,
    projectsCompleted30d: 4,
  })
  const [recentActivity] = useState([
    { id: 1, title: 'Received proposal from John Dev', date: '2 hours ago', icon: 'proposal' },
    { id: 2, title: 'Contract created for React App', date: '1 day ago', icon: 'contract' },
    { id: 3, title: 'Payment sent ₹5,000', date: '2 days ago', icon: 'payment' },
    { id: 4, title: 'Left a review for Sarah', date: '3 days ago', icon: 'review' },
  ])

  useEffect(() => {
    console.log('Client Dashboard loaded')
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-base dark:via-surface dark:to-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-accent-500 dark:from-primary-700 dark:to-accent-600 px-8 pt-12 pb-20 relative overflow-hidden">
        <div className="pointer-events-none absolute top-0 right-0 w-96 h-96 rounded-full bg-white/10 blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="max-w-6xl mx-auto relative z-10">
          <p className="text-primary-100 text-sm font-semibold uppercase tracking-wider mb-2">Welcome back</p>
          <h1 className="text-5xl font-extrabold text-white mb-3">
            Hey, {user?.name?.split(' ')[0] || 'there'}! 👋
          </h1>
          <p className="text-lg text-primary-100 max-w-2xl">
            Your projects are moving forward. Here's what's happening with your work.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Primary Stat - Total Investment */}
        <div className="mb-10 bg-white dark:bg-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">Total Investment</p>
              <p className="text-4xl font-extrabold text-gray-900 dark:text-white">₹{(stats.totalSpent / 100000).toFixed(2)}L</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">₹{stats.spentThisMonth.toLocaleString()} this month</p>
            </div>
            <div className="text-right">
              <div className="inline-flex items-center gap-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1 rounded-lg text-sm font-semibold">
                <TrendingUp className="w-4 h-4" />
                +12% vs last month
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {/* Active Projects */}
          <div className="bg-white dark:bg-surface rounded-xl border border-gray-200 dark:border-gray-700 p-5 shadow hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 mb-3">
              <Briefcase className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-xs font-semibold mb-1">Active Projects</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stats.activeProjects}</p>
            <p className="text-xs text-gray-500 dark:text-gray-500">In progress right now</p>
          </div>

          {/* Completed */}
          <div className="bg-white dark:bg-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/30 mb-4">
              <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm font-semibold mb-1">Completed</p>
            <p className="text-4xl font-bold text-gray-900 dark:text-white mb-2">{stats.completedProjects}</p>
            <p className="text-xs text-gray-500 dark:text-gray-500">{stats.projectsCompleted30d} in last 30 days</p>
          </div>

          {/* Developers */}
          <div className="bg-white dark:bg-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 mb-4">
              <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm font-semibold mb-1">Developers</p>
            <p className="text-4xl font-bold text-gray-900 dark:text-white mb-2">{stats.totalDevelopers}</p>
            <p className="text-xs text-gray-500 dark:text-gray-500">In your network</p>
          </div>

          {/* Rating */}
          <div className="bg-white dark:bg-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 mb-4">
              <Star className="w-6 h-6 text-yellow-600 dark:text-yellow-400 fill-yellow-600 dark:fill-yellow-400" />
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm font-semibold mb-1">Your Rating</p>
            <p className="text-4xl font-bold text-gray-900 dark:text-white mb-2">{stats.avgRating}</p>
            <p className="text-xs text-gray-500 dark:text-gray-500">Based on reviews</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-5">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <button 
              onClick={() => navigate('/se-market/post-requirement')}
              className="bg-white dark:bg-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-6 text-left hover:border-primary-500 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-900/30 mb-3 group-hover:bg-primary-200 dark:group-hover:bg-primary-800/50 transition-colors">
                <Plus className="w-5 h-5 text-primary-600 dark:text-primary-400" />
              </div>
              <p className="font-semibold text-gray-900 dark:text-white">Post New Requirement</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Tell developers what you need</p>
            </button>

            <button 
              onClick={() => navigate('/browse/developers')}
              className="bg-white dark:bg-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-6 text-left hover:border-primary-500 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 mb-3 group-hover:bg-green-200 dark:group-hover:bg-green-800/50 transition-colors">
                <Users className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <p className="font-semibold text-gray-900 dark:text-white">Browse Developers</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Discover top talent</p>
            </button>

            <button 
              onClick={() => navigate('/se-market/my-requirements')}
              className="bg-white dark:bg-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-6 text-left hover:border-primary-500 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 mb-3 group-hover:bg-purple-200 dark:group-hover:bg-purple-800/50 transition-colors">
                <Eye className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <p className="font-semibold text-gray-900 dark:text-white">Manage Requirements</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">View all your posts</p>
            </button>

            <button 
              onClick={() => navigate('/contracts')}
              className="bg-white dark:bg-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-6 text-left hover:border-primary-500 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900/30 mb-3 group-hover:bg-orange-200 dark:group-hover:bg-orange-800/50 transition-colors">
                <Briefcase className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              </div>
              <p className="font-semibold text-gray-900 dark:text-white">View Contracts</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Manage agreements</p>
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-5">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-4 pb-4 border-b border-gray-200 dark:border-gray-700 last:border-0 last:pb-0">
                <div className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-gray-700 flex-shrink-0 flex items-center justify-center">
                  {activity.icon === 'proposal' && <Zap className="w-4 h-4 text-blue-600 dark:text-blue-400" />}
                  {activity.icon === 'contract' && <Briefcase className="w-4 h-4 text-green-600 dark:text-green-400" />}
                  {activity.icon === 'payment' && <DollarSign className="w-4 h-4 text-purple-600 dark:text-purple-400" />}
                  {activity.icon === 'review' && <Star className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm text-gray-900 dark:text-white">{activity.title}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{activity.date}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 dark:text-gray-600 flex-shrink-0 mt-1" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
