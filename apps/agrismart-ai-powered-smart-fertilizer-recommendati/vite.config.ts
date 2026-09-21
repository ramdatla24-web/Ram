import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { makoData } from "@makoai/app-sdk/vite";

export default defineConfig({
  plugins: [react(), tailwindcss(), makoData()],
  base: "./",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true,
    allowedHosts: [".e2b.app"],
  },
});
