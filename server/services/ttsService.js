import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';

const basePath =
  process.env.NODE_ENV === "development"
    ? process.cwd()
    : process.resourcesPath

const PIPER_PATH = path.join(basePath, "binaries/piper/piper.exe")
const MODEL_PATH = path.join(basePath, "binaries/piper/en_US-lessac-medium.onnx")

const toSlug = (text) => {
  return text
    .toLowerCase() // lowercase
    .replace(/[^a-z0-9\s-]/g, '') // remove special characters
    .trim()
    .replace(/\s+/g, '-'); // spaces replaced with hyphens
};

export const generateVoice = (subject, lu, script) => {
  return new Promise((resolve, reject) => {
    try {
      // Create output directory if it doesn't exist
      const outputDir = path.resolve('temp', 'audio');
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      const subjectSlug = toSlug(subject);
      const filename = `${subjectSlug}_${lu}_audio.wav`;
      const outputPath = path.join(outputDir, filename);

      // We use spawn to cleanly pipe the script text to piper's stdin 
      // without encountering shell max-length or quote-escaping issues on Windows.
      const piper = spawn(PIPER_PATH, [
        '--model', MODEL_PATH,
        '--output_file', outputPath
      ]);

      piper.on('close', (code) => {
        if (code === 0) {
          resolve(outputPath);
        } else {
          reject(new Error(`Piper TTS exited with code ${code}`));
        }
      });

      piper.on('error', (error) => {
        console.error('Failed to start Piper TTS process:', error);
        reject(error);
      });

      // Pass the script text to standard input (equivalent to echo "text" | ...)
      piper.stdin.write(script);
      piper.stdin.end();

    } catch (error) {
      reject(error);
    }
  });
};
