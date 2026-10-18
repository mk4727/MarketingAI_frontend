import { useState, useRef, useEffect } from 'react';
import { Bot, Send, Sparkles, User } from 'lucide-react';
import { chatSuggestions } from '@/lib/mockData';
import { api } from '@/lib/api';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  time: string;
  followUps?: string[];
}

export function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init',
      role: 'assistant',
      content: "Hi! I'm your AI Marketing Assistant. I can analyze your Google Ads, Meta Ads, Shopify, GA4, and Merchant Center data. Ask me anything about your performance, or try one of the suggestions below.",
      time: 'now',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async (text?: string) => {
    const query = text || input.trim();
    if (!query || isTyping) return;

    const userMsg: Message = {
      id: `u${Date.now()}`,
      role: 'user',
      content: query,
      time: 'now',
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const data = await api.ai.chat(query);
      const aiMsg: Message = {
        id: String(data.id),
        role: 'assistant',
        content: data.content,
        time: 'now',
        followUps: data.followUps,
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      setMessages((prev) => [...prev, {
        id: `err${Date.now()}`,
        role: 'assistant',
        content: 'Sorry, I could not reach the server. Please try again.',
        time: 'now',
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="px-4 lg:px-6 py-4 border-b border-slate-200 bg-white">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 shadow-sm">
            <Bot className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900">AI Marketing Assistant</h1>
            <p className="text-xs text-slate-500 flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Analyzing 6 connected platforms in real-time
            </p>
          </div>
        </div>
      </div>

      {/* Chat area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 lg:px-6 py-6 space-y-4 bg-slate-50">
        {messages.map((msg) => (
          <div key={msg.id} className={cn('flex gap-3', msg.role === 'user' && 'flex-row-reverse')}>
            <div className={cn(
              'flex h-8 w-8 items-center justify-center rounded-lg shrink-0',
              msg.role === 'assistant' ? 'bg-gradient-to-br from-teal-500 to-teal-700' : 'bg-slate-200'
            )}>
              {msg.role === 'assistant' ? <Bot className="h-4 w-4 text-white" /> : <User className="h-4 w-4 text-slate-600" />}
            </div>
            <div className={cn(
              'max-w-[80%] rounded-2xl px-4 py-3',
              msg.role === 'assistant' ? 'bg-white border border-slate-200' : 'bg-teal-600'
            )}>
              <div className={cn(
                'text-sm leading-relaxed whitespace-pre-line',
                msg.role === 'assistant' ? 'text-slate-700' : 'text-white'
              )}>
                {msg.content}
              </div>
              {msg.role === 'assistant' && msg.followUps && (
                <div className="mt-4 border-t border-slate-100 pt-3">
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">Explore this insight</p>
                  <div className="flex flex-wrap gap-2">
                    {msg.followUps.map((followUp) => (
                      <button
                        key={followUp}
                        onClick={() => handleSend(followUp)}
                        className="rounded-lg border border-teal-200 bg-teal-50/70 px-3 py-1.5 text-xs font-medium text-teal-700 transition-colors hover:border-teal-300 hover:bg-teal-100"
                      >
                        {followUp}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-teal-500 to-teal-700 shrink-0">
              <Bot className="h-4 w-4 text-white" />
            </div>
            <div className="rounded-2xl bg-white border border-slate-200 px-4 py-3">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-teal-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="h-2 w-2 rounded-full bg-teal-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="h-2 w-2 rounded-full bg-teal-400 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Suggestions */}
      {messages.length <= 1 && (
        <div className="px-4 lg:px-6 pb-3 bg-slate-50">
          <div className="flex flex-wrap gap-2">
            {chatSuggestions.map((s) => (
              <button
                key={s}
                onClick={() => handleSend(s)}
                className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-2 text-xs font-medium text-slate-700 hover:border-teal-300 hover:bg-teal-50 hover:text-teal-700 transition-all"
              >
                <Sparkles className="h-3 w-3 text-teal-500" />
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="px-4 lg:px-6 py-4 border-t border-slate-200 bg-white/95 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about your marketing performance..."
            className="flex-1 rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-100 transition-all"
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isTyping}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-600 text-white transition-all hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
