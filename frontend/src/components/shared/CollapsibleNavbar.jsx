import { useState, useRef, useEffect } from 'react'
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { useThemeStore } from '@/store/themeStore'
import { useNotificationStore } from '@/store/notificationStore'
import { Footer } from '@/components/shared/Footer'
import {
  Moon, Sun, Bell, Search, Settings,
  HelpCircle, Shield, LayoutDashboard, User, LogIn, LogOut,
  Home, ShoppingBag, Code2, FileText, Menu, X, Zap,
  Gavel, DollarSign, Hammer, AlertCircle, BarChart3, Users, MessageSquare, Star, Store,
  Briefcase, TrendingUp, Wallet, Award, Clock, CheckCircle, ChevronDown
} from 'lucide-react'
import { cn } from '@/utils/cn'

export function CollapsibleNavbar() {
  const { isAuthenticated, user, isDeveloper, isUser, logout } = useAuth()
  const isDark = useThemeStore((state) => state.isDark)
  const toggleDarkMode = useThemeStore((state) => state.toggleDarkMode)
  const { unreadCount } = useNotificationStore()
  const [isHovered, setIsHovered] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const navRef = useRef(null)
  const profileRef = useRef(null)

  const handleLogout = () => {
    logout()
    navigate('/')
    setIsMobileOpen(false)
    setProfileOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setIsMobileOpen(false)
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const navItems = [
    { icon: Home, label: 'Home', path: '/', public: true },
    { icon: ShoppingBag, label: 'Projects', path: '/projects', public: true },
    { icon: Code2, label: 'SE Market', path: '/se-market/browse', public: true },
    { icon: Users, label: 'Developers', path: '/browse/developers', public: true },
  ]

  // Developer-specific navigation
  const developerNavItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard/purchases', role: 'developer' },
    { icon: TrendingUp, label: 'Opportunities', path: '/se-market', role: 'developer' },
    { icon: Briefcase, label: 'My Projects', path: '/projects/active', role: 'developer' },
    { icon: Wallet, label: 'Earnings', path: '/payments/earnings', role: 'developer' },
  ]

  // User/Client-specific navigation
  const clientNavItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard', role: 'client' },
    { icon: Briefcase, label: 'My Projects', path: '/projects/my', role: 'client' },
    { icon: Clock, label: 'Requirements', path: '/se-market/my', role: 'client' },
    { icon: CheckCircle, label: 'Contracts', path: '/contracts', role: 'client' },
  ]

  // Common authenticated items
  const commonNavItems = [
    { icon: MessageSquare, label: 'Messages', path: '/messages', protected: true },
    { icon: Bell, label: 'Notifications', path: '/notifications', protected: true },
    { icon: Settings, label: 'Settings', path: '/settings', protected: true },
  ]

  const marketplaceItems = [
    { icon: Gavel, label: 'Escrow', path: '/marketplace/escrow', protected: true },
    { icon: AlertCircle, label: 'Disputes', path: '/marketplace/disputes', protected: true },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <div className="bg-white dark:bg-base min-h-screen">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white dark:bg-surface border-b border-gray-200 dark:border-gray-800">
        <div className="h-16 px-4 md:px-6 flex items-center justify-between">
          {/* Left: Logo & Menu Button */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              title="Menu"
            >
              {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <span className="hidden sm:inline font-bold text-lg text-gray-900 dark:text-white">
                TechMates
              </span>
            </Link>
          </div>

          {/* Right: Actions & Profile */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Notifications */}
            {isAuthenticated && (
              <button
                onClick={() => navigate('/notifications')}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors relative"
                title="Notifications"
              >
                <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center font-bold">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>
            )}

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              title={isDark ? 'Light Mode' : 'Dark Mode'}
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </button>

            {/* Profile Dropdown - Right Corner */}
            {isAuthenticated && user ? (
              <div ref={profileRef} className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors group"
                  title="Profile Menu"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white font-semibold text-sm">
                    {user.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-medium text-gray-900 dark:text-white leading-none">
                      {user.name?.split(' ')[0] || 'User'}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 capitalize leading-none">
                      {user.role === 'client' ? 'Client' : user.role}
                    </p>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Profile Dropdown Menu */}
                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-elevated rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50">
                    {/* User Info Header */}
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                      <p className="font-semibold text-gray-900 dark:text-white">{user.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                      <p className="text-xs text-blue-600 dark:text-blue-400 capitalize mt-1">
                        {user.role === 'client' ? 'Client Account' : `${user.role} Account`}
                      </p>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      <Link
                        to={`/profile/${user.id}`}
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      >
                        <User className="w-4 h-4" />
                        View Profile
                      </Link>
                      <Link
                        to="/settings"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      >
                        <Settings className="w-4 h-4" />
                        Settings
                      </Link>

                      {user.role === 'admin' && (
                        <>
                          <div className="my-2 border-t border-gray-200 dark:border-gray-700" />
                          <Link
                            to="/admin"
                            onClick={() => setProfileOpen(false)}
                            className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                          >
                            <Shield className="w-4 h-4" />
                            Admin Panel
                          </Link>
                        </>
                      )}

                      <div className="my-2 border-t border-gray-200 dark:border-gray-700" />
                      <Link
                        to="/help"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      >
                        <HelpCircle className="w-4 h-4" />
                        Help & Support
                      </Link>

                      {/* Logout Button */}
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        Log out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-3 py-2 text-sm font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors hidden sm:block"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-3 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Layout with Sidebar */}
      <div className="flex">
        {/* Sidebar */}
        <aside
          ref={navRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={cn(
            'fixed left-0 top-16 h-[calc(100vh-64px)] bg-white dark:bg-surface border-r border-gray-200 dark:border-gray-800',
            'transition-all duration-300 flex flex-col overflow-hidden',
            'z-30',
            isMobileOpen ? 'translate-x-0 w-64' : '-translate-x-full md:translate-x-0 md:w-20',
            isHovered && 'md:w-64'
          )}
        >
          {/* Navigation Items */}
          <div className="flex-1 overflow-y-auto py-4 space-y-1">
            {/* Public Items */}
            {navItems.map((item) => (
              <NavItem
                key={item.path}
                icon={item.icon}
                label={item.label}
                path={item.path}
                isActive={isActive(item.path)}
                isHovered={isHovered}
                onClick={() => setIsMobileOpen(false)}
              />
            ))}

            {/* Authenticated Content */}
            {isAuthenticated && (
              <>
                <div className="h-px bg-gray-200 dark:bg-gray-700 my-4 mx-2" />

                {/* Developer-Specific Section */}
                {isDeveloper && (
                  <>
                    <div className="h-px bg-gray-200 dark:bg-gray-700 my-4 mx-2" />
                    <SectionLabel label="Developer" icon="👨‍💻" isHovered={isHovered} />
                    {developerNavItems.map((item) => (
                      <NavItem
                        key={item.path}
                        icon={item.icon}
                        label={item.label}
                        path={item.path}
                        isActive={isActive(item.path)}
                        isHovered={isHovered}
                        onClick={() => setIsMobileOpen(false)}
                      />
                    ))}
                  </>
                )}

                {/* Client-Specific Section */}
                {isUser && (
                  <>
                    <div className="h-px bg-gray-200 dark:bg-gray-700 my-4 mx-2" />
                    <SectionLabel label="Client" icon="👤" isHovered={isHovered} />
                    {clientNavItems.map((item) => (
                      <NavItem
                        key={item.path}
                        icon={item.icon}
                        label={item.label}
                        path={item.path}
                        isActive={isActive(item.path)}
                        isHovered={isHovered}
                        onClick={() => setIsMobileOpen(false)}
                      />
                    ))}
                  </>
                )}

                {/* Common Tools Section */}
                <div className="h-px bg-gray-200 dark:bg-gray-700 my-4 mx-2" />
                <SectionLabel label="Tools" icon="🛠️" isHovered={isHovered} />
                {commonNavItems.map((item) => (
                  <NavItem
                    key={item.path}
                    icon={item.icon}
                    label={item.label}
                    path={item.path}
                    isActive={isActive(item.path)}
                    isHovered={isHovered}
                    onClick={() => setIsMobileOpen(false)}
                  />
                ))}

                {/* Marketplace Section */}
                <div className="h-px bg-gray-200 dark:bg-gray-700 my-4 mx-2" />
                <SectionLabel label="Marketplace" icon="🏪" isHovered={isHovered} />
                {marketplaceItems.map((item) => (
                  <NavItem
                    key={item.path}
                    icon={item.icon}
                    label={item.label}
                    path={item.path}
                    isActive={isActive(item.path)}
                    isHovered={isHovered}
                    onClick={() => setIsMobileOpen(false)}
                  />
                ))}

                {/* Admin Section */}
                {user?.role === 'admin' && (
                  <>
                    <div className="h-px bg-gray-200 dark:bg-gray-700 my-4 mx-2" />
                    <NavItem
                      icon={Shield}
                      label="Admin Panel"
                      path="/admin"
                      isActive={isActive('/admin')}
                      isHovered={isHovered}
                      variant="danger"
                      onClick={() => setIsMobileOpen(false)}
                    />
                  </>
                )}
              </>
            )}
          </div>


        </aside>

        {/* Main Content Area */}
        <main className={cn(
          'flex-1 transition-all duration-300 flex flex-col min-h-[calc(100vh-64px)]',
          isMobileOpen ? 'ml-0' : isHovered ? 'md:ml-64' : 'md:ml-20'
        )}>
          <div className="flex-1 overflow-auto">
            <Outlet />
          </div>
          <Footer />
        </main>
      </div>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden top-16"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </div>
  )
}

// Section Label Component
const SectionLabel = ({ label, icon, isHovered }) => (
  <div className="px-4 py-2">
    <p className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
      {isHovered ? label : icon}
    </p>
  </div>
)

// NavItem Component
const NavItem = ({ 
  icon: Icon, 
  label, 
  path, 
  isActive, 
  isHovered, 
  onClick, 
  variant = 'default' 
}) => (
  <Link
    to={path}
    onClick={onClick}
    className={cn(
      'flex items-center gap-4 px-4 py-3 mx-2 rounded-lg transition-all duration-300 group',
      isActive 
        ? 'bg-primary-600 dark:bg-primary-700 text-white'
        : variant === 'danger'
          ? 'text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20'
          : 'text-gray-600 dark:text-gray-400 hover:bg-primary-100 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400'
    )}
    title={label}
  >
    <Icon className="w-5 h-5 shrink-0" />
    
    {isHovered && (
      <span className="text-sm font-medium whitespace-nowrap transition-opacity duration-300">
        {label}
      </span>
    )}
  </Link>
)
