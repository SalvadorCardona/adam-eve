import { createFileRoute } from "@tanstack/react-router"
import React from "react"
import ThreeGameComponent from "@/src/UI/three/ThreeGameComponent"
import { gameFactory } from "@/src/game/game/gameFactory"
import { addAction } from "@/src/game/action/addAction"
import { addEntityToGame } from "@/src/game/entity/useCase/addEntityToGame"
import { theDeathActionMetadata } from "@/src/game/action/app/TheDeathActionMetadata"
import { buildRequest } from "@/src/game/entity/app/helper/build-request/BuildRequest"
import { findWorkerCharacterActionMetadata } from "@/src/game/action/app/findWorkerCharacterActionMetadata"

export const Route = createFileRoute("/newGame")({
  component: RouteComponent,
})

function RouteComponent() {
  const game = gameFactory()

  addAction(game.actions, theDeathActionMetadata.factory({ game }))
  addAction(game.actions, findWorkerCharacterActionMetadata.factory({ game }))
  addEntityToGame(game, buildRequest.factory())

  return <ThreeGameComponent game={game}></ThreeGameComponent>
}
