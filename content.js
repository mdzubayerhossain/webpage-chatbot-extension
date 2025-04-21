console.log("content.js loaded");

// Create a simple sidebar for testing
if (!document.getElementById("chatbot-sidebar")) {
  const sidebar = document.createElement("div");
  sidebar.id = "chatbot-sidebar";
  sidebar.className = "chatbot-sidebar"; // Start visible for debugging
  sidebar.innerHTML = `
    <div class="chatbot-header">
      <h2>Chatbot Assistant</h2>
      <button id="chatbot-toggle-btn">Close</button>
    </div>
    <div class="chatbot-content">Sidebar Content</div>
  `;
  document.body.appendChild(sidebar);
  console.log("Sidebar created and appended");

  // Add toggle button listener
  const toggleBtn = document.getElementById("chatbot-toggle-btn");
  toggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("hidden");
    console.log("Sidebar toggled via close button");
  });
}

// Listen for toggle messages
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Message received in content.js:", message);
  if (message.type === "TOGGLE_SIDEBAR") {
    const sidebar = document.getElementById("chatbot-sidebar");
    if (sidebar) {
      sidebar.classList.toggle("hidden");
      console.log("Sidebar toggled via message");
      sendResponse({ status: "Sidebar toggled" });
    } else {
      console.error("Sidebar not found");
      sendResponse({ status: "Sidebar not found" });
    }
  }
});