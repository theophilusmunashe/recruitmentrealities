'use client'

import * as React from 'react'
import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'
import clsx from 'clsx'

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Handle mounting state  
  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <button 
        className={clsx(
          'p-2 rounded-full opacity-0 transition-all duration-200',
          'hover:bg-slate-3 active:scale-95',
          className
        )}
        aria-label="Toggle theme"
      >
        <Sun className="h-4 w-4" />
      </button>
    )
  }

  const toggleTheme = () => {
    // Toggle between light and dark, defaulting to light if system
    if (resolvedTheme === 'dark') {
      setTheme('light')
    } else {
      setTheme('dark')
    }
  }

  return (
    <button
      className={clsx(
        'p-2 rounded-full transition-all duration-200 text-slate-11 hover:text-slate-12',
        'hover:bg-slate-3 active:scale-95 focus:outline-none focus:ring-2 focus:ring-slate-4',
        className
      )}
      onClick={toggleTheme}
      aria-label={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {resolvedTheme === 'dark' ? (
        <Sun className="h-4 w-4 transition-transform duration-200 hover:rotate-12" />
      ) : (
        <Moon className="h-4 w-4 transition-transform duration-200 hover:-rotate-12" />
      )}
    </button>
  )
}