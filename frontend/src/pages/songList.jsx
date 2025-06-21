import { useNavigate } from 'react-router-dom'

export default function SongList() {
  const navigate = useNavigate()

  const handleSelect = () => {
    // dummy navigation until we use real song data
    navigate('/karaoke')
  }

  return (
    <div className="p-10 text-white">
      <h2 className="text-3xl mb-4">Choose Your Track</h2>
      <button
        onClick={handleSelect}
        className="bg-purple-500 px-4 py-2 rounded hover:bg-purple-600 transition"
      >
        Start Karaoke
      </button>
    </div>
  )
}
