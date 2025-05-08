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
        popup: resolve(__dirname, "src/popup.tsx"),
        panels: resolve(__dirname, "src/main.tsx"),
        script: resolve(__dirname, "src/content-scripts/script.ts"),
        task: resolve(__dirname, "src/background-tasks/task.ts"),
      },
      output: {
        entryFileNames: (chunkInfo) => {
          // Place content script directly under dist/
          if (chunkInfo.name === "index.css") {
            return "[name].css";
          }

          if (chunkInfo.name === "popup") {
            return "popup/[name].js";
          }

          if (chunkInfo.name === "panels") {
            return "panels/[name].js";
          }

          if (chunkInfo.name === "script") {
            return "content-scripts/[name].js";
          }

          if (chunkInfo.name === "task") {
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
  resolve: {
    alias: {
      "@components": resolve(__dirname, "src/components"),
      "@utils": resolve(__dirname, "src/utils"),
      "@hooks": resolve(__dirname, "src/panels/hooks"),
    },
  },
  publicDir: "public",
});
