import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dtsPlugin from "vite-plugin-dts";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), dtsPlugin({ tsconfigPath: "./tsconfig.build.json" })],
  build: {
    outDir: "build",
    lib: {
      entry: "./src/index.tsx",
      name: "react-emoji-input-picker",
      fileName: "index",
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
