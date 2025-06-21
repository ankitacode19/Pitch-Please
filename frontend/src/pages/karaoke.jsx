import { useNavigate } from 'react-router-dom'

export default function Karaoke() {
  const navigate = useNavigate()

  const finishSinging = () => {
    // dummy: after singing, go to result
    navigate('/result')
  }

  return (
    <div className="text-white p-10">
      <h2 className="text-3xl mb-4">🎤 You're on stage!</h2>
      <p>Mic check... sing your heart out 💖</p>
      <button
        onClick={finishSinging}
        className="mt-4 bg-pink-600 px-4 py-2 rounded hover:bg-pink-700"
      >
        Done Singing
      </button>
    </div>
  )
}
