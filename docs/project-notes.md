
# My First AI Chatbot - Project Notes

## 1. Project Overview

My First AI Chatbot is a beginner-friendly full-stack
web application that allows users to communicate with
an AI assistant.

The application uses HTML, CSS and Vanilla JavaScript
for the frontend.

Node.js handles backend operations, while Groq API
provides artificial intelligence responses.

Vercel is used for local development and deployment.

## 2. Technologies Used

### HTML
HTML creates the structure of our chatbot webpage.

### CSS
CSS controls the appearance, colours, spacing,
layout and responsiveness of the chatbot.

### Vanilla JavaScript
JavaScript handles user interactions, sends messages
to the backend and displays AI responses.

### Node.js
Node.js allows JavaScript to execute outside the browser.
It powers our backend API.

### Groq API
Groq provides access to AI models that generate
responses based on user messages.

### Vercel
Vercel hosts our frontend and runs our backend
as a serverless function.

### Git
Git tracks changes made to our project.

### GitHub
GitHub stores our project repository online.

## 3. Project Architecture

Our application follows a simple frontend-backend
architecture.

The process works as follows:

1. The user opens index.html in their browser
   through the local Vercel development server.

2. The user enters a message in the chatbot.

3. JavaScript reads the message.

4. JavaScript sends the conversation to
   the /api/chat endpoint.

5. The Node.js backend receives the request.

6. The backend reads the Groq API key from
   the environment variables.

7. Node.js sends the conversation to Groq.

8. Groq generates an AI response.

9. The backend sends the response to the frontend.

10. JavaScript displays the response in the chatbot.

## 4. Folder Structure

### api/

Contains backend API functions.

### src/

Contains frontend resources.

### src/css/

Contains CSS files responsible for styling.

### src/js/

Contains JavaScript files responsible for
chat functionality.

### docs/

Contains project documentation and learning notes.

## 5. Purpose of Every File

### api/chat.js

This file contains our backend API.

It receives messages from the frontend,
communicates with Groq and returns AI responses.

### src/css/style.css

This file controls the visual appearance
of the chatbot.

### src/js/script.js

This file handles message sending, conversation
history, API requests, loading indicators
and error handling.

### index.html

This is the main webpage of our application.

It contains the chatbot heading, welcome message,
conversation area, input and Send button.

### package.json

Contains project information, npm scripts
and development dependencies.

### .gitignore

Specifies which files Git should ignore.

### .env.example

Provides an example of the environment
variables required by the project.

### .env.local

Stores the actual Groq API key locally.
It must never be uploaded to GitHub.

### README.md

Provides installation instructions, setup details
and deployment documentation.

## 6. API Communication

Our frontend communicates with the backend
using the Fetch API.

Endpoint:

POST /api/chat

Request example:

{
  "messages": [
    {
      "role": "user",
      "content": "Hello!"
    }
  ]
}

Successful response example:

{
  "reply": "Hello! How can I help you today?"
}

## 7. Conversation History

The frontend maintains an array called
conversationHistory.

It stores user messages and AI responses
during the current browser session.

This allows the AI to understand previous
messages in the conversation.

The conversation is not permanently stored.

Refreshing the webpage resets the conversation.

## 8. Security

The Groq API key is stored in environment variables.

The frontend never receives the actual API key.

The backend uses process.env.GROQ_API_KEY
to access the secret credential.

The .gitignore file prevents .env.local
from being uploaded to GitHub.

## 9. Deployment

The application can be deployed through Vercel.

Vercel serves the frontend and executes
the backend function inside the api directory.

The GROQ_API_KEY environment variable must
also be configured in the Vercel dashboard.

## 10. Learning Outcomes

After completing this project, students should understand:

- Basic HTML structure.
- CSS styling and responsive design.
- JavaScript variables and functions.
- Arrays and objects.
- DOM manipulation.
- Event listeners.
- Async and await.
- Fetch API.
- JSON communication.
- Basic backend development with Node.js.
- API integration.
- Environment variables.
- Git and GitHub.
- Deployment using Vercel.

## 11. Future Improvements

Possible improvements include:

- Chat reset button.
- Dark mode.
- Message timestamps.
- Markdown formatting for AI responses.
- Conversation export.
- User authentication.
- Persistent conversation storage.
- Rate limiting.
- Better input validation.
