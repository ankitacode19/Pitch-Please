import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export default function Karaoke() {
  const [lyrics, setLyrics] = useState([]);
  const [songMeta, setSongMeta] = useState({ artist: '', title: '' });
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState('');
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

    // 🪄 Start downloading instrumental as soon as component mounts
    handleDownloadInstrumental();
    
  }, [artist, title]);

  const handleDownloadInstrumental = async () => {
    if (!artist || !title) return;

    setIsDownloading(true);
    setDownloadStatus('Loading instrumental...');

    try {
      const searchQuery = `${title} ${artist} instrumental`;
      const response = await fetch(`http://localhost:5000/api/songs/download/${encodeURIComponent(searchQuery)}`);
      const data = await response.json();

      if (response.ok && data.file) {
        // Use the correct path depending on your backend static serving
        audioRef.current.src = `http://localhost:5000/api/songs${data.file}`;
        audioRef.current.load();
        audioRef.current.play();
        setDownloadStatus('Playing instrumental!');
      } else {
        setDownloadStatus(data.error || 'Download failed');
      }
    } catch (err) {
      console.error('Audio load error:', err);
      setDownloadStatus('Failed to load instrumental');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-4xl font-bold mb-4 text-[#305F2B]">{songMeta.title}</h2>
      <h3 className="text-xl mb-6 text-[#A9C5A0]">by {songMeta.artist}</h3>

      {/* Audio player */}
      <div className="flex flex-col space-y-4 mb-6">
        <audio ref={audioRef} controls className="w-full rounded" />

        {isDownloading ? (
          <p className="text-sm text-[#305F2B]">{downloadStatus}</p>
        ) : (
          <button
            onClick={handleDownloadInstrumental}
            className="px-4 py-2 rounded-md text-white bg-[#305F2B] hover:bg-[#1e3e1a]"
          >
            Re-download / Retry 🎧
          </button>
        )}
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6 space-y-3 max-h-[70vh] overflow-y-auto">
        {lyrics.map((line, idx) => (
          <p key={idx} className="text-lg text-[#020402]">{line}</p>
        ))}
      </div>
    </div>
  );
}
