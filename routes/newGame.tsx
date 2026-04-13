import { createFileRoute, useNavigate } from "@tanstack/react-router"
import React, { useEffect } from "react"
import { gameResource } from "@/src/game/game/gameResource"
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
    gameResource.persistItem(gameLoader(game))
    navigate({
      to: "/game/$gameIri",
      params: { gameIri: game["@id"] },
    })
  }, [])

  return <GameComponent game={game}></GameComponent>
}
