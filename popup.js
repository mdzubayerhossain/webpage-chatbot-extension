document.getElementById("toggle-sidebar").addEventListener("click", () => {
    console.log("Toggle Sidebar button clicked");
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length === 0) {
        console.error("No active tab found");
        document.body.innerHTML += "<p style='color: red;'>Error: No active tab found.</p>";
        return;
      }
      const tabId = tabs[0].id;
      const tabUrl = tabs[0].url;
      console.log("Active tab ID:", tabId, "URL:", tabUrl);
  
      if (tabUrl.startsWith("chrome://") || tabUrl.startsWith("chrome-extension://")) {
        console.error("Cannot inject into chrome:// or extension pages");
        document.body.innerHTML += "<p style='color: red;'>Error: This extension cannot run on chrome:// or extension pages.</p>";
        return;
      }
  
      chrome.scripting.insertCSS({
        target: { tabId: tabId },
        files: ["content.css"]
      }, () => {
        if (chrome.runtime.lastError) {
          console.error("Error injecting CSS:", chrome.runtime.lastError.message);
          document.body.innerHTML += `<p style='color: red;'>Error: ${chrome.runtime.lastError.message}</p>`;
          return;
        }
        console.log("CSS injected");
  
        chrome.scripting.executeScript({
          target: { tabId: tabId },
          function: setupSidebar
        }, (results) => {
          if (chrome.runtime.lastError) {
            console.error("Error executing script:", chrome.runtime.lastError.message);
            document.body.innerHTML += `<p style='color: red;'>Error: ${chrome.runtime.lastError.message}</p>`;
          } else {
            console.log("Script executed:", results);
          }
        });
      });
    });
  });
  
  function setupSidebar() {
    let sidebar = document.getElementById("chatbot-sidebar");
    if (!sidebar) {
      sidebar = document.createElement("div");
      sidebar.id = "chatbot-sidebar";
      sidebar.className = "chatbot-sidebar hidden";
      sidebar.innerHTML = `
        <div class="chatbot-header">
          <h2>Chatbot Assistant</h2>
          <button id="chatbot-toggle-btn">Close</button>
        </div>
        <div class="chatbot-history" id="chatbot-history"></div>
        <div class="chatbot-input">
          <textarea id="chatbot-input-box" placeholder="Ask a question about this page..."></textarea>
          <button id="chatbot-send-btn">Send</button>
        </div>
      `;
      document.body.appendChild(sidebar);
      console.log("Sidebar created and appended");
  
      const toggleBtn = document.getElementById("chatbot-toggle-btn");
      toggleBtn.addEventListener("click", () => {
        sidebar.classList.toggle("hidden");
        console.log("Sidebar toggled via close button");
      });
  
      const sendBtn = document.getElementById("chatbot-send-btn");
      const inputBox = document.getElementById("chatbot-input-box");
  
      sendBtn.addEventListener("click", () => {
        const userQuestion = inputBox.value.trim();
        console.log("Send button clicked, user question:", userQuestion);
        if (userQuestion) {
          const history = document.getElementById("chatbot-history");
          if (!history) {
            console.error("Chat history element not found");
            return;
          }
          const userMessage = document.createElement("div");
          userMessage.className = "chatbot-message user";
          userMessage.textContent = userQuestion;
          history.appendChild(userMessage);
          history.scrollTop = history.scrollHeight;
          console.log("User message displayed in history");
  
          const webpageContent = document.body.innerText;
          console.log("Sending API request with webpage content length:", webpageContent.length);
  
          // Use a Promise to ensure the message channel stays open
          new Promise((resolve) => {
            chrome.runtime.sendMessage({
              type: "GET_API_RESPONSE",
              webpageContent: webpageContent,
              userQuestion: userQuestion
            }, (response) => {
              resolve(response);
            });
          }).then(response => {
            console.log("API response received:", response);
            const history = document.getElementById("chatbot-history"); // Re-check history element
            if (!history) {
              console.error("Chat history element not found after API response");
              return;
            }
            const botMessage = document.createElement("div");
            botMessage.className = "chatbot-message bot";
            botMessage.textContent = response.error ? "Error: " + response.error : response.text;
            history.appendChild(botMessage);
            history.scrollTop = history.scrollHeight;
            console.log("Bot message displayed in history");
          }).catch(error => {
            console.error("Error receiving API response:", error);
          });
  
          inputBox.value = "";
        } else {
          console.log("No user question entered");
        }
      });
  
      inputBox.addEventListener("keypress", (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          sendBtn.click();
        }
      });
    }
  
    sidebar.classList.toggle("hidden");
    console.log("Sidebar toggled via injected script");
  }