import path from "path"
import { defineConfig } from "vite"
// @ts-ignore used for run test well
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
  // @ts-ignore used for run test well
  test: {
    globals: true,
    // setupFiles: "./vitest.setup.ts",
  },
})
