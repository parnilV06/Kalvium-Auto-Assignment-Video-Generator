# Kalvium Assignment Video Generator

An automated desktop tool that generates assignment explanation videos for Kalvium learning units.

This application converts assignment descriptions into AI-generated explanation scripts, synthesizes a voiceover using local text-to-speech, and renders a ready-to-submit MP4 video automatically.

The goal of this tool is to eliminate the repetitive process of manually recording explanation videos for assignments.

---

# Features

- AI-generated assignment explanation scripts
- Offline voiceover generation using Piper TTS
- Automatic video rendering using FFmpeg
- Minimal and distraction-free user interface
- One-click video generation
- Fully local media processing (audio + video)
- No manual screen recording required
- Packaged as a desktop application using Electron

---

# How It Works

The application follows a simple automated pipeline.

1. The user enters assignment details in the interface.
2. The backend sends the information to the Gemini API to generate a short explanation script.
3. The generated script is converted to speech using Piper TTS.
4. The audio is combined with a simple background using FFmpeg.
5. A final MP4 video is generated and made available for download.

Pipeline:

```
User Input
   ↓
Gemini AI → Script Generation
   ↓
Piper TTS → Voiceover Audio
   ↓
FFmpeg → Video Rendering
   ↓
MP4 Output
```

---

# Application Architecture

The project uses a hybrid desktop architecture.

```
Electron Desktop Application
│
├── React Frontend
│       UI for entering assignment details
│
├── Node.js + Express Backend
│       Handles AI calls and media processing
│
├── Gemini API
│       Generates explanation scripts
│
├── Piper TTS
│       Generates voiceover audio locally
│
└── FFmpeg
        Renders the final video output
```

---

# Tech Stack

### Frontend
- React
- Vite

### Desktop Runtime
- Electron

### Backend
- Node.js
- Express.js

### AI Integration
- Google Gemini API

### Media Processing
- Piper TTS
- FFmpeg

### Packaging
- Electron Builder
- NSIS Windows Installer

---

# Project Structure

```
project-root
│
├── client
│   ├── src
│   │   ├── components
│   │   │   ├── InputForm.jsx
│   │   │   └── Results.jsx
│   │   │
│   │   ├── services
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── dist
│
├── server
│   ├── controllers
│   │   └── generateController.js
│   │
│   ├── routes
│   │   └── generateRoute.js
│   │
│   ├── services
│   │   ├── scriptService.js
│   │   ├── ttsService.js
│   │   └── videoService.js
│   │
│   └── server.js
│
├── electron
│   └── main.js
│
├── binaries
│   ├── piper
│   └── ffmpeg
│
├── package.json
└── README.md
```

---

# Installation (Users)

Download the installer from the **Releases** section.

```
Kalvium Video Generator Setup.exe
```

Steps:

1. Download the installer.
2. Run the setup file.
3. Install the application.
4. Launch the application.
5. Enter assignment details and generate your video.

The application runs completely locally after installation.

---

# Development Setup

Clone the repository.

```bash
git clone https://github.com/parnilV06/Kalvium-Auto-Assignment-Video-Generator.git
cd kalvium-assignment-video-generator
```

Install dependencies.

```bash
npm install
```

Install frontend dependencies.

```bash
cd client
npm install
```

Return to the project root.

```bash
cd ..
```

---

# Environment Variables

Create a `.env` file inside the `server` directory.

```
GEMINI_API_KEY=your_api_key_here
PORT=5001
```

---

# Running the Application (Development Mode)

Start the Electron application.

```bash
npm start
```

This launches:

- Electron Desktop App
- Express Backend
- React Frontend

---

# Building the Desktop Application

To generate the Windows installer:

```bash
npx electron-builder
```

The installer will be created in:

```
dist/
```

Example output:

```
Kalvium Video Generator Setup.exe
```

---

# Example Use Case

Example input:

```
Subject: Backend Development
Learning Unit: LU14
Content: Implemented a REST API endpoint for managing books using Express and MongoDB.
```

Output:

- AI-generated explanation script
- Voiceover audio
- Rendered MP4 video ready for submission

---

# Future Improvements

Possible enhancements for future versions:

- GitHub PR link parsing for automatic script generation
- Custom voice options
- Video templates and overlays
- Cloud export and sharing
- Batch video generation

---

# License

This project is open source and available under the MIT License.

---

# Author

Created by **Parnil Vyawahare**

GitHub:  
https://github.com/parnilV06

---
