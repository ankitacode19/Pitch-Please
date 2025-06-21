const songsRoute = require('./routes/songs')

const express = require('express')
const cors = require('cors')
const app = express()
const port = 5000

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('🎤 Pitch Please Backend is Live')
})
app.use('/songs', songsRoute)

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
