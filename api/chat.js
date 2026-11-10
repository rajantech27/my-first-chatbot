
export default async function handler(req, res) {
  // 1. Allow POST requests only
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");

    return res.status(405).json({
      error: "Method not allowed. Please use POST."
    });
  }

  try {
    // 2. Check whether the Groq API key exists
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: "Groq API key is missing. Configure GROQ_API_KEY."
      });
    }

    // 3. Read the incoming data
    const body =
      typeof req.body === "string"
        ? JSON.parse(req.body)
        : req.body;

    // 4. Validate the incoming messages
    if (
      !body ||
      typeof body !== "object" ||
      !Array.isArray(body.messages)
    ) {
      return res.status(400).json({
        error: "Invalid request. Messages must be an array."
      });
    }

    const messages = body.messages;

    if (messages.length === 0 || messages.length > 20) {
      return res.status(400).json({
        error: "Send between 1 and 20 conversation messages."
      });
    }

    const validMessages = messages.every((message) => {
      return (
        message &&
        typeof message === "object" &&
        ["user", "assistant"].includes(message.role) &&
        typeof message.content === "string" &&
        message.content.trim().length > 0 &&
        message.content.length <= 4000
      );
    });

    if (!validMessages) {
      return res.status(400).json({
        error: "One or more messages have invalid content."
      });
    }

    // The latest message must come from the user
    if (messages[messages.length - 1].role !== "user") {
      return res.status(400).json({
        error: "The last message must be from the user."
      });
    }

    // 5. Add instructions for the AI
    const conversation = [
      {
        role: "system",
        content:
          "You are My First AI Chatbot, a friendly and helpful AI assistant. " +
          "Explain things clearly, especially to beginners. " +
          "Use simple language and practical examples."
      },
      ...messages.map((message) => ({
        role: message.role,
        content: message.content.trim()
      }))
    ];

    // 6. Send the conversation to Groq
    const groqResponse = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "openai/gpt-oss-20b",
          messages: conversation,
          temperature: 0.7,
          max_completion_tokens: 1024
        })
      }
    );

    // 7. Handle errors returned by Groq
    if (!groqResponse.ok) {
      const errorData = await groqResponse.json().catch(() => ({}));

      console.error("Groq API error:", errorData);

      return res.status(502).json({
        error: "The AI service could not process your request. Please try again."
      });
    }

    // 8. Extract the AI response
    const data = await groqResponse.json();

    const aiMessage = data.choices?.[0]?.message?.content;

    if (typeof aiMessage !== "string" || !aiMessage.trim()) {
      return res.status(502).json({
        error: "The AI returned an empty response."
      });
    }

    // 9. Send the response back to the frontend
    return res.status(200).json({
      reply: aiMessage.trim()
    });

  } catch (error) {
    // 10. Handle unexpected errors
    console.error("Chat API error:", error);

    return res.status(500).json({
      error: "Something went wrong on the server. Please try again."
    });
  }
}
