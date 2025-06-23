import { Link } from 'react-router-dom'
import '../styles/Navbar.css' // optional if you want extra styling

export default function Navbar() {
  return (
  <header className="header">
    <h2 className="logo">Pitch Please</h2>
      <nav class="navigation">
        <div className="nav-links">
        <a href="/home">Home</a>
        <a href="/songs">Songs</a>
        <a href="/fun">Random Fact</a>
        </div>
        <button class="btnLogin-popup">Login</button>
      
      </nav>

  </header>
  )
}

// Reusable link component with animation
function NavLink({ to, label }) {
  return (
    <Link
      to={to}
      className="relative text-[#020402] font-medium hover:text-[#305F2B] transition-all duration-300"
    >
      {label}
      <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[#305F2B] transition-all duration-300 group-hover:w-full"></span>
    </Link>
  )
}
