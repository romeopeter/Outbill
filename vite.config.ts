// https://vite.dev/config/
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

/* ------------------------------------------------------ */

export default defineConfig({
  plugins: [tailwindcss(), react()],
  build: {
    rollupOptions: {
      input: {
        ["index.html"]: resolve(__dirname, "index.html"),
        ["index.css"]: resolve(__dirname, "index.css"),
        popup: resolve(__dirname, "src/main.tsx"),
        content: resolve(__dirname, "src/content-scripts/main.ts"),
        background: resolve(__dirname, "src/background-tasks/main.ts"),
      },
      output: {
        entryFileNames: (chunkInfo) => {
          // Place content script directly under dist/
          if (chunkInfo.name === "index.css") {
            return "[name].css";
          }

          if (chunkInfo.name === "content") {
            return "content-scripts/[name].js";
          }

          if (chunkInfo.name === "background") {
            return "background-tasks/[name].js";
          }

          // Default entry for other output in the 'popup' dir
          return "[name].js";
        },
        chunkFileNames: "assets/[name].js",
        assetFileNames: "assets/[name].[ext]",
      },
    },
    outDir: "dist",
  },
  publicDir: "public",
});
