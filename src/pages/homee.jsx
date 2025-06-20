
import '../styles/homecss.css'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="home-container">
      <div>
        <h1 className="home-title">Pitch Please</h1>
        <p className="home-description">
          Unleash your inner popstar. Pick your favorite track, sing it loud,
          and see how pitch-perfect your vocals truly are.
        </p>
        <Link to="/songs">
          <button className="home-button">Get Singing</button>
        </Link>
      </div>
    </div>
  )
}

