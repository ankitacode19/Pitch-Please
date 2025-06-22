

import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export default function Karaoke() {
  const [song, setSong] = useState(null)
  const location = useLocation()

  // Get ID from URL
  const query = new URLSearchParams(location.search)
  const songId = query.get('id')

  useEffect(() => {
    fetch('http://localhost:5000/songs')
      .then(res => res.json())
      .then(data => {
        const found = data.find(s => s.id === parseInt(songId))
        setSong(found)
      })
      .catch(err => console.error('Error loading song:', err))
  }, [songId])

  if (!song) return <div className="p-8 text-center text-xl text-green-900">Loading song... 🎶</div>

  return (
    <div className="p-8">
      <h2 className="text-4xl font-bold mb-4 text-[#305F2B]">{song.title}</h2>
      <h3 className="text-xl mb-6 text-[#A9C5A0]">by {song.artist}</h3>
      <div className="bg-white shadow-lg rounded-lg p-6 space-y-3">
        {song.lyrics.map((line, idx) => (
          <p key={idx} className="text-lg text-[#020402]">{line}</p>
        ))}
      </div>
    </div>
  )
}
