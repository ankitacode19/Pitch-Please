const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')

router.get('/', (req, res) => {
  const songsPath = path.join(__dirname, '..', 'songs', 'songs.json')
  fs.readFile(songsPath, 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      return res.status(500).json({ message: 'Error reading songs file' })
    }
    res.json(JSON.parse(data))
  })
})

module.exports = router
