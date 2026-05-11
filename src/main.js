import "./ui/style.css";
import { initializeDOM, DOM } from "./ui/dom.js";
import { write, renderTerminal } from "./features/terminal.js";
import { startMonitor } from "./utils/monitor.js";
import { addFact } from "./core/graph.js";
import { spawn, getStat } from "./core/ecs.js";
import { initAI, parseCommand } from "./features/semantic.js";
import { executeIntent } from "./features/rules.js";
import { S } from "./core/lexicon.js";

initializeDOM();
// test();
startMonitor("monitor-view");
initAI();

// --- 1. BOOTSTRAP THE ONTOLOGY (Instead of JSON) ---
// Define Concepts
addFact("weapon", "is_item", "true");
addFact("sword", "isa", "weapon");
addFact("sword", "damage", "15");
addFact("sword", "damage_type", "slashing");

addFact("biological", "vulnerable_to", "poison");
addFact("humanoid", "isa", "biological");
addFact("clone", "isa", "humanoid");
addFact("clone", "hostile", "true");

// --- 2. SPAWN LIVE ENTITIES ---
const enemyId = spawn("clone");

write("[ SYMBOLIC RUNTIME ONLINE ]", "system");
write(`A ${S(enemyId)} appears in the dark room.`);
renderTerminal();

// --- 3. INPUT PIPELINE ---
DOM.terminalInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const input = DOM.terminalInput.value.trim();
    if (input === "") return;

    write(`> ${input}`, "user");
    DOM.terminalInput.value = "";

    // 4. PARSE SEMANTICS
    const command = parseCommand(input);
    const intentVerb = S(command.intentId);

    // 5. RULE RESOLUTION
    if (intentVerb === "attack") {
      // Check inferred properties based on the graph!
      const isHostile = getStat("clone", "hostile");
      const vulnerablity = getStat("clone", "vulnerable_to");

      write(`You execute an ATTACK intent against the target.`);
      if (isHostile === "true") {
        write(
          `System detects target inherits vulnerability to: ${vulnerablity}`,
        );
      }
    } else if (intentVerb === "unknown_intent") {
      // 5. RULE RESOLUTION & EXECUTION
      write(`Command unrecognized. Semantic expansion needed...`, "system");
    } else {
      // We hardcode the target as 'clone' for this test
      const result = executeIntent(
        intentVerb,
        "player",
        command.targetId || "clone",
      );
      write(result);
    }

    renderTerminal();
  }
});
