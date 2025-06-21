import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function SongList() {
  const [songs, setSongs] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/songs')
      .then(res => res.json())
      .then(data => setSongs(data))
      .catch(err => console.error('Error fetching songs:', err))
  }, [])

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-green-800">🎵 Choose Your Jam</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {songs.map(song => (
          <Link
            key={song.id}
            to={`/karaoke?id=${song.id}`}
            className="bg-white p-4 rounded shadow hover:shadow-lg transition duration-300"
          >
            <h3 className="text-xl font-semibold text-green-900">{song.title}</h3>
            <p className="text-green-700">by {song.artist}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
