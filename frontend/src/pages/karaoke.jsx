import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export default function Karaoke() {
  const [lyrics, setLyrics] = useState([]);
  const [songMeta, setSongMeta] = useState({ artist: '', title: '' });
  const audioRef = useRef(null);

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const artist = query.get('artist');
  const title = query.get('title');

  useEffect(() => {
    if (!artist || !title) return;

    setSongMeta({ artist, title });

    // 🎤 Fetch lyrics
    fetch(`http://localhost:5000/api/songs/${encodeURIComponent(artist)}/${encodeURIComponent(title)}`)
      .then(res => res.json())
      .then(data => setLyrics(data.lyrics || []))
      .catch(err => console.error('Lyrics fetch error:', err));
  }, [artist, title]);

  const audioStreamURL = `http://localhost:5000/api/songs/stream/${encodeURIComponent(title + " " + artist)}`;

  return (
    <div className="p-8">
      <h2 className="text-4xl font-bold mb-4 text-[#305F2B]">{songMeta.title}</h2>
      <h3 className="text-xl mb-6 text-[#A9C5A0]">by {songMeta.artist}</h3>

      {/* Audio player directly streaming from backend */}
      <audio ref={audioRef} controls className="w-full rounded">
        <source src={audioStreamURL} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <div className="bg-white shadow-lg rounded-lg p-6 space-y-3 max-h-[70vh] overflow-y-auto">
        {lyrics.map((line, idx) => (
          <p key={idx} className="text-lg text-[#020402]">{line}</p>
        ))}
      </div>
    </div>
  );
}
