'use client'

import { supabase } from '../../lib/supabase'

export default function LoginPage() {
  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        queryParams: { prompt: 'select_account' },
        redirectTo: 'http://localhost:3000/dashboard'
      }
    })
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center">
      {/* Background gradient: pastel pink + subtle dark accents */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#f5c8d1] via-[#f5c8d1]/80 to-[#75405f]/20"></div>

      {/* Login card */}
      <div className="relative bg-[#f5c8d1]/90 p-12 rounded-2xl text-center shadow-xl max-w-md w-full border border-[#75405f]/20">
        <h1 className="text-3xl font-bold mb-6 text-[#75405f]">Login to Smart Bookmark</h1>
        <p className="text-[#4a2c3a]/90 mb-6">
          Sign in with your Google account to save and manage your bookmarks anywhere.
        </p>
        <button
          onClick={handleLogin}
          className="px-6 py-3 bg-[#75405f] text-white rounded-lg hover:bg-[#a36e85] transition shadow-md"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  )
}
