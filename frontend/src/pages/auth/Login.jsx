import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { LoginForm } from '@/components/auth/LoginForm'

export function Login() {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  const handleLoginSuccess = () => {
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-white dark:bg-base flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Sign in to your TechMates account
          </p>
        </div>

        {/* Form Card */}
        <div className="card p-8">
          <LoginForm onSuccess={handleLoginSuccess} />
        </div>

        {/* Footer Text */}
        <p className="text-center text-gray-600 dark:text-gray-400 text-xs mt-6">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  )
}
