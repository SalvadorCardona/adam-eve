import { createRouter as createTanStackRouter } from "@tanstack/react-router"
import { routeTree } from "./routeTree.gen"
import { NotFound } from "@/components/NotFound"
import React from "react"
import { DefaultCatchBoundary } from "@/components/DefaultCatchBoundary"
import { config } from "@/src/app/config"

export function createRouter() {
  const router = createTanStackRouter({
    routeTree,
    defaultPreload: "intent",
    defaultErrorComponent: DefaultCatchBoundary,
    defaultNotFoundComponent: () => <NotFound />,
  })

  if (!config.isDev) {
    router.basepath = "/adam-eve"
  }

  return router
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>
  }
}
