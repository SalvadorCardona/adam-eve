/// <reference types="vitest" />
/// <reference types="vitest/config" />
/// <reference types="vite/client" />
import path from "path"
import { defineConfig } from "vite"
import { TanStackRouterVite } from "@tanstack/router-plugin/vite"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [TanStackRouterVite(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
    },
  },
  test: {
    globals: true,
    // setupFiles: "./vitest.setup.ts",
  },
})
