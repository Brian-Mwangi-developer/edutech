export async function POST(request: Request) {
  try {
    const { prompt } = await request.json(); // Extract user input

    if (!prompt) {
      return new Response(
        JSON.stringify({ error: "Prompt is required" }),
        { status: 400 }
      );
    }

    const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
    const apiKey = process.env.AZURE_AI_API_KEY;
    const apiVersion = "2025-01-01-preview";

    if (!endpoint || !apiKey) {
      return new Response(
        JSON.stringify({ error: "Missing API credentials" }),
        { status: 500 }
      );
    }

    const url = `${endpoint}/openai/deployments/gpt-4/chat/completions?api-version=${apiVersion}`;

    const systemPrompt = `
You are an AI Chapter Content Generator tasked with producing detailed and insightful explanations for a specified chapter in a course.
Your response must be a valid JSON object with the following keys:
- "title": A string representing the chapter title.
- "explanation": A string that provides a comprehensive explanation of the chapter. This explanation must be at least one paragraph containing no fewer than 5 detailed lines. It should cover the key concepts, provide contextual examples, mention potential pitfalls, and offer actionable insights that will help learners fully grasp the chapter's content.
- "code_example": A string containing a code example if applicable. Wrap any code example within "<precode>" tags. If no relevant code is available, set this field to "N/A".

Example Input:
Generate detailed chapter content for the course "Introduction to Python", Chapter "Variables and Data Types".

Example Output:
{
  "title": "Variables and Data Types",
  "explanation": "This chapter introduces the fundamental concepts of variables and data types in Python. Variables are used as containers to store data values. Python infers the data type automatically based on the assigned value. Key data types include integers, floats, strings, and booleans. The explanation covers how these types affect operations and memory usage, and discusses common pitfalls and best practices.",
  "code_example": "<precode>\\n# Example: Variables and Data Types\\nage = 30\\nheight = 5.9\\nname = \\\"Alice\\\"\\nis_student = True\\n</precode>"
}

Ensure that your output strictly follows the JSON schema above and that every field is correctly filled.
    `;

    const messageHistory = [
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
    return new Response(aiResponse, { status: 200 });

  } catch (error) {
    console.error("Request Error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
