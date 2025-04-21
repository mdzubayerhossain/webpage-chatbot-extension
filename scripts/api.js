async function sendToGROQ(userInput, pageContent) {
    const apiKey = "YOUR KEY"; // Replace with your real key in dev
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant. Answer questions based on webpage content."
          },
          {
            role: "user",
            content: `Webpage content: ${pageContent}\n\nQuestion: ${userInput}`
          }
        ]
      })
    });
  
    const data = await response.json();
    return data.choices[0].message.content;
  }
  
