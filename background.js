chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "GET_API_RESPONSE") {
      const GROQ_API_KEY = "YOUR GROQ API"; // Replace with your API key
      const url = "https://api.groq.com/openai/v1/chat/completions";
      const model = "llama3-70b-8192";
  
      // Simplify the prompt for testing
      const prompt = `User question: ${message.userQuestion}`; // Remove webpage content temporarily
  
      console.log("Sending API request with model:", model);
      console.log("Prompt:", prompt);
  
      fetch(url, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: model,
          messages: [
            { role: "system", "content": "You are a helpful assistant. give the answare in short" },
            { role: "user", "content": prompt }
          ],
          max_tokens: 500
        })
      })
        .then(response => {
          console.log("API response status:", response.status);
          return response.json();
        })
        .then(data => {
          console.log("API response data:", data);
          if (data.choices && data.choices[0]) {
            console.log("Sending successful response to popup.js");
            sendResponse({ text: data.choices[0].message.content });
          } else {
            console.log("Sending error response to popup.js");
            sendResponse({ error: "No response from API", details: data });
          }
        })
        .catch(error => {
          console.error("API request error:", error);
          console.log("Sending error response to popup.js");
          sendResponse({ error: error.message });
        });
  
      return true;
    }
  });
