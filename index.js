// app.js
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB setup
mongoose.connect('mongodb+srv://abhishekdukare689:21121211@cluster0.vjxxetn.mongodb.net/audios?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true });
const Audio = mongoose.model('Audio', { name: String, url: String, duration: Number });

// Multer setup for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

app.use(bodyParser.json());
app.use(cors());
// Routes
app.post('/upload', upload.single('audio'), async (req, res) => {
  try {
    const { originalname, path } = req.file;
    const duration = calculateDuration(path); // Function to calculate audio duration
    const audio = new Audio({ name: originalname, url: path, duration });
    await audio.save();
    res.status(201).send('Audio uploaded successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});

app.get('/audios', async (req, res) => {
  try {
    const audios = await Audio.find();
    res.status(200).json(audios);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});

app.get('/audios/:id', async (req, res) => {
  try {
    const audio = await Audio.findById(req.params.id);
    if (!audio) {
      return res.status(404).send('Audio not found');
    }
    res.set('Content-Type', 'audio/wav');
    fs.createReadStream(audio.url).pipe(res);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});

// Helper function to calculate audio duration (you can implement this)
function calculateDuration(audioPath) {
  // Implementation for calculating duration goes here
}

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
