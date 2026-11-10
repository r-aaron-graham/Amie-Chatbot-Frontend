// Fictional activity cards written for this offline demo.
const cards = [
  {
    id: "SEL-01",
    title: "Active listening",
    phrases: ["active listening", "paraphrase"],
    excerpt: "In pairs, one learner describes a favorite activity. The listener paraphrases one detail before asking a follow-up question.",
  },
  {
    id: "SEL-02",
    title: "Group roles",
    phrases: ["group roles", "team roles"],
    excerpt: "Assign a recorder, a facilitator, and a timekeeper for a short group task. Rotate roles for the next round.",
  },
  {
    id: "SEL-03",
    title: "Classroom reflection",
    phrases: ["classroom reflection", "exit ticket"],
    excerpt: "Use an exit ticket to name one contribution to the group and one action to try in the next activity.",
  },
];

export function retrieve(question) {
  const words = question.toLowerCase().match(/[a-z]+/g) ?? [];
  const normalized = ` ${words.join(" ")} `;
  const matches = cards.filter(({ phrases }) =>
    phrases.some((phrase) => normalized.includes(` ${phrase} `)),
  );
  return matches.length === 1 ? matches[0] : null;
}
