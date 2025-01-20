import { createFileRoute, useNavigate } from "@tanstack/react-router"
import React, { useEffect } from "react"
import { gameMetadata } from "@/src/game/game/GameMetaData"
import { gameLoader } from "@/src/game/game/gameLoader"
import GameComponent from "@/src/UI/GameComponent"
import { gameFactory } from "@/src/game/game/GameInterface"

export const Route = createFileRoute("/newGame")({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()

  const game = gameFactory()

  useEffect(() => {
    gameMetadata.persistItem(gameLoader(game))
    navigate({
      to: "/game/$gameIri",
      params: { gameIri: game["@id"] },
    })
  }, [])

  return <GameComponent game={game}></GameComponent>
}
