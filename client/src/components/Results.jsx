import React, { useState } from 'react';
import { generateVideo } from '../services/api.js';

const Results = ({ formData }) => {
  const [status, setStatus] = useState('Enter assignment details and click Generate');
  const [videoBlob, setVideoBlob] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    const { subject, lu, content } = formData;

    if (!subject || !lu || !content) {
      alert('Please fill out all the fields before generating.');
      return;
    }

    try {
      setLoading(true);
      setVideoBlob(null);

      // We stagger statuses for display purposes, but all steps are handled by one API call natively.
      setStatus('Generating script, voiceover, and video...');

      const blob = await generateVideo(subject, lu, content);

      setVideoBlob(blob);
      setStatus('Your video is ready to download');
    } catch (error) {
      setStatus('Failed to generate video. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!videoBlob) return;

    // Convert subject: "Backend Development" -> "backend-development" string format
    const subjectSlug = formData.subject
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
    
    // Final format: backend-development_LU14.mp4
    const filename = `${subjectSlug}_${formData.lu}.mp4`;

    const url = URL.createObjectURL(videoBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Clean up memory
    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 1000);
  };

  return (
    <div className="results-container">
      <p className="status-text">{status}</p>

      {!videoBlob && (
        <button 
          onClick={handleGenerate} 
          disabled={loading}
          className="generate-btn"
        >
          {loading ? 'Generating...' : 'Generate'}
        </button>
      )}

      {videoBlob && !loading && (
        <button 
          onClick={handleDownload}
          className="download-btn"
        >
          Download Video
        </button>
      )}
    </div>
  );
};

export default Results;
