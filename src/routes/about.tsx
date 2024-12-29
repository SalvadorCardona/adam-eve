import { createFileRoute } from "@tanstack/react-router"
import React from "react"

export const Route = createFileRoute("/about")({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/about"!</div>
}
