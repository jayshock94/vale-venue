const MAX_LENGTH = 2000;

const INJECTION_PATTERNS = [
  /ignore\s+(all\s+)?previous\s+instructions/i,
  /repeat\s+(your\s+)?(system\s+)?prompt/i,
  /show\s+(me\s+)?(your\s+)?(system\s+)?prompt/i,
  /what\s+are\s+your\s+(instructions|rules|guidelines)/i,
  /output\s+(your\s+)?(system|initial)\s+(prompt|message|instructions)/i,
  /print\s+(your\s+)?(system|initial)\s+(prompt|message|instructions)/i,
  /reveal\s+(your\s+)?(system|initial)\s+(prompt|message|instructions)/i,
  /show\s+(me\s+)?(the\s+)?knowledge\s+base/i,
  /dump\s+(your\s+)?(system|knowledge|prompt)/i,
  /you\s+are\s+now\s+a/i,
  /pretend\s+(you\s+are|to\s+be)/i,
  /act\s+as\s+(a\s+)?different/i,
  /disregard\s+(all\s+)?(previous|prior|above)/i,
  /forget\s+(all\s+)?(previous|prior|your)/i,
];

type GuardResult =
  | { ok: true }
  | { ok: false; reason: string };

export function validateInput(message: string): GuardResult {
  if (!message || message.trim().length === 0) {
    return { ok: false, reason: "Message is empty." };
  }

  if (message.length > MAX_LENGTH) {
    return {
      ok: false,
      reason: "That message is a bit long. Could you shorten it?",
    };
  }

  // Only flag short messages that look purely like injection attempts.
  // Longer messages with legitimate content mixed in get handled by
  // the system prompt's security guardrails instead.
  if (message.length < 200) {
    for (const pattern of INJECTION_PATTERNS) {
      if (pattern.test(message)) {
        return {
          ok: false,
          reason:
            "I'm here to help with questions about The Vale! What would you like to know about the venue?",
        };
      }
    }
  }

  return { ok: true };
}
