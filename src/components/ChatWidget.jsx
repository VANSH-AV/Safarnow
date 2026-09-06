import { useCallback, useEffect, useRef, useState } from 'react';
import { useContent } from '../context/ContentContext';
import { askAI, buildAIContext } from '../lib/ai';
import { Bot, Send, Mic, Square, Volume2, VolumeX, X, Sparkles, MessageCircle } from 'lucide-react';

const QUICK_PROMPTS = [
  'Which destinations are available?',
  'Find hotels in Goa.',
  'Packages under ₹20,000.',
  'Which package is best for a family?',
];

export default function ChatWidget() {
  const { destinations, packages, hotels } = useContent();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const messagesRef = useRef([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [error, setError] = useState(null);
  const [listening, setListening] = useState(false);
  const [speakingId, setSpeakingId] = useState(null);
  const recognitionRef = useRef(null);
  const scrollRef = useRef(null);

  const setMessagesAll = useCallback((next) => {
    messagesRef.current = next;
    setMessages(next);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }, [messages, typing, open]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    return () => {
      window.speechSynthesis?.cancel();
      recognitionRef.current?.abort();
    };
  }, []);

  const send = async (raw) => {
    const text = (raw ?? input).trim();
    if (!text || typing) return;

    const history = [...messagesRef.current, { role: 'user', content: text }].slice(-16);
    setMessagesAll(history);
    setInput('');
    setError(null);
    setTyping(true);

    try {
      const dataContext = await buildAIContext({ destinations, packages, hotels });
      const reply = await askAI({ messages: history, dataContext });
      setMessagesAll([...history, { role: 'assistant', content: reply }]);
    } catch (err) {
      setError(err?.message || 'Something went wrong. Please try again.');
    } finally {
      setTyping(false);
    }
  };

  const toggleMic = () => {
    if (listening) {
      recognitionRef.current?.abort();
      setListening(false);
      return;
    }
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      setError('Voice input is not supported in this browser. Try Chrome or Edge.');
      return;
    }
    const rec = new SR();
    rec.lang = 'en-IN';
    rec.interimResults = false;
    rec.maxAlternatives = 1;
    rec.onresult = (ev) => {
      const transcript = ev.results?.[0]?.[0]?.transcript || '';
      setInput((prev) => (prev ? `${prev} ${transcript}` : transcript));
    };
    rec.onerror = (ev) => {
      setListening(false);
      if (ev.error === 'not-allowed' || ev.error === 'service-not-allowed') {
        setError('Microphone access was denied. Allow it in your browser settings and try again.');
      } else if (ev.error !== 'aborted') {
        setError('Could not hear you. Please try again.');
      }
    };
    rec.onend = () => setListening(false);
    recognitionRef.current = rec;
    setListening(true);
    setError(null);
    rec.start();
  };

  const toggleSpeak = (id, text) => {
    if (speakingId === id) {
      window.speechSynthesis?.cancel();
      setSpeakingId(null);
      return;
    }
    if (!('speechSynthesis' in window)) {
      setError('Text-to-speech is not supported in this browser.');
      return;
    }
    const clean = String(text).replace(/[*_#`>]/g, '');
    const utter = new SpeechSynthesisUtterance(clean);
    utter.lang = 'en-IN';
    utter.rate = 1.05;
    utter.pitch = 1;
    utter.onend = () => setSpeakingId(null);
    utter.onerror = () => setSpeakingId(null);
    window.speechSynthesis.cancel();
    setSpeakingId(id);
    window.speechSynthesis.speak(utter);
  };

  const renderTyping = () => (
    <div className="flex gap-2.5 max-w-[85%]">
      <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm flex items-center gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-blue animate-bounce" />
        <span className="w-1.5 h-1.5 rounded-full bg-blue animate-bounce [animation-delay:120ms]" />
        <span className="w-1.5 h-1.5 rounded-full bg-blue animate-bounce [animation-delay:240ms]" />
      </div>
    </div>
  );

  return (
    <div className="fixed bottom-5 right-5 z-[80] flex flex-col items-end gap-3">
      {open && (
        <div
          role="dialog"
          aria-label="Safarnow AI travel assistant"
          className="flex flex-col w-[min(92vw,380px)] h-[min(72vh,560px)] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
        >
          <div className="bg-gradient-to-br from-navy via-navy to-blue px-4 py-3.5 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-sky/20 flex items-center justify-center">
              <Bot className="w-5 h-5 text-sky" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold leading-tight">Safarnow AI</p>
              <p className="text-white/60 text-xs truncate">Gemini-powered travel assistant</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-light/60">
            {messages.length === 0 && !typing && (
              <div className="text-center py-4 space-y-4">
                <div>
                  <p className="text-sm font-semibold text-dark mb-1">Hi, I'm Safarnow AI 👋</p>
                  <p className="text-xs text-muted">
                    Ask me about destinations, hotels, packages or plan a trip using your real Safarnow data.
                  </p>
                </div>
                <div className="space-y-2">
                  {QUICK_PROMPTS.map((q) => (
                    <button
                      key={q}
                      onClick={() => send(q)}
                      className="w-full text-left text-xs bg-white border border-gray-200 hover:border-blue hover:text-blue rounded-xl px-3 py-2.5 transition-all"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div role="log" aria-live="polite" className="space-y-3">
              {messages.map((m, i) => {
                if (m.role === 'user') {
                  return (
                    <div key={i} className="flex justify-end">
                      <div className="max-w-[85%] bg-blue text-white rounded-2xl rounded-br-md px-4 py-2.5 text-sm shadow-sm whitespace-pre-wrap">
                        {m.content}
                      </div>
                    </div>
                  );
                }
                return (
                  <div key={i} className="flex gap-2.5 max-w-[85%]">
                    <div className="shrink-0 w-7 h-7 rounded-full bg-sky/15 flex items-center justify-center mt-1">
                      <Bot className="w-4 h-4 text-blue" />
                    </div>
                    <div className="group">
                      <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-md px-4 py-2.5 text-sm text-dark shadow-sm whitespace-pre-wrap">
                        {m.content}
                      </div>
                      <button
                        onClick={() => toggleSpeak(i, m.content)}
                        aria-label={speakingId === i ? 'Stop speaking' : 'Read response aloud'}
                        className="mt-1 inline-flex items-center gap-1 text-[11px] text-muted hover:text-blue transition-colors"
                      >
                        {speakingId === i ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                        {speakingId === i ? 'Stop' : 'Read aloud'}
                      </button>
                    </div>
                  </div>
                );
              })}
              {typing && renderTyping()}
            </div>

            {error && (
              <div className="bg-amber-50 border border-amber-200 text-amber-800 text-xs rounded-xl px-3 py-2.5 flex items-start gap-2">
                <span className="mt-0.5">⚠️</span>
                <span>{error}</span>
              </div>
            )}
          </div>

          <div className="border-t border-gray-100 bg-white p-3">
            <div className="flex items-end gap-2">
              <button
                onClick={toggleMic}
                aria-label={listening ? 'Stop voice input' : 'Start voice input'}
                className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                  listening ? 'bg-danger text-white animate-pulse' : 'bg-light text-navy hover:bg-blue/10'
                }`}
              >
                {listening ? <Square className="w-4 h-4" /> : <Mic className="w-5 h-5" />}
              </button>
              <textarea
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    send();
                  }
                }}
                placeholder={listening ? 'Listening…' : 'Ask about destinations, hotels or packages…'}
                aria-label="Your message"
                className="flex-1 resize-none bg-light border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue/30 focus:border-blue transition-all max-h-28"
              />
              <button
                onClick={() => send()}
                disabled={typing || !input.trim()}
                aria-label="Send message"
                className="shrink-0 w-10 h-10 rounded-xl bg-blue text-white flex items-center justify-center hover:bg-blue/90 disabled:opacity-40 transition-all"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[10px] text-muted mt-1.5 ml-1">
              <Sparkles className="w-3 h-3 inline-block mr-0.5" /> Powered by Gemini
            </p>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close Safarnow AI assistant' : 'Open Safarnow AI assistant'}
        className={`relative w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all ${
          open ? 'bg-navy' : 'bg-gradient-to-br from-blue to-sky hover:scale-105'
        }`}
      >
        {open ? <X className="w-6 h-6 text-white" /> : <MessageCircle className="w-6 h-6 text-white" />}
        {!open && (
          <span className="absolute inset-0 rounded-full animate-ping bg-blue/30 -z-10" />
        )}
      </button>
    </div>
  );
}