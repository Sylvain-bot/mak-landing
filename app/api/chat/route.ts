import Anthropic from "@anthropic-ai/sdk";
import { CHATBOT_SYSTEM_PROMPT } from "@/lib/chatbot-knowledge";

const client = new Anthropic();

const MAX_MESSAGES = 20;
const MAX_MESSAGE_LENGTH = 2000;

type ChatMessage = { role: "user" | "assistant"; content: string };

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const messages: unknown = body?.messages;

  if (!Array.isArray(messages) || messages.length === 0) {
    return new Response("Invalid request", { status: 400 });
  }

  const cleaned: ChatMessage[] = messages
    .slice(-MAX_MESSAGES)
    .filter(
      (m): m is ChatMessage =>
        m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.length > 0 &&
        m.content.length <= MAX_MESSAGE_LENGTH
    );

  if (cleaned.length === 0 || cleaned[cleaned.length - 1].role !== "user") {
    return new Response("Invalid request", { status: 400 });
  }

  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      try {
        const claudeStream = client.messages.stream({
          model: "claude-opus-4-8",
          max_tokens: 1024,
          system: CHATBOT_SYSTEM_PROMPT,
          output_config: { effort: "low" },
          messages: cleaned,
        });

        claudeStream.on("text", (delta) => {
          controller.enqueue(encoder.encode(delta));
        });

        await claudeStream.finalMessage();
        controller.close();
      } catch (err) {
        console.error("Chat stream error:", err);
        controller.enqueue(
          encoder.encode(
            "Désolé, une erreur est survenue. Réessaie ou écris à sylvain@monassistantkine.fr."
          )
        );
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache",
    },
  });
}
