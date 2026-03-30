import { streamText } from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import { buildSystemPrompt } from "@/lib/chat/system-prompt";
import { validateInput } from "@/lib/chat/input-guard";

let systemPrompt: string;
try {
  systemPrompt = buildSystemPrompt();
} catch (e) {
  console.error("Failed to build system prompt:", e);
  systemPrompt = "You are Bobbi's Assistant for The Vale. Help with venue questions.";
}

export async function POST(req: Request) {
  const { messages } = await req.json();

  // Extract the last user message text for validation
  const lastMessage = messages[messages.length - 1];
  if (lastMessage?.role === "user") {
    // v6 messages use parts array; extract text content
    let text = "";
    if (lastMessage.parts) {
      for (const part of lastMessage.parts) {
        if (part.type === "text") text += part.text;
      }
    } else if (lastMessage.content) {
      text = lastMessage.content;
    }

    const guard = validateInput(text);
    if (!guard.ok) {
      return Response.json({ error: guard.reason }, { status: 400 });
    }
  }

  try {
    const result = streamText({
      model: anthropic("claude-haiku-4-5-20251001"),
      system: systemPrompt,
      messages,
      maxOutputTokens: 1024,
      temperature: 0.7,
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Chat API error:", error);
    return Response.json({ error: "Failed to generate response" }, { status: 500 });
  }
}
