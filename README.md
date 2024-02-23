"# Eksaq-backend-" 
# Audio Recording and Uploading App

This is a simple web application that allows users to record audio, upload the recorded audio files, and view a list of previously recorded audios. It also provides functionality to delete all uploaded audio files.

## Features

- Record audio using your device's microphone.
- Upload recorded audio files to the server.
- View a list of previously recorded audios.
- Delete all uploaded audio files in one go.

## Technologies Used

- **Frontend**: React.js
- **Backend**: Node.js with Express.js
- **Database**: MongoDB (using Mongoose)
- **File Storage**: Local file system
- **Other Tools**: Multer for file uploading, CORS for cross-origin requests

## Installation

1. Clone this repository:

    ```bash
    git clone <repository-url>
    ```

2. Navigate to the project directory:

    ```bash
    cd audio-recording-app
    ```

3. Install dependencies for both frontend and backend:

    ```bash
    cd frontend
    npm install

    cd ../backend
    npm install
    ```

4. Start the backend server:

    ```bash
    npm start
    ```

5. Start the frontend development server:

    ```bash
    cd ../frontend
    npm start
    ```

6. Open your browser and go to `http://localhost:3000` to view the app.

## Usage

- On the landing page, click the "Start Recording" button to begin recording audio. Click "Stop Recording" to stop.
- After stopping recording, you can play the recorded audio.
- Click "Upload Audio" to upload the recorded audio to the server.
- You can view the list of all uploaded audios on the landing page.
- Use the "Delete All Audio" button to delete all uploaded audio files from the server.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
