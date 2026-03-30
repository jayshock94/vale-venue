export const INITIAL_CHIPS = [
  { label: "What's included?", message: "What's included with the venue rental?" },
  { label: "How much does it cost?", message: "How much does it cost to rent The Vale?" },
  { label: "How big is the space?", message: "How big is the space and how many guests can it hold?" },
  { label: "Can I bring my own caterer?", message: "Can I bring my own caterer?" },
] as const;

export const FOLLOWUP_CHIPS = [
  { label: "What about parking?", message: "What's the parking situation like?" },
  { label: "What tables and chairs?", message: "What tables and chairs come with the rental?" },
  { label: "Tell me about add-ons", message: "What add-ons or upgrades are available?" },
  { label: "Build my brochure", message: "I'd like to build a brochure for my event" },
  { label: "Check availability", message: "How do I check availability for a specific date?" },
] as const;

// Pick 3 random follow-up chips (excluding any whose message was already sent)
export function getFollowupChips(sentMessages: string[]) {
  const available = FOLLOWUP_CHIPS.filter(
    (chip) => !sentMessages.some((msg) => msg === chip.message)
  );
  // Shuffle and take 3
  const shuffled = [...available].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 3);
}
