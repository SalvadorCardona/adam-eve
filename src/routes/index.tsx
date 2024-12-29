import { createFileRoute } from "@tanstack/react-router"
import React from "react"
import ThreeGameComponent from "@/src/UI/three/ThreeGameComponent"

export const Route = createFileRoute("/")({
  component: Home,
})

function Home() {
  return <ThreeGameComponent></ThreeGameComponent>
}
