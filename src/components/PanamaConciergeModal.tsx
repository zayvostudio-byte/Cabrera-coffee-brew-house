import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, MessageSquare, Send, X, Clock, MapPin, ExternalLink, Globe, Coffee, ChevronRight, HelpCircle } from 'lucide-react';
import { Language } from '../i18n/translations';
import { usePanamaTime } from '../utils/panamaTime';

interface PanamaConciergeModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  groundedWithSearch?: boolean;
  sources?: Array<{ title: string; uri: string }>;
  timestamp: string;
}

export const PanamaConciergeModal: React.FC<PanamaConciergeModalProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  const panamaTime = usePanamaTime();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: lang === 'en'
        ? "Hello! I am your Cabrera Barista Concierge, grounded with live Google Search data. How can I assist you today with our Costa Verde roastery, Panama local time schedule, Boquete highland Geisha lots, or directions?"
        : "¡Hola! Soy tu Barista Concierge de Cabrera Coffee Brew House, conectado con búsqueda de Google en vivo. ¿En qué puedo orientarte hoy sobre nuestra tostaduría en Costa Verde, horario en hora oficial de Panamá (UTC-5), cafés Geisha de Boquete o reservas?",
      timestamp: panamaTime.panamaTimeString,
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const quickPrompts = lang === 'en' ? [
    "What are today's hours in Panama local time?",
    "Where is the Costa Verde flagship located?",
    "Tell me about the Boquete Geisha lots you serve",
    "What payment methods are accepted in Panama (Yappy)?",
  ] : [
    "¿Cuál es el horario hoy en hora oficial de Panamá?",
    "¿Dónde queda exactamente la sede de Costa Verde?",
    "¿Qué granos Geisha de Boquete tienen disponibles?",
    "¿Aceptan pagos por Yappy de Banco General o Nequi?",
  ];

  const handleSend = async (questionText?: string) => {
    const query = questionText || input.trim();
    if (!query || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: panamaTime.panamaTimeString,
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!questionText) setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/concierge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: query, lang }),
      });

      if (!res.ok) throw new Error('Network error');
      const data = await res.json();

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: data.reply,
        groundedWithSearch: data.groundedWithSearch,
        sources: data.sources,
        timestamp: panamaTime.panamaTimeString,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch {
      const fallbackMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: lang === 'en'
          ? "Cabrera Coffee Brew House is open in Costa Verde, Panama (UTC-5). Hours: Tuesday–Friday 7:00 AM–7:30 PM, Saturday 8:00 AM–7:30 PM, Sunday 8:00 AM–4:00 PM. Contact us at +507 6603-9178."
          : "Cabrera Coffee Brew House está en Plaza Paseo Costa Verde, La Chorrera, Panamá (UTC-5). Horario: Martes a Viernes 7:00 AM–7:30 PM, Sábados 8:00 AM–7:30 PM, Domingos 8:00 AM–4:00 PM. WhatsApp: +507 6603-9178.",
        timestamp: panamaTime.panamaTimeString,
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-2xl bg-[#181410] border border-[#443527] rounded-2xl shadow-2xl flex flex-col max-h-[88vh] overflow-hidden text-[#f7f5f0]"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#33271d] bg-gradient-to-r from-[#211914] via-[#2a1f18] to-[#1c1511] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#c85a17] to-[#6d431c] flex items-center justify-center text-white shadow-lg">
              <Sparkles className="w-5 h-5 text-[#fbf6ee]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-bold text-base sm:text-lg text-[#fbf9f5]">
                  {lang === 'en' ? 'Panama Coffee Concierge' : 'Barista Concierge Cabrera'}
                </h3>
                <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#3d2c1f] text-[#d96523] border border-[#5a402c]">
                  <Globe className="w-2.5 h-2.5" />
                  <span>Google Search Grounded</span>
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#b8a999] mt-0.5">
                <Clock className="w-3.5 h-3.5 text-[#d96523]" />
                <span className="font-medium text-[#e4d6c5]">{panamaTime.panamaTimeString}</span>
                <span>·</span>
                <span className="text-emerald-400 font-semibold">{panamaTime.isOpen ? panamaTime.statusBadgeEs : 'Cerrado'}</span>
                <span>·</span>
                <span className="text-[#96897b]">Hora Oficial Panamá (UTC-5)</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-lg bg-[#271e17] hover:bg-[#382b21] text-[#c9baa9] hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Panama Context Banner */}
        <div className="bg-[#1e1712] px-4 py-2 text-[11px] border-b border-[#33271d] flex flex-wrap items-center justify-between gap-2 text-[#b0a191]">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#d96523]" />
            <span>Plaza Paseo Costa Verde, La Chorrera, Panamá Oeste</span>
          </div>
          <div className="text-[#d96523] font-mono text-[10px]">
            {panamaTime.nextEventDescriptionEs}
          </div>
        </div>

        {/* Chat Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${
                m.sender === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              <div
                className={`max-w-[88%] rounded-2xl p-4 text-sm leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-[#c85a17] text-white rounded-tr-none shadow-md font-medium'
                    : 'bg-[#221b15] border border-[#3c2f23] text-[#f2ede4] rounded-tl-none shadow-sm'
                }`}
              >
                <p className="whitespace-pre-wrap">{m.text}</p>

                {/* Sources Citation List if grounded */}
                {m.sources && m.sources.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-[#3c2f23] space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#d96523] block">
                      {lang === 'en' ? 'Grounded Sources & Location Data:' : 'Fuentes y Ubicación Verificada:'}
                    </span>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {m.sources.map((src, i) => (
                        <a
                          key={i}
                          href={src.uri}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded bg-[#18130f] hover:bg-[#33261b] text-[#cbbba8] hover:text-[#d96523] border border-[#3c2e22] transition-colors"
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span className="truncate max-w-[200px]">{src.title}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <span className="text-[10px] text-[#7d7164] mt-1 px-1">
                {m.timestamp}
              </span>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-[#d96523] py-2 px-3 rounded-lg bg-[#221b15] w-fit border border-[#3c2f23]">
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
              <span>{lang === 'en' ? 'Consulting Google Search & Panama Roastery Data...' : 'Consultando Búsqueda de Google y Datos de Panamá...'}</span>
            </div>
          )}
        </div>

        {/* Quick Suggestion Pills */}
        <div className="px-4 py-2 border-t border-[#2d221a] bg-[#1a1410] overflow-x-auto flex gap-1.5">
          {quickPrompts.map((q, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSend(q)}
              className="text-[11px] px-3 py-1.5 rounded-lg bg-[#251d16] hover:bg-[#372b20] text-[#c7b9a7] hover:text-white border border-[#3b2e22] whitespace-nowrap transition-colors flex items-center gap-1"
            >
              <span>{q}</span>
              <ChevronRight className="w-3 h-3 text-[#c85a17]" />
            </button>
          ))}
        </div>

        {/* Input Footer */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-3 sm:p-4 border-t border-[#33271d] bg-[#1d1611] flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              lang === 'en'
                ? "Ask about hours, Boquete lots, Costa Verde directions..."
                : "Pregunta sobre horarios en Panamá, cafés de Boquete, cómo llegar..."
            }
            className="flex-1 bg-[#140f0c] border border-[#443527] focus:border-[#c85a17] text-[#f7f5f0] text-sm rounded-xl px-4 py-3 outline-none transition-colors placeholder:text-[#6a5e52]"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="px-5 py-3 rounded-xl bg-[#c85a17] hover:bg-[#b54d0f] disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg"
          >
            <span>{lang === 'en' ? 'Send' : 'Enviar'}</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </motion.div>
    </div>
  );
};
