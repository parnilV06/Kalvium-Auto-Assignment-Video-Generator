import { generateScript } from '../services/scriptService.js';
import { generateVoice } from '../services/ttsService.js';
import { generateVideo } from '../services/videoService.js';

export const generateVideoController = async (req, res) => {
  try {
    const { subject, lu, content } = req.body;

    if (!subject || !lu || !content) {
      return res.status(400).json({ error: 'Missing required parameters: subject, lu, content' });
    }

    // Step 1: Generate explanation script using scriptService
    const script = await generateScript(subject, lu, content);

    // Step 2: Generate voiceover audio using ttsService
    const audioPath = await generateVoice(subject, lu, script);

    // Step 3: Generate final video using videoService
    const videoPath = await generateVideo(subject, lu, audioPath);

    // Step 4: Return the generated MP4 file to the client
    res.download(videoPath);

  } catch (error) {
    console.error('Error in generateVideoController:', error);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Failed to generate video' });
    }
  }
};
