export const terminal = {
  lines: [],
};
// import { terminal } from "./terminal.js";
import { DOM } from "../ui/dom.js";

export function renderTerminal() {
  DOM.terminalOutput.innerHTML = "";

  for (const line of terminal.lines) {
    const p = document.createElement("p");

    p.textContent = line.text;

    if (line.type === "system") {
      p.classList.add("system-msg");
    }

    DOM.terminalOutput.appendChild(p);
  }

  DOM.terminalOutput.scrollTop = DOM.terminalOutput.scrollHeight;
}

export function write(text, type = "normal") {
  terminal.lines.push({
    type,
    text,
  });
}
