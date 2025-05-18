import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  root: "example",
  base: "/react-emoji-picker-button/",
  plugins: [react()],
  build: {
    outDir: "../docs",
    emptyOutDir: true,
  },
  server: {
    port: 3000,
  },
});
