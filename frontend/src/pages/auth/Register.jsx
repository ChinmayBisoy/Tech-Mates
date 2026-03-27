import { useState } from 'react'
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { RoleSelector } from '@/components/auth/RoleSelector'
import { RegisterForm } from '@/components/auth/RegisterForm'

export function Register() {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const initialRole = searchParams.get('role') || null
  const [selectedRole, setSelectedRole] = useState(initialRole)

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  const handleRegisterSuccess = () => {
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-white dark:bg-base py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Join TechMates
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Create your account and start building or hiring
          </p>
        </div>

        {/* Step 1: Role Selection */}
        {!selectedRole ? (
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              What brings you here?
            </h2>
            <RoleSelector value={selectedRole} onChange={setSelectedRole} />
          </div>
        ) : (
          /* Step 2: Registration Form */
          <div>
            <button
              onClick={() => setSelectedRole(null)}
              className="text-primary-600 dark:text-accent hover:text-primary-700 dark:hover:text-accent-400 font-medium mb-6 transition-colors"
            >
              ← Change role
            </button>

            <div className="card p-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                {selectedRole === 'user'
                  ? 'Create your client account'
                  : 'Create your developer account'}
              </h2>

              <RegisterForm
                role={selectedRole}
                onSuccess={handleRegisterSuccess}
              />
            </div>
          </div>
        )}

        {/* Footer */}
        <p className="text-center text-gray-600 dark:text-gray-400 text-xs mt-8">
          By creating an account, you agree to our Terms of Service and Privacy
          Policy
        </p>
      </div>
    </div>
  )
}
