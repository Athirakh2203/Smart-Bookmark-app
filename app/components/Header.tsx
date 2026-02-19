'use client'

import { supabase } from '../../lib/supabase'
import { useState, useEffect } from 'react'
import { BookmarkIcon } from '@heroicons/react/24/solid' // Tailwind heroicons

export default function Header() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    supabase.auth.getSession().then(res => setUser(res.data.session?.user))
    supabase.auth.onAuthStateChange((_event, session) => setUser(session?.user))
  }, [])

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({ provider: 'google' })
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/login'
  }

  return (
    <header className="w-full p-6 bg-gradient-to-r from-[#75405fff] via-black to-[#75405fff] 
                       rounded-b-3xl shadow-md flex flex-col items-center gap-4">
      {/* Logo + App Name */}
      <div className="flex items-center gap-3">
        <BookmarkIcon className="w-10 h-10 text-yellow-400" />
        <h1 className="text-3xl font-extrabold text-white">SmartBookmark</h1>
      </div>

      {/* User info + login/logout */}
    
    </header>
  )
}
