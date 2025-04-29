import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 bg-gradient-to-r from-pink-400 to-purple-500 shadow-md">
      <div className="text-white text-2xl font-bold">
        🎤 Pitch Please
      </div>
      <div className="flex space-x-6">
        <Link to="/homee" className="text-white hover:underline hover:scale-105 transition-all">
          Home
        </Link>
        <Link to="/songs" className="text-white hover:underline hover:scale-105 transition-all">
          Songs
        </Link>
        <Link to="/karaoke" className="text-white hover:underline hover:scale-105 transition-all">
          Random Fact
        </Link>
        
      </div>
    </nav>
  )
}
