import { createFileRoute } from "@tanstack/react-router"
import React from "react"
import ThreeGameComponent from "@/src/UI/three/ThreeGameComponent"
import { gameFactory } from "@/src/game/game/gameFactory"

export const Route = createFileRoute("/newGame")({
  component: RouteComponent,
})

function RouteComponent() {
  return <ThreeGameComponent game={gameFactory()}></ThreeGameComponent>
}
