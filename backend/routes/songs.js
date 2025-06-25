const express = require('express');
const router = express.Router();
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const ytsr = require('yt-search'); 
const playdl = require('play-dl');

router.get('/stream/:query', async (req, res) => {
  const searchQuery = `${req.params.query} instrumental`;
  console.log(`[🎶] Searching YouTube for: ${searchQuery}`);

  try {
    const result = await ytsr(searchQuery);
    // Find the first result that is a video (has a videoId)
    const video = result.videos.find(v => v.videoId);
    console.log('yt-search result:', video);

    // Check for a valid video and URL
    if (!video || !(video.url || video.videoId)) {
      return res.status(404).json({ error: 'No instrumental found, sis.' });
    }

    // Always construct the URL from videoId
    const videoUrl = `https://www.youtube.com/watch?v=${video.videoId}`;

    const stream = await playdl.stream(videoUrl);
    res.setHeader('Content-Type', 'audio/mpeg');
    stream.stream.pipe(res);

  } catch (err) {
    console.error('[❌] Stream Error:', err);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Could not stream the song 😩' });
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
