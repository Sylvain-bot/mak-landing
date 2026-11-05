"use client";

import { usePathname } from "next/navigation";
import { ChatBot } from "@/components/ChatBot";

// Pages sans chatbot : les pages du guide FAMI servent de tunnel de vente, rien ne doit en détourner.
const HIDDEN_ON = ["/guide-fami", "/guide-fami/merci"];

export function ChatBotGate() {
  const pathname = usePathname();
  if (HIDDEN_ON.includes(pathname)) return null;
  return <ChatBot />;
}
