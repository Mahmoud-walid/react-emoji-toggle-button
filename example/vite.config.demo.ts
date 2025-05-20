import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  root: "example",
  base: "/react-emoji-toggle-button/",
  plugins: [react()],
  build: {
    outDir: "../docs",
    emptyOutDir: true,
  },
  server: {
    port: 3000,
  },
});
