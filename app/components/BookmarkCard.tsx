'use client'

import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import EditBookmarkModal from '../dashboard/editBookmarkModal'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid'

export default function BookmarkCard({ bookmark, fetchBookmarks }: any) {
  const [editModalOpen, setEditModalOpen] = useState(false)

  const handleDelete = async () => {
    if (!bookmark?.id) return
    if (confirm('Are you sure you want to delete this bookmark?')) {
      await supabase.from('bookmarks').delete().eq('id', bookmark.id)
      fetchBookmarks() // refresh immediately
    }
  }

  if (!bookmark) return null

  return (
    <div
      className="p-4 rounded-xl shadow-lg flex flex-col justify-between h-full"
      style={{ backgroundColor: '#5e304f' }} // dark dusty purple
    >
      <div>
        <h3 className="font-bold text-lg mb-2 text-white">{bookmark.title}</h3>
        <a
          href={bookmark.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white underline"
        >
          {bookmark.url}
        </a>
      </div>

      <div className="mt-4 flex gap-2 justify-end">
        <button
          onClick={() => setEditModalOpen(true)}
          className="p-2 bg-teal-500 rounded hover:bg-teal-600 transition"
        >
          <PencilIcon className="w-5 h-5 text-white" />
        </button>
        <button
          onClick={handleDelete}
          className="p-2 bg-rose-500 rounded hover:bg-rose-600 transition"
        >
          <TrashIcon className="w-5 h-5 text-white" />
        </button>
      </div>

      {editModalOpen && (
        <EditBookmarkModal
          bookmark={bookmark}
          closeModal={() => setEditModalOpen(false)}
          fetchBookmarks={fetchBookmarks}
        />
      )}
    </div>
  )
}
