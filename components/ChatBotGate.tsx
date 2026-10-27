"use client";

import { usePathname } from "next/navigation";
import { ChatBot } from "@/components/ChatBot";

// Pages sans chatbot : la page /guide-fami sert de tunnel de vente, rien ne doit en détourner.
const HIDDEN_ON = ["/guide-fami"];

export function ChatBotGate() {
  const pathname = usePathname();
  if (HIDDEN_ON.includes(pathname)) return null;
  return <ChatBot />;
}
