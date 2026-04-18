import path from "path"
import { defineConfig } from "vitest/config"
import react, { reactCompilerPreset } from "@vitejs/plugin-react"
import { tanstackRouter } from "@tanstack/router-plugin/vite"
import tailwindcss from "@tailwindcss/vite"
import babel from "@rolldown/plugin-babel"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // resourcesPlugin(),
    tanstackRouter({
      routesDirectory: path.resolve(__dirname, "./routes"),
      generatedRouteTree: path.resolve(__dirname, "./routes/routeTree.gen.ts"),
      target: "react",
      autoCodeSplitting: true,
    }),
    react(),
    babel({ presets: [reactCompilerPreset()] }),

    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
      "react-reconciler/constants": "react-reconciler/constants.js",
    },
  },
  // @ts-ignore used for run test well
  test: {
    globals: true,
    server: {
      deps: {
        inline: ["@pixi/react"],
      },
    },
    // setupFiles: "./vitest.setup.ts",
  },
})
