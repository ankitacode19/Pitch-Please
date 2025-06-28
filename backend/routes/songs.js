const express = require('express');
const router = express.Router();
const ytsr = require('yt-search');
const fs = require('fs');
const path = require('path');
const playdl = require('play-dl');
const cors = require('cors'); // Add CORS support

// Enable CORS for all routes
router.use(cors());

// Directory to store instrumentals
const instrumentsDir = path.join(__dirname, '../instruments');
if (!fs.existsSync(instrumentsDir)) {
  fs.mkdirSync(instrumentsDir, { recursive: true });
}

// Serve static files (so frontend can access downloads)
router.use('/instruments', express.static(instrumentsDir));

// 🎵 Download instrumental
router.get('/download/:query', async (req, res) => {
  const searchQuery = `${req.params.query} instrumental`;
  console.log(`Download request: "${searchQuery}"`);

  try {
    // Search YouTube
    const result = await ytsr(searchQuery);
    const video = result.videos[0];
    if (!video) {
      return res.status(404).json({ error: 'No instrumental found' });
    }

    // Create filename (sanitize)
    const fileName = `${req.params.query.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.mp3`;
    const filePath = path.join(instrumentsDir, fileName);



    // Download with play-dl
    const { stream } = await playdl.stream(video.url, { quality: 2 });
    const writeStream = fs.createWriteStream(filePath);
    stream.pipe(writeStream);

    writeStream.on('finish', () => {
      res.json({ 
        message: 'Download complete', 
        file: `/instruments/${fileName}` 
      });
    });

    writeStream.on('error', (err) => {
      console.error('File write error:', err);
      fs.unlinkSync(filePath); // Delete partial file
      res.status(500).json({ error: 'Failed to save file' });
    });

  } catch (err) {
    console.error('Download error:', err);
    res.status(500).json({ error: 'Download failed. Try again later.' });
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
