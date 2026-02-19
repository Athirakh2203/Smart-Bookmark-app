'use client'

import { useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function AddBookmarkModal({ closeModal, userId, fetchBookmarks }: any) {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (!title || !url) return
    await supabase.from('bookmarks').insert([{ title, url, user_id: userId }])
    fetchBookmarks()
    closeModal()
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
      <form
        onSubmit={handleSubmit}
        className="relative bg-white/20 backdrop-blur-lg rounded-2xl p-8 flex flex-col gap-6 w-full max-w-lg shadow-lg border border-white/30"
      >
        <h2 className="text-2xl font-extrabold text-gray-900 text-center">
          Add New Bookmark
        </h2>

        <input
          type="text"
          placeholder="Title"
          className="p-3 rounded-lg border border-white/40 bg-white/30 backdrop-blur-md placeholder-gray-700 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="URL"
          className="p-3 rounded-lg border border-white/40 bg-white/30 backdrop-blur-md placeholder-gray-700 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <div className="flex justify-end gap-4 mt-2">
          <button
            type="button"
            onClick={closeModal}
            className="px-6 py-2 rounded-xl bg-gray-300 text-gray-800 hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 transition"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  )
}
