import { createFileRoute, useNavigate } from "@tanstack/react-router"
import React, { useEffect } from "react"
import { gameResource } from "@/packages/game/game/gameResource"
import { gameLoader } from "@/packages/game/game/gameLoader"
import GameComponent from "@/packages/ui/GameComponent"
import { gameFactory } from "@/packages/game/game/GameInterface"

export const Route = createFileRoute("/newGame")({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()

  const game = gameFactory()

  useEffect(() => {
    gameResource.persistItem(gameLoader(game))
    navigate({
      to: "/game/$gameIri",
      params: { gameIri: game["@id"] },
    })
  }, [])

  return <GameComponent game={game}></GameComponent>
}
