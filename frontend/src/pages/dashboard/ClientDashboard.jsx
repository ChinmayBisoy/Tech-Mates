import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { Briefcase, Plus, DollarSign, Star, Eye, Users } from 'lucide-react'

export default function ClientDashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [stats] = useState({
    totalSpent: 25000,
    activeProjects: 3,
    completedProjects: 12,
    totalDevelopers: 5,
    avgRating: 4.8,
  })
  const [recentActivity] = useState([
    { id: 1, title: 'Received proposal from John Dev', date: '2 hours ago' },
    { id: 2, title: 'Contract created for React App', date: '1 day ago' },
    { id: 3, title: 'Payment sent ₹5,000', date: '2 days ago' },
    { id: 4, title: 'Left a review for Sarah', date: '3 days ago' },
  ])

  useEffect(() => {
    console.log('Client Dashboard loaded')
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">
          Welcome, {user?.name || 'User'}! 👋
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">Your Client Dashboard</p>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Total Spent</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">₹{stats.totalSpent.toLocaleString()}</p>
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
              <Eye className="w-8 h-8 text-purple-500" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Developers</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{stats.totalDevelopers}</p>
              </div>
              <Users className="w-8 h-8 text-orange-500" />
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

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button 
              onClick={() => navigate('/se-market/post-requirement')}
              className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition text-left"
            >
              <Plus className="w-5 h-5 text-blue-600 mb-2" />
              <p className="font-medium text-gray-900 dark:text-white text-sm">Post Requirement</p>
            </button>
            <button 
              onClick={() => navigate('/browse/developers')}
              className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 transition text-left"
            >
              <Users className="w-5 h-5 text-green-600 mb-2" />
              <p className="font-medium text-gray-900 dark:text-white text-sm">Browse Developers</p>
            </button>
            <button 
              onClick={() => navigate('/se-market/my-requirements')}
              className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition text-left"
            >
              <Eye className="w-5 h-5 text-purple-600 mb-2" />
              <p className="font-medium text-gray-900 dark:text-white text-sm">My Requirements</p>
            </button>
            <button 
              onClick={() => navigate('/contracts')}
              className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-900/20 transition text-left"
            >
              <Briefcase className="w-5 h-5 text-orange-600 mb-2" />
              <p className="font-medium text-gray-900 dark:text-white text-sm">View Contracts</p>
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
