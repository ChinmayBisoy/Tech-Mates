import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { Briefcase, Plus, DollarSign, Star, Target, CheckCircle, Users, TrendingUp } from 'lucide-react'

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
  })
  const [recentActivity] = useState([
    { id: 1, title: 'Your proposal was accepted', date: '2 hours ago' },
    { id: 2, title: 'Client approved your milestone', date: '1 day ago' },
    { id: 3, title: 'Payment received ₹10,000', date: '2 days ago' },
    { id: 4, title: 'Client left a 5-star review', date: '3 days ago' },
  ])

  useEffect(() => {
    console.log('Developer Dashboard loaded')
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">
          Welcome, {user?.name || 'Developer'}! 💼
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">Your Developer Dashboard</p>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Total Earnings</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">₹{stats.totalEarnings.toLocaleString()}</p>
              </div>
              <DollarSign className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Active Projects</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{stats.activeProjects}</p>
              </div>
              <Briefcase className="w-8 h-8 text-green-500" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Completed</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{stats.completedProjects}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-purple-500" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Avg Rating</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">⭐ {stats.avgRating}</p>
              </div>
              <Star className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-900 dark:text-white">Response Rate</h3>
              <Target className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{stats.responseRate}%</p>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: `${stats.responseRate}%` }} />
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">✓ Excellent</p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-900 dark:text-white">On-Time Delivery</h3>
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{stats.onTimeDelivery}%</p>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${stats.onTimeDelivery}%` }} />
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">✓ Trusted</p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-900 dark:text-white">Total Clients</h3>
              <Users className="w-5 h-5 text-orange-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{stats.totalClients}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">✓ Growing</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button 
              onClick={() => navigate('/se-market/my-proposals')}
              className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition text-left"
            >
              <Plus className="w-5 h-5 text-blue-600 mb-2" />
              <p className="font-medium text-gray-900 dark:text-white text-sm">Find Work</p>
            </button>
            <button 
              onClick={() => navigate('/contracts')}
              className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 transition text-left"
            >
              <Briefcase className="w-5 h-5 text-green-600 mb-2" />
              <p className="font-medium text-gray-900 dark:text-white text-sm">My Contracts</p>
            </button>
            <button 
              onClick={() => navigate('/se-market/my-proposals')}
              className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition text-left"
            >
              <Target className="w-5 h-5 text-purple-600 mb-2" />
              <p className="font-medium text-gray-900 dark:text-white text-sm">Proposals</p>
            </button>
            <button 
              onClick={() => navigate('/profile')}
              className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-900/20 transition text-left"
            >
              <Star className="w-5 h-5 text-orange-600 mb-2" />
              <p className="font-medium text-gray-900 dark:text-white text-sm">View Profile</p>
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="border-l-4 border-blue-500 pl-4 py-2">
                <p className="font-medium text-gray-900 dark:text-white">{activity.title}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{activity.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
