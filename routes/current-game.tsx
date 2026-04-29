import { createFileRoute } from "@tanstack/react-router"
import React from "react"
import GameComponent from "@/packages/ui/GameComponent"
import { gameFactory } from "@/packages/game/game/GameInterface"
import { generateIsland } from "@/app/game/generateIsland"

export const Route = createFileRoute("/current-game")({
  component: RouteComponent,
})

function RouteComponent() {
  const game = generateIsland(gameFactory())

  return <GameComponent game={game}></GameComponent>
}
