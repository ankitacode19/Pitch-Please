import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function SongList() {
  const [songs, setSongs] = useState([])

  useEffect(() => {
    fetch(`http://localhost:5000/api/songs`)

      .then(res => res.json())
      .then(data => setSongs(data))
      .catch(err => console.error('Error fetching songs:', err))
  }, [])

  return (
    <div className="p-8 min-h-screen bg-[#C5EFCB]">
      <h2 className="text-3xl font-bold mb-6 text-center text-[#305F2B]">
        🎵 Choose Your Jam
      </h2>
      
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {songs.length > 0 ? (
          songs.map(song => (
            <div key={song.id} className="bg-white rounded-lg shadow-lg p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-[#020402] mb-2">{song.title}</h3>
                <p className="text-[#305F2B] mb-4">by {song.artist}</p>
              </div>
              <Link to={`/karaoke?id=${song.id}`}>
                <button className="bg-[#305F2B] text-white px-4 py-2 rounded hover:bg-[#3a6d2e] transition">
                  Sing Now 🎤
                </button>
              </Link>
            </div>
          ))
        ) : (
          <p className="text-center text-[#020402] text-lg col-span-full">
            Loading songs... 🎶
          </p>
        )}
      </div>
    </div>
  )
}
