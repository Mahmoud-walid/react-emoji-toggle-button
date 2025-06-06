import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dtsPlugin from "vite-plugin-dts";

// https://vite.dev/config/
export default defineConfig({
  base: "/react-emoji-toggle-button/",
  plugins: [react(), dtsPlugin({ tsconfigPath: "./tsconfig.build.json" })],
  build: {
    outDir: "build",
    lib: {
      entry: "./src/index.tsx",
      name: "react-emoji-toggle-button",
      fileName: (format) => (format === "es" ? "index.mjs" : "index.cjs"),
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        exports: "named",
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
