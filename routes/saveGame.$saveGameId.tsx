import type { ErrorComponentProps } from "@tanstack/react-router"
import { createFileRoute, ErrorComponent } from "@tanstack/react-router"
import { saveGameMetadata } from "@/src/game/saveGame/SaveGameMetadataInterface"
import React from "react"
import GameComponent from "@/src/UI/GameComponent"
import { NotFound } from "@/components/NotFound"

export const Route = createFileRoute("/saveGame/$saveGameId")({
  loader: ({ params: { saveGameId } }) => saveGameMetadata.getItem(saveGameId),
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
  const saveGame = Route.useLoaderData()

  if (!saveGame) {
    throw new Error("Game not found")
  }

  return <GameComponent game={saveGame.game}></GameComponent>
}
