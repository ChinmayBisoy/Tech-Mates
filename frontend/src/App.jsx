import { useEffect } from 'react'
import { CollapsibleNavbar } from '@/components/shared/CollapsibleNavbar'
import { useThemeStore } from '@/store/themeStore'

export default function App() {
  const initTheme = useThemeStore((state) => state.initTheme)

  // Initialize theme from localStorage on app load
  useEffect(() => {
    initTheme()
  }, [])

  return (
    <div className="bg-white dark:bg-base text-gray-900 dark:text-white min-h-screen">
      <CollapsibleNavbar />
    </div>
  )
}
