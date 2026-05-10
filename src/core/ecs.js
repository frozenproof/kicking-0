import { addFact, inferFact, query } from "./graph.js";
import { T, S } from "./lexicon.js";

let nextEntityId = 1000; // Reserve 1-999 for static concepts

// Procedural generation of a live entity
export function spawn(concept) {
    const entityId = nextEntityId++;
    const entityTokenStr = `ent_${entityId}`;
    
    // Connect the live entity to the ontological concept
    addFact(entityTokenStr, "isa", concept);
    addFact(entityTokenStr, "is_active", "true");

    return entityTokenStr;
}

// Get a dynamic stat. If the entity doesn't have it, it infers it from its concept type.
export function getStat(entityStr, statStr) {
    const valToken = inferFact(T(entityStr), T(statStr));
    return valToken !== 0 ? S(valToken) : null;
}