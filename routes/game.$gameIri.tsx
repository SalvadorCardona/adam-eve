import type { ErrorComponentProps } from "@tanstack/react-router"
import { createFileRoute, ErrorComponent } from "@tanstack/react-router"
import React from "react"
import GameComponent from "@/src/UI/GameComponent"
import { NotFound } from "@/components/NotFound"
import { gameResource } from "@/src/game/game/gameResource"

export const Route = createFileRoute("/game/$gameIri")({
  loader: ({ params: { gameIri } }) => gameResource.getItem(gameIri),
  errorComponent: SaveGameErrorComponent,
  component: SaveGameComponent,
  notFoundComponent: () => {
    return <NotFound>Save Game not found</NotFound>
  },
})

export function SaveGameErrorComponent({ error }: ErrorComponentProps) {
  return <ErrorComponent error={error} />
}

function SaveGameComponent() {
  const game = Route.useLoaderData()

  if (!game) {
    throw new Error("Game not found")
  }

  return <GameComponent game={game}></GameComponent>
}
