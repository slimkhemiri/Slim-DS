import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    // Prevent "Invalid hook call" in monorepos when deps resolve via different symlink paths
    dedupe: ["react", "react-dom"]
  },
  server: {
    port: 5173
  },
  publicDir: "public",
  build: {
    assetsDir: "assets",
    copyPublicDir: true
  }
});

