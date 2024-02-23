const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect("mongodb+srv://abhishekdukare689:21121211@cluster0.vjxxetn.mongodb.net/audios?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const recordSchema = new mongoose.Schema({
    filename: String
});

const Recording = mongoose.model('Recording', recordSchema);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, uuidv4() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('audio'), async (req, res) => {
    try {
        const file = req.file;

        if (!file) {
            return res.status(400).send('No file uploaded.');
        }
        const filename = file.filename;

        const voicerecording = new Recording({
            filename: filename
        });

        await voicerecording.save();

        res.json({ message: 'File uploaded successfully', filename });
    } catch (error) {
        console.error('Error', error);
        res.status(500).send('Error uploading file.');
    }
});

app.get('/getRecording', async (req, res) => {
    try {
        const recordings = await Recording.find({});
        res.json(recordings);
    } catch (error) {
        res.status(500).send('Error fetching recordings.');
    }
});

app.get('/getTranscript/:filename', async (req, res) => {
    // Code for transcription...
});

app.get('/getAudio/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, 'uploads', filename);
    res.download(filePath);
});

app.get('/getAllAudio', async (req, res) => {
    try {
        const files = fs.readdirSync(path.join(__dirname, 'uploads'));
        res.json(files);
    } catch (error) {
        console.error('Error', error);
        res.status(500).send('Error fetching audio files.');
    }
});

app.delete('/deleteAllObjects', async (req, res) => {
    try {
        const files = fs.readdirSync(path.join(__dirname, 'uploads'));
        files.forEach(file => {
            fs.unlinkSync(path.join(__dirname, 'uploads', file));
        });
        await Recording.deleteMany({});
        res.json({ message: 'All files deleted successfully' });
    } catch (error) {
        console.error('Error', error);
        res.status(500).send('Error deleting files.');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
