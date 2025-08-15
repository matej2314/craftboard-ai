'use client';

import { useState, useRef, useEffect, type KeyboardEvent } from 'react';
import Card from 'components/dashboard/shared/card/index';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

type Mode =
  | 'general'
  | 'copywriter'
  | 'seo'
  | 'social'
  | 'marketing'
  | 'sales'
  | 'customer-service'
  | 'technical-support';
const modes: Mode[] = [
  'general',
  'copywriter',
  'seo',
  'social',
  'marketing',
  'sales',
  'customer-service',
  'technical-support',
];

export default function AiManagerPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I am your AI assistant. How can I help you today?',
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [mode, setMode] = useState<Mode>('general');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: `Thank you for your message: "${inputValue}". This is a simulated AI response. In a real application, this would be a real response from the AI model.`,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pl-PL', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="flex h-full flex-col justify-center gap-5 lg:gap-5">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-5">
          <h1 className="flex justify-center text-2xl text-brand-800 dark:text-white">
            AI assistant
          </h1>
        </div>

        <Card extra="w-full max-w-4xl mx-auto h-[600px] flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 p-4 dark:border-white/10">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  AI assistant
                </h3>
                <div className="flex w-full flex-col items-center gap-2">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {mode}
                  </p>
                  <button
                    className="h-full w-full text-sm text-gray-700 dark:text-gray-400"
                    onClick={() =>
                      setMode(modes[Math.floor(Math.random() * modes.length)])
                    }
                  >
                    Switch mode
                  </button>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Active
              </span>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-4 overflow-y-auto p-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.isUser ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                    message.isUser
                      ? 'rounded-br-md bg-blue-500 text-white'
                      : 'rounded-bl-md bg-gray-100 text-gray-900 dark:bg-navy-700 dark:text-white'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <p
                    className={`mt-1 text-xs ${
                      message.isUser
                        ? 'text-blue-100'
                        : 'text-gray-500 dark:text-gray-400'
                    }`}
                  >
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-bl-md bg-gray-100 px-4 py-3 text-gray-900 dark:bg-navy-700 dark:text-white">
                  <div className="flex items-center gap-2">
                    <div className="flex space-x-1">
                      <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400"></div>
                      <div
                        className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                        style={{ animationDelay: '0.1s' }}
                      ></div>
                      <div
                        className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                        style={{ animationDelay: '0.2s' }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Pisze...
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-gray-200 p-4 dark:border-white/10">
            <div className="flex items-end gap-3">
              <div className="flex-1">
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Napisz wiadomość..."
                  className="w-full resize-none rounded-xl border border-gray-200 bg-white/0 p-3 text-sm outline-none placeholder:text-gray-500 focus:border-blue-500 dark:border-white/10 dark:bg-navy-800 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-400"
                  rows={1}
                  style={{ minHeight: '44px', maxHeight: '120px' }}
                />
              </div>
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500 transition-colors duration-200 hover:bg-blue-600 disabled:bg-gray-300 dark:disabled:bg-gray-600"
              >
                <svg
                  className="h-5 w-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </div>

            <div className="mt-2 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>
                Naciśnij Enter aby wysłać, Shift+Enter dla nowej linii
              </span>
              <span>{inputValue.length}/1000</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
