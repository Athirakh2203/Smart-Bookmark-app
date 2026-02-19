'use client'

import { useEffect, useState, useCallback } from 'react'
import { supabase } from '../../lib/supabase'
import BookmarkCard from '../components/BookmarkCard'
import AddBookmarkModal from './addBookmarkModal'

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [bookmarks, setBookmarks] = useState<any[]>([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [loading, setLoading] = useState(true)

  const fetchBookmarks = useCallback(async (uid: string) => {
    const { data, error } = await supabase
      .from('bookmarks')
      .select('*')
      .eq('user_id', uid)
      .order('created_at', { ascending: false })

    if (!error) setBookmarks(data || [])
  }, [])

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session?.user) {
        window.location.href = '/'
        return
      }
      setUser(session.user)
      fetchBookmarks(session.user.id)
      setLoading(false)
    }
    getUser()
  }, [fetchBookmarks])

  useEffect(() => {
    if (!user?.id) return
    const channel = supabase
      .channel(`bookmarks-${user.id}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'bookmarks', filter: `user_id=eq.${user.id}` },
        () => fetchBookmarks(user.id)
      )
      .subscribe()
    return () => {
  supabase.removeChannel(channel)
}
  }, [user?.id, fetchBookmarks])

  if (loading) return <p className="p-6 text-white">Loading...</p>

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/login'
  }

  return (
    <div
      className="min-h-screen p-6"
      style={{ backgroundColor: '#75405fff' }} // dark dusty purple
    >
      {/* NAV HEADER */}
      <nav className="flex justify-between items-center p-4 bg-black/30 rounded-xl shadow-md mb-6">
        <h1 className="text-2xl font-bold text-white">SmartBookmark</h1>

        {user && (
          <div className="flex items-center gap-4">
            <span className="text-white font-medium">Welcome, {user.email}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
            >
              Logout
            </button>
          </div>
        )}
      </nav>

      {/* Add button */}
      <button
        onClick={() => setShowAddModal(true)}
        className="mb-6 px-4 py-2 bg-black/70 text-white rounded hover:bg-black/50 transition"
      >
        Add Bookmark
      </button>

      {/* Bookmark grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {bookmarks.map((bookmark) => (
          <BookmarkCard
            key={bookmark.id}
            bookmark={bookmark}
            fetchBookmarks={() => fetchBookmarks(user.id)}
          />
        ))}
      </div>

      {/* Add modal */}
      {showAddModal && (
        <AddBookmarkModal
          closeModal={() => setShowAddModal(false)}
          userId={user.id}
          fetchBookmarks={() => fetchBookmarks(user.id)}
        />
      )}
    </div>
  )
}
