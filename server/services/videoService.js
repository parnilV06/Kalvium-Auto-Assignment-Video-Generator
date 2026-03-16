import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';

const toSlug = (text) => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
};

export const generateVideo = (subject, lu, audioPath) => {
  return new Promise((resolve, reject) => {
    try {
      // Create output directory if it doesn't exist
      const outputDir = path.resolve('temp', 'video');
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      const subjectSlug = toSlug(subject);
      const filename = `${subjectSlug}_${lu}.mp4`;
      const outputPath = path.join(outputDir, filename);

      const basePath =
        process.env.NODE_ENV === "development"
          ? process.cwd()
          : process.resourcesPath;

      const ffmpegPath = path.join(basePath, "binaries/ffmpeg/ffmpeg.exe");

      const ffmpeg = spawn(ffmpegPath, [
        '-y', // Overwrite output file if it exists
        '-f', 'lavfi',
        '-i', 'color=c=black:s=1280x720',
        '-i', audioPath,
        '-shortest',
        '-c:v', 'libx264',
        '-c:a', 'aac',
        outputPath
      ]);

      ffmpeg.on('close', (code) => {
        if (code === 0) {
          resolve(outputPath);
        } else {
          reject(new Error(`FFmpeg exited with code ${code}`));
        }
      });

      ffmpeg.on('error', (error) => {
        console.error('Failed to start FFmpeg process:', error);
        reject(error);
      });

    } catch (error) {
      reject(error);
    }
  });
};
