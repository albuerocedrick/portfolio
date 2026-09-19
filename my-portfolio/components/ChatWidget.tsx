'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { toast } from 'react-hot-toast';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  isStreaming?: boolean;
  timestamp?: number;
};

const welcomeMessage: Message = {
  id: 'welcome',
  role: 'assistant',
  content: "Hi! I'm an AI assistant that knows all about Cedrick Albuero's background, projects, and skills. Ask me anything!",
  isStreaming: false,
  timestamp: Date.now(),
};



const suggestionChips = [
  "Tell me about Cedrick",
  "What projects has he built?",
  "How can I contact him?",
  "What's his tech stack?",
];

const bubbleVariants: Variants = {
  hidden: { opacity: 0, y: 10, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', damping: 20, stiffness: 300 } },
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([welcomeMessage]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const streamIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setIsMounted(true);
    return () => {
      if (streamIntervalRef.current) {
        clearInterval(streamIntervalRef.current);
      }
    };
  }, []);

  // Auto-scroll on new messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Autofocus input when drawer opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
      setUnreadCount(0);
    }
  }, [isOpen]);

  const sendMessage = useCallback(async (text: string) => {
    if (text.trim() === '' || isLoading) return;

    setInput('');
    const newMessages = [
      ...messages,
      { id: uuidv4(), role: 'user', content: text.trim(), timestamp: Date.now() } as Message,
    ];
    setMessages(newMessages);
    setIsLoading(true);

    const assistantId = uuidv4();

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      setIsLoading(false);

      if (!res.ok) {
        if (res.status === 429) {
          toast.error("You're sending messages too fast. Please wait a minute.");
        } else {
          toast.error("Something went wrong. Please try again.");
        }
        return;
      }

      setMessages((prev) => [
        ...prev,
        { id: assistantId, role: 'assistant', content: '', isStreaming: true, timestamp: Date.now() },
      ]);

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const lines = decoder.decode(value).split('\n').filter(l => l.startsWith('data: '));
          for (const line of lines) {
            const data = line.replace('data: ', '');
            if (data === '[DONE]') break;
            try {
              const { delta } = JSON.parse(data);
              setMessages((prev) => prev.map((m) =>
                m.id === assistantId ? { ...m, content: m.content + delta } : m
              ));
            } catch (e) {
              console.error("Failed to parse stream chunk", data);
            }
          }
        }
      }
    } catch (error) {
      setIsLoading(false);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setMessages((prev) => prev.map((m) =>
        m.id === assistantId ? { ...m, isStreaming: false } : m
      ));
      if (!isOpen) {
        setUnreadCount((c) => c + 1);
      }
    }
  }, [isLoading, isOpen, messages]);

  if (!isMounted) return null;

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat-drawer"
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-[88px] right-6 z-50 flex flex-col h-[600px] max-h-[calc(100vh-120px)] w-[calc(100vw-3rem)] sm:w-96 rounded-2xl border border-white/8 bg-surface shadow-lg overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-white/5 px-4 py-3 shrink-0">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent">
                <Sparkles className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-heading text-sm font-semibold text-text leading-tight">AI Assistant</p>
                <p className="text-xs text-muted leading-tight">Ask me about Cedrick</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center rounded-full p-2 text-muted transition-colors hover:bg-white/5 hover:text-text focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                aria-label="Close chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Message Area */}
            <div className="flex flex-1 flex-col gap-3 overflow-y-auto p-4 scroll-smooth">
              {messages.map((message) => {
                const isUser = message.role === 'user';
                return (
                  <motion.div
                    key={message.id}
                    variants={bubbleVariants}
                    initial="hidden"
                    animate="visible"
                    className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[82%] px-4 py-3 text-sm break-words leading-relaxed ${
                        isUser
                          ? 'rounded-2xl rounded-br-sm bg-accent text-white'
                          : 'rounded-2xl rounded-bl-sm border border-white/10 bg-bg text-text'
                      }`}
                    >
                      {message.content || (message.isStreaming ? '' : '')}
                      {message.isStreaming && !isUser && (
                        <motion.span
                          animate={{ opacity: [1, 0] }}
                          transition={{ repeat: Infinity, duration: 0.7, ease: 'linear' }}
                          className="inline-block ml-0.5 text-accent"
                        >
                          ▋
                        </motion.span>
                      )}
                    </div>
                    {message.timestamp && !message.isStreaming && (
                      <span className="mt-1 text-[10px] text-muted/60 px-1">
                        {new Date(message.timestamp).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    )}
                  </motion.div>
                );
              })}

              {/* Typing Indicator */}
              <AnimatePresence>
                {isLoading && (
                  <motion.div
                    key="typing"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="flex flex-col items-start"
                  >
                    <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-sm border border-white/10 bg-bg px-4 py-3.5">
                      {[0, 0.15, 0.3].map((delay, i) => (
                        <motion.span
                          key={i}
                          animate={{ y: [0, -5, 0] }}
                          transition={{ repeat: Infinity, duration: 0.7, delay }}
                          className="h-1.5 w-1.5 rounded-full bg-muted"
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div ref={messagesEndRef} />
            </div>

            {/* Suggestion Chips — only shown when only welcome message visible */}
            {messages.length === 1 && !isLoading && (
              <div className="flex flex-wrap gap-2 px-4 pb-3 shrink-0">
                {suggestionChips.map((chip) => (
                  <button
                    key={chip}
                    onClick={() => sendMessage(chip)}
                    className="rounded-full border border-white/10 bg-bg px-3 py-1.5 text-xs text-muted transition-colors hover:border-accent/40 hover:text-text focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            )}

            {/* Input Row */}
            <div className="border-t border-white/5 p-3 shrink-0">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage(input);
                    }
                  }}
                  disabled={isLoading}
                  placeholder="Ask me anything..."
                  className="w-full flex-1 rounded-xl border border-white/10 bg-bg px-4 py-2.5 text-sm text-text placeholder-muted transition-colors focus:border-accent/50 focus:outline-none focus-visible:ring-1 focus-visible:ring-accent disabled:opacity-50"
                />
                <motion.button
                  whileTap={{ scale: 0.93 }}
                  disabled={!input.trim() || isLoading}
                  onClick={() => sendMessage(input)}
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                    input.trim() && !isLoading
                      ? 'bg-accent text-white hover:bg-accent/90'
                      : 'bg-white/5 text-muted cursor-not-allowed'
                  }`}
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className={`fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg ${
          !isOpen ? 'animate-pulse-ring' : ''
        }`}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X className="h-6 w-6" />
            </motion.span>
          ) : (
            <motion.span key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <MessageCircle className="h-6 w-6" />
            </motion.span>
          )}
        </AnimatePresence>

        {/* Unread badge */}
        <AnimatePresence>
          {!isOpen && unreadCount > 0 && (
            <motion.span
              key="badge"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white"
            >
              {unreadCount}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}
