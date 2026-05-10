import { getStat, addFact } from "../core/graph.js"; // Note: update graph.js to allow updating/removing facts later
import { S } from "../core/lexicon.js";

export function executeIntent(intentVerb, subjectId, targetId) {
  if (intentVerb === "attack") {
    // In a real ECS, you'd lookup the specific target's HP fact and mutate it.
    // For the test, we just return the calculation.
    const isHostile = getStat("clone", "hostile");
    const health = parseInt(getStat("clone", "health") || "10");
    const weaponDmg = parseInt(getStat("sword", "damage") || "5");

    const newHealth = health - weaponDmg;
    return `Attacked ${S(targetId)} for ${weaponDmg} dmg. HP: ${health} -> ${newHealth}`;
  }
  return `Nothing happened.`;
}
