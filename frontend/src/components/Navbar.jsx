import { Link } from 'react-router-dom'
import '../styles/Navbar.css' // optional if you want extra styling

export default function Navbar() {
  return (
  <header class="navigation">
  <div class="logo">Pitch Please</div>

  <div class="nav-links-container">
    <div class="nav-links">
      <a href="/home">Home</a>
      <a href="/songs">Songs</a>
      <a href="/karaoke">Random Fact</a>
    </div>
  </div>

  <div class="login-button-container">
    <button class="btnLogin-popup">Login</button>
  </div>
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
