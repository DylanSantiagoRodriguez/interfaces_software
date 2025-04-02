'use client'; 

import { useState, useRef, useEffect } from 'react';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{role: string, content: string}>>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLElement>(null);

  const toggleChat = () => setIsOpen(!isOpen);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simulamos una respuesta automática del asistente
    const assistantMessage = {
      role: 'assistant',
      content: 'Lo siento, hubo un error al procesar tu mensaje.'
    };
    setMessages(prev => [...prev, assistantMessage]);
  };

  return (
    <section className="fixed bottom-6 right-6 z-50">
      <button
        onClick={toggleChat}
        className="bg-[#42af92] hover:bg-[#42af92] text-white rounded-full p-4 shadow-lg transition-all duration-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
      </button>

      {isOpen && (
        <section className="absolute bottom-16 right-0 w-80 h-96 bg-white rounded-lg shadow-xl flex flex-col border border-gray-200">
          <section className="bg-[#42af92] text-white p-3 rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold">Bookie AI</h3>
            <button onClick={toggleChat} className="text-white hover:text-gray-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </section>

          <section className="flex-1 p-4 overflow-y-auto">
            {messages.length === 0 ? (
              <section className="text-center text-gray-500 mt-10">
                ¡Hola! ¿En qué puedo ayudarte hoy?
              </section>
            ) : (
              messages.map((msg, index) => (
                <section
                  key={index}
                  className={`mb-3 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}
                >
                  <section
                    className={`inline-block px-4 py-2 rounded-lg ${msg.role === 'user' ? 'bg-[#42af92] text-white' : 'bg-gray-200 text-gray-800'}`}
                  >
                    {msg.content}
                  </section>
                </section>
              ))
            )}
            <section ref={messagesEndRef} />
          </section>

          <section className="p-3 border-t border-gray-200">
            <section className="flex">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Escribe tu mensaje..."
                className="flex-1 px-4 py-2 border border-border-[#42af92] rounded-l-lg focus:outline-none focus:ring-2 focus:ring-border -[#42af92]"
              />
              <button
                onClick={handleSendMessage}
                className="bg-[#42af92] hover:bg-[#42af92] text-white px-4 py-2 rounded-r-lg"
              >
                Send
              </button>
            </section>
          </section>
        </section>
      )}
    </section>
  );
}
