import react from "@vitejs/plugin-react"
import { resolve } from "path"
import { dts } from "rollup-plugin-dts"
import { defineConfig } from "vite"
import checker from "vite-plugin-checker"

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    global: {},
  },
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
      jsxRuntime: "automatic",
      babel: {
        plugins: ["@emotion/babel-plugin"],
      },
    }),
    checker({
      typescript: true,
    }),
  ],
  build: {
    rollupOptions: {
      plugins: [dts()],
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "@components": resolve(__dirname, "src/components"),
      "@assets": resolve(__dirname, "src/assets"),
    },
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
  },
})
