import type { ErrorComponentProps } from "@tanstack/react-router"
import { createFileRoute, ErrorComponent } from "@tanstack/react-router"
import React from "react"
import ThreeGameComponent from "@/src/UI/three/ThreeGameComponent"
import { NotFound } from "@/components/NotFound"
import { mockGames } from "@/src/game/mockGame/mockGame"

export const Route = createFileRoute("/mock/$mockName")({
  loader: ({ params: { mockName } }) => {
    if (typeof mockName === "string" && mockGames[mockName]) {
      return mockGames[mockName]
    }

    throw new Error("Not mock game")
  },
  errorComponent: SaveGameErrorComponent,
  component: SaveGameComponent,
  notFoundComponent: () => {
    return <NotFound>Not mock game</NotFound>
  },
})

export function SaveGameErrorComponent({ error }: ErrorComponentProps) {
  return <ErrorComponent error={error} />
}

function SaveGameComponent() {
  const newMockGame = Route.useLoaderData()

  if (!newMockGame) {
    throw new Error("Game not found")
  }
  return <ThreeGameComponent game={newMockGame}></ThreeGameComponent>
}
