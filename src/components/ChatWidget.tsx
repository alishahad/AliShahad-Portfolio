import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, Loader2, Minimize2, Maximize2, Trash2, ThumbsUp, ThumbsDown } from 'lucide-react';
import { INITIAL_CHAT_MESSAGE } from '../constants';
import { ChatMessage } from '../types';
import { sendMessageToGeminiStream } from '../services/geminiService';
import { GenerateContentResponse } from '@google/genai';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('chat_history');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [{ id: 'init', role: 'model', text: INITIAL_CHAT_MESSAGE }];
      }
    }
    return [{ id: 'init', role: 'model', text: INITIAL_CHAT_MESSAGE }];
  });
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    localStorage.setItem('chat_history', JSON.stringify(messages.filter(m => !m.isStreaming)));
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, messages]);

  const clearHistory = () => {
    setMessages([{ id: 'init', role: 'model', text: INITIAL_CHAT_MESSAGE }]);
    localStorage.removeItem('chat_history');
  };

  const handleFeedback = (id: string, feedback: 'up' | 'down') => {
    setMessages(prev => prev.map(msg => 
      msg.id === id ? { ...msg, feedback } : msg
    ));
    // In a real app, you would send this feedback to a backend here
    console.log(`Feedback submitted for message ${id}: ${feedback}`);
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputText.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: inputText.trim()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    // Create a placeholder for the model response
    const modelMessageId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, {
      id: modelMessageId,
      role: 'model',
      text: '',
      isStreaming: true
    }]);

    try {
      const streamResult = await sendMessageToGeminiStream(userMessage.text);
      
      let fullText = '';
      for await (const chunk of streamResult) {
        const c = chunk as GenerateContentResponse;
        const chunkText = c.text || '';
        fullText += chunkText;
        
        setMessages(prev => prev.map(msg => 
          msg.id === modelMessageId 
            ? { ...msg, text: fullText } 
            : msg
        ));
      }
      
      setMessages(prev => prev.map(msg => 
        msg.id === modelMessageId 
          ? { ...msg, isStreaming: false } 
          : msg
      ));

    } catch (error) {
      console.error("Error communicating with Gemini:", error);
      setMessages(prev => prev.map(msg => 
        msg.id === modelMessageId 
          ? { ...msg, text: "I'm having trouble connecting right now. Please try again later.", isStreaming: false } 
          : msg
      ));
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-4 bg-indigo-600 text-white rounded-full shadow-xl hover:bg-indigo-700 hover:scale-105 transition-all duration-300 group"
      >
        <span className="relative">
          <Sparkles size={20} className="animate-pulse" />
        </span>
        <span className="font-semibold">Chat with my Resume</span>
      </button>
    );
  }

  return (
    <div 
      className={`fixed z-50 transition-all duration-300 shadow-2xl bg-white flex flex-col animate-in slide-in-from-bottom-8 fade-in
        ${isExpanded 
          ? 'inset-0 md:inset-auto md:bottom-6 md:right-6 md:w-[600px] md:h-[80vh] md:rounded-2xl' 
          : 'bottom-0 right-0 w-full h-[100dvh] md:bottom-6 md:right-6 md:w-[380px] md:h-[600px] md:rounded-2xl'
        }
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-indigo-600 text-white md:rounded-t-2xl shrink-0">
        <div className="flex items-center gap-2">
          <div className="bg-white/20 p-2 rounded-lg">
            <MessageSquare size={18} />
          </div>
          <div>
            <h3 className="font-semibold text-sm">Resume Assistant</h3>
            <div className="flex items-center gap-1.5 opacity-80">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-xs">Powered by Gemini</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button 
            onClick={clearHistory}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
            title="Clear Chat"
          >
            <Trash2 size={16} />
          </button>
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 hover:bg-white/20 rounded-full transition-colors hidden md:block"
            title={isExpanded ? "Minimize" : "Maximize"}
          >
            {isExpanded ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          </button>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 scrollbar-hide">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 fade-in duration-300`}
          >
            <div 
              className={`
                max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed
                ${msg.role === 'user' 
                  ? 'bg-indigo-600 text-white rounded-br-none' 
                  : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none shadow-sm'
                }
              `}
            >
              {msg.role === 'model' && msg.text === '' && msg.isStreaming ? (
                <div className="flex gap-1 items-center h-5 px-1">
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
              ) : (
                <div className="whitespace-pre-wrap">{msg.text}</div>
              )}
              {msg.role === 'model' && !msg.isStreaming && msg.id !== 'init' && (
                <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-100">
                  <button 
                    onClick={() => handleFeedback(msg.id, 'up')}
                    className={`p-1 rounded hover:bg-slate-100 transition-colors ${msg.feedback === 'up' ? 'text-green-600' : 'text-slate-400'}`}
                    title="Helpful"
                  >
                    <ThumbsUp size={14} />
                  </button>
                  <button 
                    onClick={() => handleFeedback(msg.id, 'down')}
                    className={`p-1 rounded hover:bg-slate-100 transition-colors ${msg.feedback === 'down' ? 'text-red-600' : 'text-slate-400'}`}
                    title="Not helpful"
                  >
                    <ThumbsDown size={14} />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-slate-100 md:rounded-b-2xl shrink-0">
        <div className="relative flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask about my experience..."
            className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-full focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-sm"
            disabled={isLoading}
          />
          <button 
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className="absolute right-1.5 top-1.5 p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
          </button>
        </div>
        <div className="text-center mt-2">
          <p className="text-[10px] text-slate-400">AI can make mistakes. Please verify important information.</p>
        </div>
      </form>
    </div>
  );
};

export default ChatWidget;
