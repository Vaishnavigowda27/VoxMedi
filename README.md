# 🩺 AI Medical Voice Agent

An intelligent voice-powered medical assistant built to assist doctors and patients through conversational AI.

## 🚀 Features

- 🎤 Voice-enabled communication using Vapi
- 👨‍⚕ Multiple voice profiles for different doctors
- 💬 Natural, real-time conversations
- 🌐 Built with Next.js and integrated APIs
- 🔒 Secure and scalable architecture

## 🛠 Tech Stack

- *Frontend:* Next.js, React, Tailwind CSS
- *Voice API:* [Vapi](https://www.vapi.ai/)
- *Backend (Optional):* Node.js / Express (if used)

## 🧠 How It Works

1. User speaks a query (e.g., symptoms, medication)
2. Vapi processes the voice and converts it to text
3. AI backend generates a response
4. Voice response is sent back to the user
5. Switch between different doctor voices for specialized conversations

## 📁 Project Structure
/ai-medical-voice-agent
├── pages/ # Next.js routes
├── components/ # Reusable React components
├── public/ # Static assets (fallback images, etc.)
├── styles/ # Tailwind/global CSS
└── vapi/ # Vapi config & logic
