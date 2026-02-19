'use client'

import { useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function EditBookmarkModal({
  bookmark,
  closeModal,
  fetchBookmarks,
}: any) {
  const [title, setTitle] = useState(bookmark?.title || '')
  const [url, setUrl] = useState(bookmark?.url || '')
  const [loading, setLoading] = useState(false)

  const handleUpdate = async (e: any) => {
    e.preventDefault()
    if (!title || !url) return

    setLoading(true)

    const { error } = await supabase
      .from('bookmarks')
      .update({ title, url })
      .eq('id', bookmark.id)
      .select()

    if (error) {
      alert('Update failed: ' + error.message)
      setLoading(false)
      return
    }

    await fetchBookmarks() // refresh UI
    setLoading(false)
    closeModal()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <form
        onSubmit={handleUpdate}
        className="relative p-8 w-full max-w-lg rounded-2xl shadow-lg
                   bg-gray-900 flex flex-col gap-6 mx-4 sm:mx-0"
      >
        <h2 className="text-2xl font-bold text-white text-center">
          Edit Bookmark
        </h2>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-3 rounded bg-gray-800 text-white"
          required
        />

        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="p-3 rounded bg-gray-800 text-white"
          required
        />

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={closeModal}
            className="px-4 py-2 bg-gray-600 text-white rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-yellow-600 text-white rounded"
          >
            {loading ? 'Updating...' : 'Update'}
          </button>
        </div>
      </form>
    </div>
  )
}
