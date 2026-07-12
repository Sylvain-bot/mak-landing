"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import { usePostHog } from "posthog-js/react";
import { CTA_SIGNUP_URL, TRIAL_DAYS } from "@/lib/claims";

type Message = { role: "user" | "assistant"; content: string };

const WELCOME: Message = {
  role: "assistant",
  content: `Salut ! Je réponds à tes questions sur Mon Assistant Kiné — tarifs, fonctionnalités, essai gratuit de ${TRIAL_DAYS} jours... Qu'est-ce qui te ferait hésiter ?`,
};

const SUGGESTIONS = [
  "Combien ça coûte ?",
  "L'essai gratuit, sans CB, ça marche comment ?",
  "Mes données patients sont-elles sécurisées ?",
];

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-3.5 py-2.5">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: "#94a3b8" }}
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

export function Chatbot() {
  const pathname = usePathname();
  const ph = usePostHog();
  const [open, setOpen] = useState(false);
  const [everOpened, setEverOpened] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, streaming]);

  useEffect(() => {
    if (open) {
      if (!everOpened) {
        setEverOpened(true);
        ph?.capture("chatbot_opened");
      }
      inputRef.current?.focus();
    }
  }, [open, everOpened, ph]);

  if (pathname?.startsWith("/admin")) return null;

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || streaming) return;

    const nextMessages: Message[] = [...messages, { role: "user", content: trimmed }];
    setMessages(nextMessages);
    setInput("");
    setStreaming(true);
    ph?.capture("chatbot_message_sent");

    setMessages((m) => [...m, { role: "assistant", content: "" }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      if (!res.body) throw new Error("no body");
      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        setMessages((m) => {
          const copy = [...m];
          copy[copy.length - 1] = {
            role: "assistant",
            content: copy[copy.length - 1].content + chunk,
          };
          return copy;
        });
      }
    } catch {
      setMessages((m) => {
        const copy = [...m];
        copy[copy.length - 1] = {
          role: "assistant",
          content: "Désolé, une erreur est survenue. Écris-nous à sylvain@monassistantkine.fr.",
        };
        return copy;
      });
    } finally {
      setStreaming(false);
    }
  }

  return (
    <>
      <motion.button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Fermer le chat" : "Ouvrir le chat"}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.6 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full flex items-center justify-center text-white"
        style={{
          background: "linear-gradient(135deg, #3899aa, #1d5c6b)",
          boxShadow: "0 8px 28px rgba(56,153,170,0.45)",
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <X className="w-6 h-6" />
            </motion.span>
          ) : (
            <motion.span key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <MessageCircle className="w-6 h-6" />
            </motion.span>
          )}
        </AnimatePresence>
        {!everOpened && (
          <motion.span
            className="absolute inset-0 rounded-full"
            style={{ border: "2px solid #3899aa" }}
            animate={{ scale: [1, 1.5, 1.5], opacity: [0.6, 0, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
          />
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed z-50 flex flex-col rounded-2xl overflow-hidden bottom-24 left-4 right-4 h-[min(65vh,480px)] max-h-[75vh] sm:left-auto sm:right-5 sm:w-[380px] sm:h-[600px] sm:max-h-[80vh]"
            style={{
              background: "white",
              border: "1px solid #d4ecea",
              boxShadow: "0 20px 60px rgba(15,23,42,0.25), 0 0 0 1px rgba(56,153,170,0.06)",
            }}
          >
            {/* Header */}
            <div
              className="relative shrink-0 px-4 py-3.5 flex items-center gap-3"
              style={{ background: "linear-gradient(135deg, #0f172a, #1d3548 60%, #1d5c6b)" }}
            >
              <div
                className="absolute inset-0 opacity-40 pointer-events-none"
                style={{ background: "radial-gradient(ellipse 80% 100% at 100% 0%, rgba(56,153,170,0.5), transparent 70%)" }}
              />
              <div
                className="relative w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                style={{ background: "rgba(56,153,170,0.25)", border: "1px solid rgba(56,153,170,0.5)" }}
              >
                <Sparkles className="w-4 h-4 text-[#5bb8c8]" />
              </div>
              <div className="relative flex-1 min-w-0">
                <p className="text-white text-sm font-semibold leading-tight">Assistant Mon Assistant Kiné</p>
                <p className="text-[11px] text-white/60 flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] animate-pulse shrink-0" />
                  En ligne · réponses immédiates
                </p>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 min-h-0 overflow-y-auto px-3.5 py-4 space-y-3" style={{ background: "#f8fcfd" }}>
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className="max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap"
                    style={
                      m.role === "user"
                        ? { background: "linear-gradient(135deg, #3899aa, #2a7a8a)", color: "white", borderBottomRightRadius: 6 }
                        : { background: "white", color: "#1e293b", border: "1px solid #e5f2f4", borderBottomLeftRadius: 6 }
                    }
                  >
                    {m.content.length > 0 ? (
                      m.content
                    ) : streaming && i === messages.length - 1 ? (
                      <TypingDots />
                    ) : null}
                  </div>
                </motion.div>
              ))}

              {messages.length === 1 && (
                <div className="flex flex-col gap-2 pt-1">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="text-left text-xs px-3 py-2 rounded-xl transition-colors"
                      style={{ background: "white", border: "1px solid #d4ecea", color: "#2a7a8a" }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <div className="shrink-0 border-t p-3" style={{ borderColor: "#d4ecea", background: "white" }}>
              <div className="flex items-end gap-2">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      send(input);
                    }
                  }}
                  placeholder="Écris ta question..."
                  rows={1}
                  className="flex-1 resize-none text-sm px-3 py-2.5 rounded-xl outline-none"
                  style={{ background: "#f0f9fa", border: "1px solid #d4ecea", color: "#0f172a", maxHeight: 88 }}
                />
                <button
                  onClick={() => send(input)}
                  disabled={streaming || !input.trim()}
                  aria-label="Envoyer"
                  className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-white transition-all disabled:opacity-40"
                  style={{ background: "linear-gradient(135deg, #3899aa, #2a7a8a)" }}
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <a
                href={CTA_SIGNUP_URL}
                className="mt-2.5 block text-center text-xs font-semibold py-2 rounded-lg transition-colors"
                style={{ color: "#3899aa", background: "#eef7f6" }}
                onClick={() => ph?.capture("cta_signup_click", { location: "chatbot" })}
              >
                Démarrer mon essai gratuit de {TRIAL_DAYS} jours →
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
