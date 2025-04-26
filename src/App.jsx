import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar.jsx';
import Home from './pages/home.jsx';
import SongList from './pages/songList.jsx';
import Karaoke from './pages/karaoke.jsx';
import Result from './pages/result.jsx';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/songs" element={<SongList />} />
        <Route path="/karaoke" element={<Karaoke />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </Router>
  );
}

export default App;
