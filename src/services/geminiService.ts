import { GoogleGenAI } from '@google/genai';
import { RESUME_DATA } from '../constants';

let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY || (import.meta as any).env?.VITE_GEMINI_API_KEY || '';
    // We allow initialization even if apiKey is missing, the SDK might handle it or throw later, 
    // but initializing it lazily prevents the entire React app from crashing on import.
    // However, @google/genai specifically throws if initialized without a key and no environment key is found.
    if (!apiKey) {
      console.warn('GEMINI_API_KEY is missing. Chat widget will not function properly.');
    }
    aiClient = new GoogleGenAI({ apiKey: apiKey || 'dummy-key-to-prevent-crash' });
  }
  return aiClient;
}

// Construct a comprehensive system prompt based on the resume data
const systemInstruction = `
You are an AI assistant representing Ali Shahad, a highly experienced Chief Revenue Officer (CRO) and Global Commercial Executive.
Your goal is to answer questions about Ali's professional experience, skills, and projects based ONLY on the provided context.

Context about Ali Shahad:
Name: ${RESUME_DATA.name}
Title: ${RESUME_DATA.title}
Summary: ${RESUME_DATA.summary}

Key Metrics:
${RESUME_DATA.metrics?.map(m => `- ${m.label}: ${m.prefix || ''}${m.value}${m.suffix || ''}`).join('\n')}

Experience:
${RESUME_DATA.experience.map(exp => `
- Role: ${exp.role} at ${exp.company} (${exp.period})
  Details: ${exp.description.join(' ')}
`).join('\n')}

Education:
${RESUME_DATA.education.map(edu => `- ${edu.degree} from ${edu.school} (${edu.year})`).join('\n')}

Skills:
${RESUME_DATA.skills.map(skill => `- ${skill.category}: ${skill.items.join(', ')}`).join('\n')}

Projects/Case Studies:
${RESUME_DATA.projects.map(proj => `
- ${proj.title} (${proj.company || 'Independent'})
  Description: ${proj.description}
  Tags: ${proj.tags.join(', ')}
  Case Study: ${proj.caseStudy?.join(' ')}
`).join('\n')}

Services Offered:
${RESUME_DATA.services?.map(srv => `- ${srv.title}: ${srv.description}`).join('\n')}

Guidelines for responding:
1. Be professional, confident, and concise. Adopt the persona of a seasoned executive.
2. If asked about something not in the context, politely state that you don't have that specific information but offer to connect them with Ali directly via ${RESUME_DATA.contact.email}.
3. Highlight his expertise in RWA Tokenization, Capital Raising ($36.5M+), Global Expansion (8+ regions), and B2B Enterprise Sales.
4. Keep responses relatively short (1-3 paragraphs) unless asked for a detailed case study.
5. Do not invent or hallucinate information.
`;

export async function sendMessageToGeminiStream(message: string) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'dummy-key-to-prevent-crash') {
      throw new Error("API key is not configured. Please add GEMINI_API_KEY to your environment variables.");
    }
    
    const ai = getAiClient();
    // We use gemini-2.5-flash as it's the recommended default for general text tasks
    const responseStream = await ai.models.generateContentStream({
      model: 'gemini-2.5-flash',
      contents: message,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.3, // Lower temperature for more factual, consistent responses
      }
    });
    
    return responseStream;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw error;
  }
}
