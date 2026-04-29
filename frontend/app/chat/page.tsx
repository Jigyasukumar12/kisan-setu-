"use client";
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, Send, Phone, MoreVertical, Image as ImageIcon, CheckCheck, Loader2, Bot, User, Mic } from 'lucide-react';

export default function ChatScreen() {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'ai', text: 'नमस्ते किसान भाई! मैं किसान सेतु का एआई सहायक हूँ। मैं आपकी क्या मदद कर सकता हूँ?', time: '10:00 AM' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMessage = { id: Date.now(), sender: 'me', text: input, time: now };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const history = messages.map(m => ({
        role: m.sender === 'me' ? 'user' : 'assistant',
        content: m.text
      }));

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${apiUrl}/ai/chatbot`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input, history }),
      });
      const json = await res.json();

      if (json.success) {
        setMessages((prev) => [
          ...prev,
          { id: Date.now() + 1, sender: 'ai', text: json.data.reply, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
        ]);
      }
    } catch (error) {
      console.error('Chat error:', error);
    }
    setLoading(false);
  };

  return (
    <div className="flex h-screen flex-col bg-slate-50 relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute top-[-20%] left-[-20%] w-[150%] h-[150%] bg-gradient-to-br from-brand-50 via-white to-brand-100 opacity-50 z-0"></div>

      {/* Header */}
      <header className="glass sticky top-0 z-40 px-6 pt-10 pb-6 border-b border-slate-200/50 flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-4">
          <Link href="/dashboard" className="w-10 h-10 glass rounded-2xl flex items-center justify-center text-slate-600 border border-white/50 active:scale-90 transition-transform">
            <ChevronLeft size={20} strokeWidth={3} />
          </Link>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-12 h-12 btn-premium rounded-2xl flex items-center justify-center text-white border-2 border-white shadow-lg animate-float">
                <Bot size={24} />
              </div>
              <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white bg-brand-500 shadow-sm"></div>
            </div>
            <div className="space-y-0.5">
              <h2 className="font-black text-slate-900 tracking-tight leading-none">KisanSetu AI</h2>
              <p className="text-[10px] font-black text-brand-700 uppercase tracking-[0.2em] animate-pulse">सहयोगी ऑनलाइन</p>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button className="w-10 h-10 glass rounded-2xl flex items-center justify-center text-slate-500 border border-white/50"><Phone size={18} /></button>
          <button className="w-10 h-10 glass rounded-2xl flex items-center justify-center text-slate-500 border border-white/50"><MoreVertical size={18} /></button>
        </div>
      </header>

      {/* Messages Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 pb-40 z-10 scrollbar-hide"
      >
        <div className="flex justify-center mb-8">
          <span className="glass px-6 py-2 rounded-2xl text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] shadow-sm border border-white/50">
            आज का संवाद
          </span>
        </div>
        
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}>
            <div className={`flex items-end space-x-2 max-w-[85%] ${msg.sender === 'me' ? 'flex-row-reverse space-x-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-sm border-2 border-white ${
                msg.sender === 'me' ? 'bg-slate-200 text-slate-500' : 'btn-premium text-white'
              }`}>
                {msg.sender === 'me' ? <User size={16} /> : <Bot size={16} />}
              </div>
              <div className={`relative px-5 py-4 shadow-xl shadow-slate-200/20 ${
                msg.sender === 'me' 
                ? 'btn-premium text-white rounded-[24px] rounded-br-none' 
                : 'glass bg-white text-slate-800 rounded-[24px] rounded-bl-none border border-white/50'
              }`}>
                <p className="text-[14px] font-bold leading-relaxed mb-2">{msg.text}</p>
                <div className={`flex items-center justify-end space-x-1.5 opacity-60`}>
                  <span className="text-[9px] font-black uppercase tracking-tighter">{msg.time}</span>
                  {msg.sender === 'me' && <CheckCheck size={12} strokeWidth={3} className="text-white/80" />}
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {loading && (
          <div className="flex justify-start animate-in fade-in duration-300">
             <div className="flex items-end space-x-2">
                <div className="w-8 h-8 btn-premium text-white rounded-xl flex items-center justify-center animate-bounce">
                  <Bot size={16} />
                </div>
                <div className="glass bg-white px-5 py-3 rounded-[24px] rounded-bl-none shadow-md border border-white/50 flex items-center space-x-3">
                  <div className="flex space-x-1">
                    <div className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                  </div>
                  <span className="text-[10px] font-black text-brand-700 uppercase tracking-widest">AI टाइप कर रहा है</span>
                </div>
             </div>
          </div>
        )}
      </div>

      {/* Input Box Area */}
      <div className="fixed bottom-0 left-0 right-0 w-full p-6 z-40 bg-gradient-to-t from-slate-50 via-slate-50/80 to-transparent">
        <div className="max-w-3xl mx-auto">
          <div className="glass shadow-2xl shadow-slate-400/20 rounded-[32px] p-2 border border-white/50 bg-white/70">
            <form 
              onSubmit={(e) => { e.preventDefault(); sendMessage(); }} 
              className="flex items-center"
            >
              <button type="button" className="w-12 h-12 flex items-center justify-center text-slate-400 hover:text-brand-600 transition-all active:scale-90">
                <ImageIcon size={22} strokeWidth={2.5} />
              </button>
              <div className="flex-1 px-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="अपना सवाल यहाँ लिखें..."
                  className="w-full bg-transparent border-none py-3 px-1 text-sm font-black text-slate-800 placeholder:text-slate-300 focus:ring-0"
                  disabled={loading}
                />
              </div>
              {input.trim() ? (
                <button 
                  type="submit" 
                  disabled={loading}
                  className="btn-premium h-12 w-12 flex items-center justify-center rounded-2xl text-white shadow-lg shadow-brand-900/20 active:scale-90 transition-all"
                >
                  <Send size={18} strokeWidth={3} />
                </button>
              ) : (
                <button type="button" className="h-12 w-12 flex items-center justify-center rounded-2xl bg-slate-100 text-slate-400 transition-all active:scale-90">
                  <Mic size={18} strokeWidth={3} />
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
