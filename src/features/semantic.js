import { T } from "../core/lexicon.js";
import { env, pipeline, cos_sim } from "@huggingface/transformers";
import { AutoTokenizer, AutoModel } from "@huggingface/transformers";

// -----------------------------
// ✅ 1. THE FIX: Set environment variables on the global `env` object
// Do this at the top of your file, before any functions run!
env.allowLocalModels = true;
env.localModelPath = "/models/"; // Try changing to './models/' if your app isn't hosted at the root

let extractor;
const knownIntents = ["attack", "look", "move", "inventory", "talk"];
let intentEmbeddings = {};

export async function test() {
  const extractor = await pipeline(
    "feature-extraction",
    "Xenova/all-MiniLM-L6-v2",
    {
      quantized: false,
    },
  );

  const result = await extractor("hello world", {
    pooling: "mean",
    normalize: true,
  });

  console.log(result);
}

export async function initAI() {
  // const originalFetch = window.fetch;

  // window.fetch = async (...args) => {
  //   console.log("FETCHING0:");
  //   console.log("FETCHING1:", args[0]);

  //   const response = await originalFetch(...args);

  //   console.log(
  //     "RESPONSE:",
  //     response.url,
  //     response.status,
  //     response.headers.get("content-type"),
  //   );

  //   return response;
  // };

  extractor = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");

  // Pre-calculate embeddings for our core system intents
  for (const intent of knownIntents) {
    const output = await extractor(intent, {
      pooling: "mean",
      normalize: true,
      quantize: false,
    });
    intentEmbeddings[intent] = output.data;
  }
}

// 2. Resolve unknown verbs using AI math (Cosine Similarity)
export async function resolveIntent(verb) {
  if (!extractor) return T("unknown_intent"); // Fallback if AI isn't loaded

  const output = await extractor(verb, { pooling: "mean", normalize: true });
  const inputEmbedding = output.data;

  let bestMatch = "unknown_intent";
  let highestScore = 0;

  // Find the closest mathematical match
  for (const intent of knownIntents) {
    const score = cos_sim(inputEmbedding, intentEmbeddings[intent]);
    if (score > highestScore) {
      highestScore = score;
      bestMatch = intent;
    }
  }

  // Require at least a 50% confidence match
  return highestScore > 0.5 ? T(bestMatch) : T("unknown_intent");
}

// Update parseCommand to be async since AI takes a few milliseconds
export async function parseCommand(rawText) {
  const words = rawText.trim().split(" ");
  if (words.length === 0) return null;

  return {
    intentId: await resolveIntent(words[0]),
    targetId: words[1] ? T(words[1]) : 0,
  };
}
