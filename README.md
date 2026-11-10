
# My First AI Chatbot 🤖

A beginner-friendly AI chatbot built using HTML, CSS,
Vanilla JavaScript, Node.js, Groq API and Vercel.

This project is designed for students who are learning
web development and AI integration for the first time.

---

## 1. Project Overview

My First AI Chatbot is a simple web application that
allows users to communicate with an AI assistant.

Users can enter messages and receive AI-generated
responses in real time.

The chatbot maintains conversation history during
the current browser session.

---

## 2. Technologies Used

- HTML - Frontend structure
- CSS - Frontend styling
- Vanilla JavaScript - Frontend functionality
- Node.js - Backend runtime
- Groq API - AI responses
- Vercel - Hosting and serverless functions
- Git - Version control
- GitHub - Online code repository

---

## 3. Project Structure

my-first-chatbot/

├── api/
│   └── chat.js

├── src/
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── script.js

├── docs/
│   └── project-notes.md

├── index.html
├── package.json
├── .gitignore
├── .env.example
└── README.md

---

## 4. Prerequisites

Before starting, make sure you have installed:

1. Node.js (LTS version)
2. npm (included with Node.js)
3. Git
4. A code editor such as Visual Studio Code
5. A Groq account
6. A Vercel account

Download the required software:

Node.js:
https://nodejs.org/

Git:
https://git-scm.com/

Visual Studio Code:
https://code.visualstudio.com/

Vercel:
https://vercel.com/

Groq:
https://console.groq.com/

---

## 5. Installation

### Step 1: Download or clone the project

If you are using Git:

git clone YOUR_GITHUB_REPOSITORY_URL

Move into the project folder:

cd my-first-chatbot

### Step 2: Install dependencies

Run:

npm install

This installs the packages listed in package.json.

### Step 3: Configure the Groq API key

Create a file named:

.env.local

Inside this file, add:

GROQ_API_KEY=your_actual_groq_api_key

Replace the placeholder with your actual Groq API key.

You can generate an API key from:

https://console.groq.com/keys

IMPORTANT:

Never share your API key.

Never upload .env.local to GitHub.

The .env.example file is only a template.

---

## 6. Run Locally

### Step 1: Start the development server

Run:

npm run dev

This starts the Vercel development server.

### Step 2: Open the application

Open the local URL displayed in your terminal.

Usually:

http://localhost:3000

### Step 3: Test the chatbot

Enter a message such as:

Hello, how are you?

The chatbot should generate an AI response.

Try asking follow-up questions to test
conversation history.

---

## 7. Deployment Using Vercel

### Step 1: Push your project to GitHub

Initialize Git:

git init

Add project files:

git add .

Commit your changes:

git commit -m "Initial chatbot project"

Add your GitHub repository:

git remote add origin YOUR_GITHUB_REPOSITORY_URL

Push the code:

git branch -M main

git push -u origin main

### Step 2: Import the repository into Vercel

1. Sign in to Vercel.
2. Click Add New Project.
3. Import your GitHub repository.
4. Configure the project.
5. Deploy.

### Step 3: Add environment variables

Open your Vercel project.

Go to:

Settings → Environment Variables

Add:

Name:
GROQ_API_KEY

Value:
Your actual Groq API key.

Select the environments where the variable should be available.

Save the variable.

### Step 4: Redeploy

After adding the environment variable,
trigger a new deployment.

### Step 5: Test the live application

Open your Vercel deployment URL.

Send a message to the chatbot.

If everything is configured correctly,
the AI should respond.

---

## 8. How It Works

The application follows a simple architecture:

1. The user enters a message.
2. JavaScript reads the message.
3. JavaScript sends the conversation to /api/chat.
4. Node.js receives the request.
5. Node.js sends the conversation to Groq.
6. Groq generates an AI response.
7. Node.js returns the response.
8. JavaScript displays it on the webpage.

---

## 9. Learning Outcomes

By completing this project, students learn:

- HTML fundamentals
- CSS fundamentals
- JavaScript fundamentals
- DOM manipulation
- Event listeners
- Arrays and objects
- Async and await
- Fetch API
- JSON
- Node.js backend development
- API integration
- Environment variables
- Git and GitHub
- Vercel deployment

---

## 10. Future Improvements

Some features that can be added later:

- Dark mode
- Chat reset button
- Message timestamps
- Markdown response formatting
- Conversation export
- User authentication
- Persistent chat history

---

## 11. Author

My First AI Chatbot

Created as a beginner-friendly educational
project for learning AI integration and
full-stack web development.

---

## License

This project is available for educational
and learning purposes.
