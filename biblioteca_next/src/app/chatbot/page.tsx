"use client";
import { useChat } from "../../Hooks/useChat";
import { useState } from "react";

export default function ChatbotPage() {
  const { messages, sendMessage } = useChat();
  const [input, setInput] = useState("");

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold">Chat with AI</h1>
      <section className="h-80 overflow-y-auto bg-gray-100 p-4 rounded-md">
        {messages.map((msg, index) => (
          <p key={index} className={msg.role === "user" ? "text-right" : "text-left"}>
            <strong>{msg.role}:</strong> {msg.content}
          </p>
        ))}
      </section>
      <input
        className="w-full p-2 border rounded-md mt-4"
        placeholder="Ask something..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        className="w-full mt-2 p-2 bg-blue-500 text-white rounded-md"
        onClick={() => {
          sendMessage(input);
          setInput("");
        }}
      >
        Send
      </button>
    </main>
  );
}
