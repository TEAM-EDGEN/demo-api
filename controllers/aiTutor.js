import genAI from '../config/generativeAI.js';

// Example usage in a controller function
export const generateText = async (req, res) => {
  try {
    // Get the specific generative model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Extract the prompt from the request body or use a default prompt
    const prompt = req.body.prompt || "Write a story about an AI and magic";

    // Generate content using the model
    const result = await model.generateContent(prompt);

    // Extract the response and text content
    const response = await result.response;
    const text = await response.text();

    // Send the generated text as the response
    res.json({ text });
  } catch (error) {
    // Handle errors and send an error response
    console.error("Error generating content:", error);
    res.status(500).json({ message: 'Error generating text' });
  }
};


// Example usage in a controller function
export const generateChatResponse = async (req, res) => {
  try {
    // Get the specific generative model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Initialize the chat with some history (this can be dynamic based on your use case)
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: "Hello" }],
        },
        {
          role: "model",
          parts: [{ text: "Great to meet you. What would you like to know?" }],
        },
      ],
    });

    // Send the user's message to the chat
    let result = await chat.sendMessage(req.body.message || "I have 2 dogs in my house.");

    // Log and return the first response from the chat
    console.log(result.response.text());
    let responseText = result.response.text();

    // Optionally, send another message and return that response
    if (req.body.followUpMessage) {
      result = await chat.sendMessage(req.body.followUpMessage);
      console.log(result.response.text());
      responseText += '\n' + result.response.text();
    }

    // Send the combined responses back to the client
    res.json({ text: responseText });
  } catch (error) {
    // Handle errors and send an error response
    console.error("Error generating chat response:", error);
    res.status(500).json({ message: 'Error generating chat response' });
  }
};




