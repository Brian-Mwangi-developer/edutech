// lib/ai.ts
"use server";
import {Discussions} from "@/lib/discussiontypes";
import * as sdk from "microsoft-cognitiveservices-speech-sdk";
import {queryDocumentContent} from "@/lib/azureSearch";

export interface ChatMessage {
  role: string;
  content: string;
}

export interface CoachingOption {
  name: string;
  prompt: string;
}


export async function AIModelAzure(
  topic: string,
  coachingOption: string,
  lastTwoConversation: ChatMessage[],
  fileName?: string,
): Promise<ChatMessage> {
  // Find the appropriate coaching option.
  const option = Discussions.find((item) => item.name === coachingOption);
  if (!option) {
    throw new Error("Invalid coaching option");
  }


  // const PROMPT = option.prompt.replace("{user_topic}", topic);

  const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
  console.log("endpoint", endpoint)
  const apiKey = process.env.AZURE_AI_API_KEY;
  console.log("apiKey", apiKey)
  const apiVersion = "2025-01-01-preview";

  if (!endpoint || !apiKey) {
    throw new Error("Missing API credentials");
  }
  const url = `${endpoint}/openai/deployments/gpt-4/chat/completions?api-version=${apiVersion}`;

  let context:any = '';
  if (fileName && fileName !== 'unknown.pdf' && fileName !== '') {
    try {
      // Get the last user message
      const userQuery = lastTwoConversation
        .filter(m => m.role === 'user')
        .slice(-1)[0]?.content || '';

      // Query Azure Search with document name and user's question
      context = await queryDocumentContent(fileName, userQuery);
    } catch (error) {
      console.error('Error querying document content:', error);
    }
  }


  const PROMPT = `
  ${option.prompt.replace("{user_topic}", topic)}
  ${context ? `
  ### DOCUMENT CONTEXT ###
  The user is working with the document "${fileName}". Here are relevant sections:
  ${context}
  
  Use this context to:
  - Answer questions specifically about the document content
  - Generate relevant questions based on the document
  - Provide insights combining the document content and coaching topic
  ` : ''}
  
  If asked to generate questions, create them based on the document content.
  If answering questions, focus on information from the document.
  `;
  // Build the message history.
  const messages: ChatMessage[] = [
    { role: "assistant", content: PROMPT },
    ...lastTwoConversation,
  ];



  // Prepare the payload.
  const payload = {
    messages,
    max_tokens: 2048,
    temperature: 0.7,
    top_p: 0.95,
    frequency_penalty: 0,
    presence_penalty: 0,
  };

  // Call the Azure OpenAI API.
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": apiKey,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Azure API Error:", errorData);
    throw new Error(`Azure API Error: ${JSON.stringify(errorData)}`);
  }

  // Parse and return the AI's response.
  const data = await response.json();
  const message = data?.choices?.[0]?.message;
  console.log("AI Response:", message);
  return message;
}

export const ConvertTextToSpeech = async (
  text: string,
  expertVoice: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    // Configure the Speech Service using your environment variables
    const speechConfig = sdk.SpeechConfig.fromSubscription(
      process.env.SPEECH_KEY!,
      process.env.SPEECH_REGION!
    );
    // Set the output format to MP3 (or choose another format as needed)
    speechConfig.speechSynthesisOutputFormat =
      sdk.SpeechSynthesisOutputFormat.Audio16Khz128KBitRateMonoMp3;
    // Set the voice name (e.g., "en-US-AvaMultilingualNeural")
    speechConfig.speechSynthesisVoiceName = expertVoice;

    // Create the synthesizer instance
    const synthesizer = new sdk.SpeechSynthesizer(speechConfig);

    // Start synthesizing text to speech
    synthesizer.speakTextAsync(
      text,
      (result) => {
        if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
          // Convert the returned audio data (an ArrayBuffer) into a Node Buffer
          const audioBuffer = Buffer.from(result.audioData);
          // Convert the buffer to a base64 encoded string
          const base64Audio = audioBuffer.toString("base64");
          // Create a data URL for the audio
          const audioUrl = `data:audio/mp3;base64,${base64Audio}`;
          synthesizer.close();
          resolve(audioUrl);
        } else {
          synthesizer.close();
          reject(new Error(result.errorDetails || "Speech synthesis failed"));
        }
      },
      (error) => {
        synthesizer.close();
        reject(error);
      }
    );
  });
};