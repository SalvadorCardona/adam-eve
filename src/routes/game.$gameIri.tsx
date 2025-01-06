import type { ErrorComponentProps } from "@tanstack/react-router"
import { createFileRoute, ErrorComponent } from "@tanstack/react-router"
import React from "react"
import ThreeGameComponent from "@/src/UI/three/ThreeGameComponent"
import { NotFound } from "@/components/NotFound"
import { gameMetadata } from "@/src/game/game/GameMetaData"

export const Route = createFileRoute("/game/$gameIri")({
  loader: ({ params: { gameIri } }) => gameMetadata.getItem(gameIri),
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

  return <ThreeGameComponent game={game}></ThreeGameComponent>
}
