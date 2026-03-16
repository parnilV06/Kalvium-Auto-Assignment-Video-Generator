import { GoogleGenerativeAI } from '@google/generative-ai';

export const generateScript = async (subject, lu, content) => {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const prompt = `You are a student explaining your programming assignment in a short voiceover script.

Subject: ${subject}
Learning Unit: ${lu}
Content Implemented: ${content}

The script should:
- Explain what was implemented
- Describe the functionality added
- Mention the learning unit explicitly
- Sound like a student explaining their assignment naturally
- Be around 2-3 minutes long.`;

    const result = await model.generateContent(prompt);
    return result.response.text().trim();
  } catch (error) {
    console.error('Error generating script with Gemini:', error);
    throw new Error('Failed to generate script');
  }
};
