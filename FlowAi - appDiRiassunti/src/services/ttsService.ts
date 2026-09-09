import { GoogleGenAI, Modality } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export const generateSpeech = async (text: string, language: 'en' | 'it' = 'en') => {
  try {
    const prompt = language === 'it' 
      ? `Leggi questo riassunto con voce calma e professionale: ${text}`
      : `Read this summary with a calm and professional voice: ${text}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { 
              voiceName: language === 'it' ? 'Kore' : 'Puck' 
            },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    
    if (base64Audio) {
      return base64Audio;
    }
    
    throw new Error("Failed to generate audio data");
  } catch (error) {
    console.error("TTS Error:", error);
    throw error;
  }
};

/**
 * Plays raw PCM audio data from Gemini TTS (24kHz, mono)
 */
export const playPCMAudio = async (base64Data: string, onEnded?: () => void) => {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
  
  // Convert base64 to ArrayBuffer
  const binaryString = window.atob(base64Data);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  
  // Gemini TTS returns raw PCM 16-bit data. 
  // We need to convert it to Float32 for Web Audio API
  const pcm16 = new Int16Array(bytes.buffer);
  const float32 = new Float32Array(pcm16.length);
  
  for (let i = 0; i < pcm16.length; i++) {
    float32[i] = pcm16[i] / 32768.0;
  }
  
  const audioBuffer = audioContext.createBuffer(1, float32.length, 24000);
  audioBuffer.getChannelData(0).set(float32);
  
  const source = audioContext.createBufferSource();
  source.buffer = audioBuffer;
  source.connect(audioContext.destination);
  
  if (onEnded) {
    source.onended = onEnded;
  }
  
  source.start();
  return { source, audioContext };
};
