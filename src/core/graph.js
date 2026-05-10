import { T, S } from "./lexicon.js";

// The Database: Flat array of triples (Integers only!)
export const triples = [];

export function addFact(subject, predicate, object) {
  triples.push([T(subject), T(predicate), T(object)]);
}

// Basic query: passing 0 acts as a wildcard
export function query(subjectId, predicateId, objectId) {
  return triples.filter(
    (t) =>
      (subjectId === 0 || t[0] === subjectId) &&
      (predicateId === 0 || t[1] === predicateId) &&
      (objectId === 0 || t[2] === objectId),
  );
}

// INFERENCE ENGINE: "The Tiny Ontology Engine"
// Example: If Clone -> isa -> Humanoid, and Humanoid -> bleeds -> true
// inferFact(Clone, bleeds) will return true by walking the graph.
export function inferFact(subjectId, predicateId) {
  // 1. Check direct facts first
  const direct = query(subjectId, predicateId, 0);
  if (direct.length > 0) return direct[0][2]; // Return the object token

  // 2. Walk the "isa" chain
  const isaToken = T("isa");
  const parents = query(subjectId, isaToken, 0);

  for (const parent of parents) {
    const parentId = parent[2];
    const inherited = inferFact(parentId, predicateId);
    if (inherited) return inherited;
  }

  return 0; // Fact not found
}
