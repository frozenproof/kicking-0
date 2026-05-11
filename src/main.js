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

// --- 2. SPAWN LIVE ENTITIES ---
const enemyId = spawn("clone");

write("[ SYMBOLIC RUNTIME ONLINE ]", "system");
renderTerminal();

// --- 3. INPUT PIPELINE ---
DOM.terminalInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    renderTerminal();
  }
});
