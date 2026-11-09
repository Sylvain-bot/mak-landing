// Notification Telegram interne (équipe), envoyée par le bot de Mon Assistant Kiné.
// Variables Vercel : TELEGRAM_BOT_TOKEN (donné par @BotFather) et TELEGRAM_CHAT_ID (ta conversation avec le bot).
// Sans ces variables, rien n'est envoyé. Ne lève jamais d'erreur : une notification ratée ne doit rien bloquer.
// Volontairement sans email : seulement le prénom et la provenance.

const TELEGRAM_TIMEOUT_MS = 4000;

export async function notifyTelegram(text: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const chatId = process.env.TELEGRAM_CHAT_ID?.trim();
  if (!token || !chatId) return;
  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, disable_web_page_preview: true }),
      signal: AbortSignal.timeout(TELEGRAM_TIMEOUT_MS),
    });
    if (!res.ok) console.warn(`[telegram] ${res.status}: ${await res.text().catch(() => "")}`);
  } catch (err) {
    console.warn("[telegram] envoi échoué:", err);
  }
}
