export const DOM = {
  terminalOutput: null,
  terminalInput: null,

  aiLog: null,
  worldView: null,
  debugView: null,
};

export function initializeDOM() {
  DOM.terminalOutput = document.getElementById("terminal-output");

  DOM.terminalInput = document.getElementById("terminal-input");

  DOM.aiLog = document.getElementById("ai-log");

  DOM.worldView = document.getElementById("world-view");

  DOM.debugView = document.getElementById("debug-view");
}
