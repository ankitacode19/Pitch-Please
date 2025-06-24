const express = require('express');
const router = express.Router();
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const ytdl = require('ytdl-core');
const ytsr = require('yt-search'); // we'll use this to find the video

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

// 🔥 NEW: Stream audio directly using ytdl-core
router.get('/stream/:query', async (req, res) => {
  const searchQuery = req.params.query;

  try {
    // 1. Search YouTube
    const result = await ytsr(searchQuery);
    const video = result.videos[0];

    if (!video) {
      return res.status(404).json({ error: 'No video found for this query' });
    }

    // 2. Set headers for streaming
    res.setHeader('Content-Type', 'audio/mpeg');

    // 3. Stream it
    ytdl(video.url, {
      filter: 'audioonly',
      quality: 'highestaudio'
    }).pipe(res);
  } catch (err) {
    console.error('Streaming error:', err);
    res.status(500).json({ error: 'Streaming failed 💀' });
  }
});

module.exports = router;
