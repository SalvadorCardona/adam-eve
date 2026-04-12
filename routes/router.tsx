import { createRouter as createTanStackRouter } from "@tanstack/react-router"
import { routeTree } from "./routeTree.gen"
import { NotFound } from "@/components/NotFound"
import React from "react"
import { DefaultCatchBoundary } from "@/components/DefaultCatchBoundary"

const isDev = import.meta.env.MODE === "development"

export function createRouter() {
  const router = createTanStackRouter({
    routeTree,
    defaultPreload: "intent",
    defaultErrorComponent: DefaultCatchBoundary,
    defaultNotFoundComponent: () => <NotFound />,
  })

  if (!isDev) {
    router.basepath = "/adam-eve"
  }

  return router
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>
  }
}
