export const generateVideo = async (subject, lu, content) => {
  try {
    const response = await fetch('http://localhost:5001/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        subject,
        lu,
        content
      })
    });

    if (!response.ok) {
      throw new Error(`Failed to generate video: ${response.statusText}`);
    }

    // Since the backend streams/sends the MP4 file back, convert it to a Blob
    const videoBlob = await response.blob();
    return videoBlob;

  } catch (error) {
    console.error('API Error in generateVideo:', error);
    throw error;
  }
};
