
const express = require('express');
//const fetch = require('node-fetch');
const router = express.Router();
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
router.get('/', (req, res) => {
  res.json([
    { id: 1, title: 'Hello', artist: 'Adele' },
    { id: 2, title: 'Blank Space', artist: 'Taylor Swift' },
    { id: 3, title: 'Shape of You', artist: 'Ed Sheeran' }
  ])
})


router.get('/:artist/:title', async (req, res) => {
  const { artist, title } = req.params;

  try {
    const response = await fetch(`https://api.lyrics.ovh/v1/Adele/Hello`);
    const data = await response.json();

    if (data.lyrics) {
      const lyricsArray = data.lyrics
        .split('\n')
        .filter(line => line.trim() !== '');
        
      res.json({
        artist,
        title,
        lyrics: lyricsArray,
      });
    } else {
      res.status(404).json({ error: 'Lyrics not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Something broke, sis 😭' });
  }
});

module.exports = router;
 
