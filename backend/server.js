const express = require('express');
const cors = require('cors');
const songsRoute = require('./routes/songs');  




const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/songs', songsRoute); 


const path = require('path');
const instrumentsDir = path.join(__dirname, 'instruments');
app.use('/instruments', express.static(instrumentsDir));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✨ Server vibing on ${PORT}`);
});



