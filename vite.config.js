import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    {
      name: "block-model-fallback",
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          // If Transformers.js asks for a missing model file...
          if (req.url.includes("/models/")) {
            res.statusCode = 404; // Return a real 404 Not Found error
            res.end("Not Found");
            return;
          }
          next();
        });
      },
    },
  ],
});
