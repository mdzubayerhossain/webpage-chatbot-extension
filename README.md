# Chrome Extension Chatbot: Converse with Webpages

![image](https://github.com/user-attachments/assets/dc92c665-8f73-46e4-941c-52603d5f0adb)

*Screenshot of the Chrome extension in action, showing the sidebar on a university webpage.*

## Overview

This Chrome extension allows users to interact with webpages conversationally, extracting specific information like university admission requirements or faculty lists with ease. Built as a personal project to streamline research, the extension features a toggleable sidebar where users can ask questions, and it leverages the GROQ API to process webpage content and provide concise answers.

The project was inspired by the challenge of navigating complex university webpages to find international requirements for bachelor's programs. With this extension, users can simply ask questions like "List the professors in the AI and ML faculty" and get answers directly from the webpage.

## Features

* **Toggleable Sidebar**: A user-friendly sidebar that can be opened or closed with a single click.
* **Conversational Interface**: Ask questions about the webpage content and get concise answers in a chat-like UI.
* **Webpage Content Extraction**: Extracts text from the current webpage to provide context for the chatbot.
* **GROQ API Integration**: Uses the llama3-70b-8192 model to process questions and generate responses.
* **Responsive Design**: Smooth animations and a clean UI for seamless interaction on any webpage.

## Installation

1. Clone this repository:
   ```
   git clone https://github.com/mdzubayerhossain/webpage-chatbot-extension.git
   ```
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top-right corner
4. Click "Load unpacked" and select the cloned repository folder
5. The extension icon should now appear in your Chrome toolbar

## Usage

1. Navigate to any webpage you want to query
2. Click the extension icon in your toolbar to toggle the sidebar
3. Type your question about the webpage content in the chat input
4. Receive concise answers extracted directly from the page content

## Configuration

To use this extension with your own GROQ API key:

1. Sign up for a GROQ API key at [groq.com](https://groq.com)
2. Create a `config.js` file in the project root with the following:
   ```javascript
   const API_KEY = 'your_groq_api_key_here';
   export default API_KEY;
   ```
3. Reload the extension in Chrome

## Technical Details

- **Frontend**: HTML, CSS, JavaScript
- **API**: GROQ API with llama3-70b-8192 model
- **Browser**: Chrome Extension Manifest V3

## Future Improvements

- [ ] Add support for more browsers (Firefox, Edge)
- [ ] Implement history saving for previous queries
- [ ] Enhance text extraction accuracy for complex webpages
- [ ] Add custom styling options for the sidebar

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Md Zubayer Hossain - [GitHub](https://github.com/mdzubayerhossain)

Project Link: [https://github.com/mdzubayerhossain/webpage-chatbot-extension](https://github.com/mdzubayerhossain/webpage-chatbot-extension)
