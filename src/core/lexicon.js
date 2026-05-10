// Bidirectional mapping for semantic tokens
const strToId = new Map();
const idToStr = new Map();
let nextToken = 1; // 0 is reserved for null/empty

export function T(string) {
  if (!string) return 0;
  const lower = string.toLowerCase();

  if (!strToId.has(lower)) {
    strToId.set(lower, nextToken);
    idToStr.set(nextToken, lower);
    nextToken++;
  }
  return strToId.get(lower);
}

export function S(tokenId) {
  return idToStr.get(tokenId) || "unknown";
}
