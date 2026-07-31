"use client";

import { useEffect, useRef, useState } from "react";
import { X, Send, MessageCircle, ChevronDown } from "lucide-react";

type Message = { role: "user" | "assistant"; content: string };

type View = "chat" | "contact" | "contact-sent";

const WELCOME: Message = {
  role: "assistant",
  content:
    "Bonjour 👋 Tu as une question sur Mon Assistant Kiné — ou tu préfères qu'on te recontacte directement ?",
};

export function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState<View>("chat");
  const [proactive, setProactive] = useState(false);
  const [proactiveDismissed, setProactiveDismissed] = useState(false);

  // Contact form
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactLoading, setContactLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Proactive bubble after 20s
  useEffect(() => {
    if (proactiveDismissed || open) return;
    const timer = setTimeout(() => setProactive(true), 20000);
    return () => clearTimeout(timer);
  }, [proactiveDismissed, open]);

  // Hide proactive when chat opens
  useEffect(() => {
    if (open) {
      setProactive(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = { role: "user", content: text };
    const history = [...messages, userMsg];
    setMessages(history);
    setInput("");
    setLoading(true);

    const assistantMsg: Message = { role: "assistant", content: "" };
    setMessages([...history, assistantMsg]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: history.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!res.ok || !res.body) throw new Error("Erreur serveur");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const next = [...prev];
          next[next.length - 1] = { role: "assistant", content: accumulated };
          return next;
        });
      }
    } catch {
      setMessages((prev) => {
        const next = [...prev];
        next[next.length - 1] = {
          role: "assistant",
          content: "Désolé, une erreur s'est produite. Réessaie dans un instant.",
        };
        return next;
      });
    } finally {
      setLoading(false);
    }
  }

  async function submitContact(e: React.FormEvent) {
    e.preventDefault();
    if (!contactEmail || contactLoading) return;
    setContactLoading(true);
    try {
      await fetch("/api/chat/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: contactName,
          email: contactEmail,
          message: contactMessage,
        }),
      });
      setView("contact-sent");
    } catch {
      // still show success to avoid UX friction
      setView("contact-sent");
    } finally {
      setContactLoading(false);
    }
  }

  return (
    <>
      {/* Proactive bubble */}
      {proactive && !open && (
        <div
          className="fixed bottom-24 right-6 z-50 max-w-[260px] rounded-2xl px-4 py-3 shadow-xl animate-in slide-in-from-bottom-2 duration-300"
          style={{ background: "#0f172a", border: "1px solid rgba(56,153,170,0.3)" }}
        >
          <button
            onClick={() => { setProactive(false); setProactiveDismissed(true); }}
            className="absolute top-2 right-2 text-white/40 hover:text-white/70 transition-colors"
            aria-label="Fermer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <p className="text-white text-xs leading-snug mb-2 pr-4">
            💬 Une question sur Mon Assistant Kiné ?
          </p>
          <button
            onClick={() => { setProactive(false); setOpen(true); }}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg w-full text-center transition-all hover:opacity-90"
            style={{ background: "#3899aa", color: "white" }}
          >
            Discuter maintenant →
          </button>
        </div>
      )}

      {/* Floating button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Fermer le chat" : "Ouvrir le chat"}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all hover:scale-105 active:scale-95"
        style={{ background: "#3899aa", boxShadow: "0 4px 20px rgba(56,153,170,0.4)" }}
      >
        {open
          ? <ChevronDown className="w-5 h-5 text-white" />
          : <MessageCircle className="w-5 h-5 text-white" />
        }
        {proactive && !open && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 border-2 border-white" />
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div
          className="fixed bottom-24 right-6 z-50 flex flex-col rounded-2xl overflow-hidden shadow-2xl w-[340px] max-h-[520px]"
          style={{ border: "1px solid #d4ecea", background: "white" }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3 shrink-0"
            style={{ background: "#0f172a" }}
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm"
                style={{ background: "#3899aa" }}>
                🦴
              </div>
              <div>
                <p className="text-white text-sm font-semibold leading-none mb-0.5">
                  Mon Assistant Kiné
                </p>
                <p className="text-white/50 text-xs">Répond en quelques secondes</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/50 hover:text-white transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>

          {view === "chat" && (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3" style={{ minHeight: 0 }}>
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className="max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap"
                      style={m.role === "user"
                        ? { background: "#3899aa", color: "white", borderBottomRightRadius: "4px" }
                        : { background: "#f0f9fa", color: "#0f172a", borderBottomLeftRadius: "4px", border: "1px solid #d4ecea" }
                      }
                    >
                      {m.content}
                      {m.role === "assistant" && loading && i === messages.length - 1 && m.content === "" && (
                        <span className="inline-flex gap-1 ml-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#3899aa] animate-bounce" style={{ animationDelay: "0ms" }} />
                          <span className="w-1.5 h-1.5 rounded-full bg-[#3899aa] animate-bounce" style={{ animationDelay: "150ms" }} />
                          <span className="w-1.5 h-1.5 rounded-full bg-[#3899aa] animate-bounce" style={{ animationDelay: "300ms" }} />
                        </span>
                      )}
                    </div>
                  </div>
                ))}
                <div ref={bottomRef} />
              </div>

              {/* Actions rapides — toujours visibles */}
              <div className="px-4 pb-2 shrink-0 flex gap-2">
                <button
                  onClick={() => setView("contact")}
                  className="flex-1 text-center py-2 rounded-xl text-xs font-semibold transition-all hover:opacity-90"
                  style={{ background: "#fef9ec", border: "1px solid #f0d080", color: "#92680a" }}
                >
                  ✉️ Être recontacté
                </button>
                <button
                  onClick={() => inputRef.current?.focus()}
                  className="flex-1 text-center py-2 rounded-xl text-xs font-semibold transition-all hover:bg-[#eef7f6]"
                  style={{ border: "1px solid #d4ecea", color: "#3899aa" }}
                >
                  💬 Poser une question
                </button>
              </div>

              {/* Input */}
              <form
                onSubmit={(e) => { e.preventDefault(); send(); }}
                className="flex items-center gap-2 px-3 py-3 border-t shrink-0"
                style={{ borderColor: "#d4ecea" }}
              >
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Pose ta question…"
                  className="flex-1 text-sm outline-none bg-transparent text-[#0f172a] placeholder:text-[#94a3b8]"
                  disabled={loading}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
                  }}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all disabled:opacity-30"
                  style={{ background: "#3899aa" }}
                >
                  <Send className="w-3.5 h-3.5 text-white" />
                </button>
              </form>
            </>
          )}

          {view === "contact" && (
            <form onSubmit={submitContact} className="flex-1 overflow-y-auto px-4 py-5 space-y-4">
              <div>
                <p className="text-sm font-semibold text-[#0f172a] mb-1">
                  Être recontacté par Sylvain
                </p>
                <p className="text-xs text-[#64748b] leading-relaxed">
                  Sylvain est co-fondateur et kiné D.E. Il te répondra personnellement sous 24h.
                </p>
              </div>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Ton prénom *"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm outline-none text-[#0f172a] placeholder:text-[#94a3b8]"
                  style={{ border: "1px solid #d4ecea", background: "#f8fafc" }}
                />
                <input
                  type="email"
                  placeholder="Ton email *"
                  required
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm outline-none text-[#0f172a] placeholder:text-[#94a3b8]"
                  style={{ border: "1px solid #d4ecea", background: "#f8fafc" }}
                />
                <textarea
                  placeholder="Ta question ou ton contexte (facultatif)"
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  rows={3}
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm outline-none text-[#0f172a] placeholder:text-[#94a3b8] resize-none"
                  style={{ border: "1px solid #d4ecea", background: "#f8fafc" }}
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setView("chat")}
                  className="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all hover:bg-[#eef7f6]"
                  style={{ border: "1px solid #d4ecea", color: "#64748b" }}
                >
                  Retour
                </button>
                <button
                  type="submit"
                  disabled={!contactEmail || contactLoading}
                  className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition-all disabled:opacity-40"
                  style={{ background: "#3899aa" }}
                >
                  {contactLoading ? "Envoi…" : "Envoyer"}
                </button>
              </div>
            </form>
          )}

          {view === "contact-sent" && (
            <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 text-center gap-3">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                style={{ background: "#eef7f6" }}>
                ✅
              </div>
              <p className="text-sm font-semibold text-[#0f172a]">Message envoyé !</p>
              <p className="text-xs text-[#64748b] leading-relaxed">
                Sylvain te répondra sous 24h à l&apos;adresse indiquée.
                En attendant, tu peux essayer Mon Assistant Kiné gratuitement.
              </p>
              <a
                href="https://app.monassistantkine.fr/signup"
                className="mt-2 inline-flex items-center justify-center w-full py-2.5 rounded-xl text-sm font-semibold text-white"
                style={{ background: "#3899aa" }}
              >
                Essayer 14 jours — sans CB
              </a>
              <button
                onClick={() => setView("chat")}
                className="text-xs text-[#94a3b8] hover:text-[#64748b] transition-colors"
              >
                Retour au chat
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
