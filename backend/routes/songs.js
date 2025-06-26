const express = require('express');
const router = express.Router();
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const ytsr = require('yt-search'); 
const { YouTube } = require('tube');

router.get('/stream/:query', async (req, res) => {
  const searchQuery = `${req.params.query} instrumental`;
  console.log(`[🔍] Searching: ${searchQuery}`);

  try {
    // Search YouTube for the video
    const yt = new YouTube();
    const results = await yt.search(searchQuery);
    const video = results.videos[0];
    if (!video) {
      return res.status(404).json({ error: 'No instrumental found, sis 💔' });
    }

    console.log('✅ Found video:', video.id, video.title);

    // Get video info and find the best audio format
    const info = await yt.getVideo(video.id);
    const audioFormat = info.formats
      .filter(f => f.mimeType && f.mimeType.startsWith('audio/'))
      .sort((a, b) => (b.bitrate || 0) - (a.bitrate || 0))[0];

    if (!audioFormat || !audioFormat.url) {
      throw new Error('No audio format available');
    }

    res.setHeader('Content-Type', 'audio/mpeg');
    // Stream the audio
    const audioRes = await fetch(audioFormat.url);
    audioRes.body.pipe(res);
    console.log(`[✅] Streaming via tube.js`);
  } catch (err) {
    console.error('❌ Stream Error:', err);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Streaming failed 💀', details: err.message });
    }
  }
});


// GET all songs 
router.get('/', (req, res) => {
  res.json([
    { id: 1, title: 'Filter', artist: 'JENNIE' },
    { id: 2, title: 'Blank Space', artist: 'Taylor Swift' },
    { id: 3, title: 'Shape of You', artist: 'Ed Sheeran' }
  ]);
});

// GET lyrics
router.get('/:artist/:title', async (req, res) => {
  const { artist, title } = req.params;

  try {
    const response = await fetch(`https://api.lyrics.ovh/v1/${encodeURIComponent(artist)}/${encodeURIComponent(title)}`);
    const data = await response.json();

    if (data.lyrics) {
      const lyricsArray = data.lyrics.split('\n').filter(line => line.trim() !== '');
      res.json({ artist, title, lyrics: lyricsArray });
    } else {
      res.status(404).json({ error: 'Lyrics not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Something broke, sis 😭' });
  }
});



module.exports = router;
