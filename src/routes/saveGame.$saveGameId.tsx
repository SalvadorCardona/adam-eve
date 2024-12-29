import type { ErrorComponentProps } from "@tanstack/react-router"
import { createFileRoute, ErrorComponent } from "@tanstack/react-router"
import { saveGameMetadata } from "@/src/game/saveGame/SaveGameMetadataInterface"
import React from "react"
import ThreeGameComponent from "@/src/UI/three/ThreeGameComponent"
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
  const post = Route.useLoaderData()

  return <ThreeGameComponent game={post.game}></ThreeGameComponent>
}
