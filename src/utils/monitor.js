export function startMonitor(elementId) {
  const monitorView = document.getElementById(elementId);
  let fps = 0;
  let frames = 0;
  let lastTime = performance.now();

  function update() {
    const now = performance.now();
    frames++;

    // Update every 500ms
    if (now >= lastTime + 500) {
      fps = Math.round((frames * 1000) / (now - lastTime));
      frames = 0;
      lastTime = now;

      // Memory usage (Chrome/Chromium only)
      let mem = "N/A";
      if (performance.memory) {
        mem = Math.round(performance.memory.usedJSHeapSize / 1048576) + " MB";
      }

      monitorView.innerHTML = `FPS: ${fps}<br>MEM: ${mem}`;
    }

    requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}
