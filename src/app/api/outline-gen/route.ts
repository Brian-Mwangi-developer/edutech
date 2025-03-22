export async function POST(request: Request) {
  try {
    const { prompt } = await request.json(); // Extract user input

    if (!prompt) {
      return new Response(JSON.stringify({ error: "Prompt is required" }), { status: 400 });
    }
    // console.log(prompt);

    const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
    const apiKey = process.env.AZURE_AI_API_KEY;
    const apiVersion = "2025-01-01-preview";

    if (!endpoint || !apiKey) {
      return new Response(JSON.stringify({ error: "Missing API credentials" }), { status: 500 });
    }

    const url = `${endpoint}/openai/deployments/gpt-4/chat/completions?api-version=${apiVersion}`;

    // Updated system prompt: explicitly instructs to generate exactly the number of chapters as specified in the input prompt.
    const systemPrompt = `
You are an AI Course Generator tasked with creating detailed explanations for a specified course.
You must generate a JSON response following the schema below, and ensure that the "Chapters" array contains exactly the number of chapters as specified in the "NoOfChapters" field from the input.
The JSON output must include the following keys:
- "CourseName"
- "Description"
- "Category"
- "Topic"
- "Level"
- "Duration"
- "NoOfChapters"
- "Chapters": An array of chapter objects.
Each chapter object must contain:
- "ChapterName"
- "About": A full-paragraph explanation (minimum 5 descriptive sentences).
- "Duration"
- "CodeExample": Wrap code examples in "<precode>" tags if applicable, otherwise use "N/A".
Make sure the Json is complete and every field is filled correctly. your response should be a complete json
Example Input:
Generate A course Tutorial on following detail with field as Course Name, description Along with ChapterName, about,Duration. Category:Programming,Topic:Python,Level:Intermediate,Duration:1 hour,NoOfChapters:4,In JSON format

Ensure the generated JSON exactly follows the schema and produces the number of chapters as indicated.
`;


    const messageHistory: { role: "system" | "user" | "assistant"; content: string }[] = [
      { role: "system", content: systemPrompt },
      { role: "user", content: prompt },
    ];

    const payload = {
      messages: messageHistory,
      max_tokens: 2048,
      temperature: 0.7,
      top_p: 0.95,
      frequency_penalty: 0,
      presence_penalty: 0,
    };

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
      return new Response(JSON.stringify({ error: errorData }), { status: response.status });
    }

    const data = await response.json();
    const aiResponse = data?.choices?.[0]?.message?.content || "No response from AI.";
    // console.log("AI Response:", aiResponse);
    return new Response(aiResponse,{ status: 200 });

  } catch (error) {
    console.error("Request Error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
