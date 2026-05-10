import { T } from "../core/lexicon.js";

// Semantic Clusters (Later, this is replaced by a tiny LLM/Embedding model)
const intentClusters = {
  attack: ["strike", "hit", "smash", "destroy", "kill", "shoot"],
  look: ["examine", "inspect", "view", "observe"],
  move: ["go", "walk", "run", "head"],
};

// Maps any unknown word to its core intent token
export function resolveIntent(verb) {
  const lowerVerb = verb.toLowerCase();

  for (const [core, synonyms] of Object.entries(intentClusters)) {
    if (core === lowerVerb || synonyms.includes(lowerVerb)) {
      return T(core); // Return the integer token for the core intent
    }
  }

  return T("unknown_intent");
}

export function parseCommand(rawText) {
  const words = rawText.trim().split(" ");
  if (words.length === 0) return null;

  const rawVerb = words[0];
  const rawTarget = words.slice(1).join(" ");

  return {
    intentId: resolveIntent(rawVerb),
    targetId: rawTarget ? T(rawTarget) : 0,
  };
}
