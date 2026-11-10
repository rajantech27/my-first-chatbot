
// =====================================
// 1. GET HTML ELEMENTS
// =====================================

// Find the required elements on our webpage.

const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");
const chatMessages = document.getElementById("chat-messages");


// =====================================
// 2. CONVERSATION HISTORY
// =====================================

// This array stores the messages exchanged
// between the user and the AI during this session.

let conversationHistory = [];


// =====================================
// 3. DISPLAY A MESSAGE
// =====================================

// This function creates a message bubble
// and displays it inside the chatbot.

function displayMessage(text, sender) {

    const messageElement = document.createElement("div");

    messageElement.classList.add("message");

    if (sender === "user") {
        messageElement.classList.add("user-message");
    } else {
        messageElement.classList.add("ai-message");
    }

    // textContent displays text safely
    // without interpreting it as HTML.

    messageElement.textContent = text;

    chatMessages.appendChild(messageElement);

    scrollToLatestMessage();
}


// =====================================
// 4. AUTOMATIC SCROLLING
// =====================================

// Scrolls the chat area to the latest message.

function scrollToLatestMessage() {

    chatMessages.scrollTop = chatMessages.scrollHeight;
}


// =====================================
// 5. SHOW TYPING INDICATOR
// =====================================

// Displays animated dots while the AI is thinking.

function showTypingIndicator() {

    const typingElement = document.createElement("div");

    typingElement.id = "typing-indicator";

    typingElement.classList.add("typing-indicator");

    typingElement.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;

    chatMessages.appendChild(typingElement);

    scrollToLatestMessage();
}


// =====================================
// 6. REMOVE TYPING INDICATOR
// =====================================

// Removes the animated dots when the AI responds.

function removeTypingIndicator() {

    const typingElement = document.getElementById("typing-indicator");

    if (typingElement) {
        typingElement.remove();
    }
}


// =====================================
// 7. DISPLAY ERROR MESSAGE
// =====================================

// Displays an error if something goes wrong.

function displayError(message) {

    const errorElement = document.createElement("div");

    errorElement.classList.add("error-message");

    errorElement.textContent = message;

    chatMessages.appendChild(errorElement);

    scrollToLatestMessage();
}


// =====================================
// 8. SEND MESSAGE TO BACKEND
// =====================================

// This function sends the conversation
// to our Node.js backend.

async function sendMessage() {

    const userMessage = messageInput.value.trim();

    // Prevent empty messages.

    if (!userMessage) {
        return;
    }

    // Prevent messages while another request is running.

    if (sendButton.disabled) {
        return;
    }

    // Display the user's message.

    displayMessage(userMessage, "user");

    // Clear the input field.

    messageInput.value = "";

    // Add the user message to conversation history.

    conversationHistory.push({
        role: "user",
        content: userMessage
    });

    // Disable sending while AI is responding.

    sendButton.disabled = true;
    messageInput.disabled = true;

    // Show typing animation.

    showTypingIndicator();

    try {

        // Send the conversation to our backend.

        const response = await fetch("/api/chat", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                messages: conversationHistory
            })

        });


        // Convert the server response into JavaScript data.

        const data = await response.json();


        // Check whether the backend returned an error.

        if (!response.ok) {
            throw new Error(
                data.error || "Something went wrong."
            );
        }


        // Check whether the AI returned a valid response.

        if (typeof data.reply !== "string" || !data.reply.trim()) {
            throw new Error("The AI returned an invalid response.");
        }


        // Store the AI response in conversation history.

        conversationHistory.push({
            role: "assistant",
            content: data.reply
        });


        // Display the AI response.

        displayMessage(data.reply, "ai");


    } catch (error) {

        console.error("Chat error:", error);

        // Remove the failed user message from history
        // so it is not sent again as a successful exchange.

        conversationHistory.pop();

        displayError(
            error.message || "Unable to connect to the AI. Please try again."
        );

    } finally {

        // Always remove the typing animation.

        removeTypingIndicator();

        // Enable the input and send button again.

        sendButton.disabled = false;
        messageInput.disabled = false;

        // Return focus to the input field.

        messageInput.focus();
    }
}


// =====================================
// 9. SEND BUTTON EVENT
// =====================================

// Runs sendMessage() when the user clicks Send.

// =====================================
// 9. FORM SUBMISSION
// =====================================

const chatForm = document.getElementById("chat-form");

chatForm.addEventListener("submit", function(event) {

    event.preventDefault();

    sendMessage();

});