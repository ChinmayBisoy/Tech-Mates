import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { Briefcase, Plus, DollarSign, Star, Target, CheckCircle, Users, TrendingUp, Zap, Award, Clock, ArrowRight } from 'lucide-react'

export default function DeveloperDashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [stats] = useState({
    totalEarnings: 125000,
    activeProjects: 3,
    completedProjects: 18,
    responseRate: 95,
    onTimeDelivery: 98,
    totalClients: 12,
    avgRating: 4.9,
    earningsThisMonth: 32000,
  })
  const [recentActivity] = useState([
    { id: 1, title: 'Your proposal was accepted', date: '2 hours ago', icon: 'proposal' },
    { id: 2, title: 'Client approved your milestone', date: '1 day ago', icon: 'milestone' },
    { id: 3, title: 'Payment received ₹10,000', date: '2 days ago', icon: 'payment' },
    { id: 4, title: 'Client left a 5-star review', date: '3 days ago', icon: 'review' },
  ])

  useEffect(() => {
    console.log('Developer Dashboard loaded')
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-base dark:via-surface dark:to-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-accent-500 to-primary-600 dark:from-accent-600 dark:to-primary-700 px-8 pt-12 pb-20 relative overflow-hidden">
        <div className="pointer-events-none absolute top-0 right-0 w-96 h-96 rounded-full bg-white/10 blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="max-w-6xl mx-auto relative z-10">
          <p className="text-accent-100 text-sm font-semibold uppercase tracking-wider mb-2">Performance Hub</p>
          <h1 className="text-4xl font-extrabold text-white mb-3">
            Great work, {user?.name?.split(' ')[0] || 'Developer'}! 💪
          </h1>
          <p className="text-base text-accent-100 max-w-2xl">
            You're building a stellar reputation. Let's keep the momentum going.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Primary Stat - Total Earnings */}
        <div className="mb-10 bg-white dark:bg-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">Total Earnings</p>
              <p className="text-4xl font-extrabold text-gray-900 dark:text-white">₹{(stats.totalEarnings / 100000).toFixed(2)}L</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">₹{stats.earningsThisMonth.toLocaleString()} this month</p>
            </div>
            <div className="text-right">
              <div className="inline-flex items-center gap-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1 rounded-lg text-sm font-semibold">
                <TrendingUp className="w-4 h-4" />
                +8% vs last month
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
            <p className="text-xs text-gray-500 dark:text-gray-500">Currently working on</p>
          </div>

          {/* Completed */}
          <div className="bg-white dark:bg-surface rounded-xl border border-gray-200 dark:border-gray-700 p-5 shadow hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 mb-3">
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-xs font-semibold mb-1">Completed</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stats.completedProjects}</p>
            <p className="text-xs text-gray-500 dark:text-gray-500">Total delivered</p>
          </div>

          {/* Clients */}
          <div className="bg-white dark:bg-surface rounded-xl border border-gray-200 dark:border-gray-700 p-5 shadow hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 mb-3">
              <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-xs font-semibold mb-1">Happy Clients</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stats.totalClients}</p>
            <p className="text-xs text-gray-500 dark:text-gray-500">Repeat customers</p>
          </div>

          {/* Rating */}
          <div className="bg-white dark:bg-surface rounded-xl border border-gray-200 dark:border-gray-700 p-5 shadow hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 mb-3">
              <Star className="w-5 h-5 text-yellow-600 dark:text-yellow-400 fill-yellow-600 dark:fill-yellow-400" />
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-xs font-semibold mb-1">Your Rating</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stats.avgRating}</p>
            <p className="text-xs text-gray-500 dark:text-gray-500">Highly rated</p>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-10">
          {/* Response Rate */}
          <div className="bg-white dark:bg-surface rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-gray-900 dark:text-white">Response Rate</h3>
              <div className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-green-100 dark:bg-green-900/30">
                <Target className="w-4 h-4 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <p className="text-4xl font-extrabold text-gray-900 dark:text-white mb-3">{stats.responseRate}%</p>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full" style={{ width: `${stats.responseRate}%` }} />
            </div>
            <div className="mt-3 inline-flex items-center gap-1 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-2 py-0.5 rounded text-xs font-semibold">
              <Award className="w-3.5 h-3.5" />
              Excellent - Above 90%
            </div>
          </div>

          {/* On-Time Delivery */}
          <div className="bg-white dark:bg-surface rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-gray-900 dark:text-white">On-Time Delivery</h3>
              <div className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                <TrendingUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <p className="text-4xl font-extrabold text-gray-900 dark:text-white mb-3">{stats.onTimeDelivery}%</p>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 rounded-full" style={{ width: `${stats.onTimeDelivery}%` }} />
            </div>
            <div className="mt-3 inline-flex items-center gap-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 px-2 py-0.5 rounded text-xs font-semibold">
              <Award className="w-3 h-3" />
              Trusted - Premium tier
            </div>
          </div>

          {/* Satisfaction */}
          <div className="bg-white dark:bg-surface rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-gray-900 dark:text-white">Client Satisfaction</h3>
              <div className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-yellow-100 dark:bg-yellow-900/30">
                <Star className="w-4 h-4 text-yellow-600 dark:text-yellow-400 fill-yellow-600 dark:fill-yellow-400" />
              </div>
            </div>
            <p className="text-4xl font-extrabold text-gray-900 dark:text-white mb-3">{(stats.avgRating * 20).toFixed(0)}%</p>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-2 rounded-full" style={{ width: `${stats.avgRating * 20}%` }} />
            </div>
            <div className="mt-3 inline-flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 px-2 py-0.5 rounded text-xs font-semibold">
              <Award className="w-3.5 h-3.5" />
              Exceptional - {stats.avgRating} stars
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-5">What's next?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <button 
              onClick={() => navigate('/se-market')}
              className="bg-white dark:bg-surface rounded-xl border border-gray-200 dark:border-gray-700 p-5 text-left hover:border-primary-500 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-primary-100 dark:bg-primary-900/30 mb-2 group-hover:bg-primary-200 dark:group-hover:bg-primary-800/50 transition-colors">
                <Zap className="w-4 h-4 text-primary-600 dark:text-primary-400" />
              </div>
              <p className="font-semibold text-sm text-gray-900 dark:text-white">Find New Work</p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Browse fresh opportunities</p>
            </button>

            <button 
              onClick={() => navigate('/contracts')}
              className="bg-white dark:bg-surface rounded-xl border border-gray-200 dark:border-gray-700 p-5 text-left hover:border-primary-500 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-green-100 dark:bg-green-900/30 mb-2 group-hover:bg-green-200 dark:group-hover:bg-green-800/50 transition-colors">
                <Briefcase className="w-4 h-4 text-green-600 dark:text-green-400" />
              </div>
              <p className="font-semibold text-sm text-gray-900 dark:text-white">Active Contracts</p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Manage your work</p>
            </button>

            <button 
              onClick={() => navigate('/se-market/my-proposals')}
              className="bg-white dark:bg-surface rounded-xl border border-gray-200 dark:border-gray-700 p-5 text-left hover:border-primary-500 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-purple-100 dark:bg-purple-900/30 mb-2 group-hover:bg-purple-200 dark:group-hover:bg-purple-800/50 transition-colors">
                <Target className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              </div>
              <p className="font-semibold text-sm text-gray-900 dark:text-white">Your Proposals</p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Track submissions</p>
            </button>

            <button 
              onClick={() => navigate(`/profile/${user?.id}`)}
              className="bg-white dark:bg-surface rounded-xl border border-gray-200 dark:border-gray-700 p-5 text-left hover:border-primary-500 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-orange-100 dark:bg-orange-900/30 mb-2 group-hover:bg-orange-200 dark:group-hover:bg-orange-800/50 transition-colors">
                <Award className="w-4 h-4 text-orange-600 dark:text-orange-400" />
              </div>
              <p className="font-semibold text-sm text-gray-900 dark:text-white">View Profile</p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Showcase your work</p>
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
                  {activity.icon === 'milestone' && <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />}
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
