import GameInterface from "@/src/game/game/GameInterface"
import { addAction } from "@/src/game/action/addAction"
import { theDeathActionMetadata } from "@/src/game/action/app/TheDeathActionMetadata"
import { findWorkerCharacterActionMetadata } from "@/src/game/action/app/findWorkerCharacterActionMetadata"
import { getByLdType } from "@/src/container/container"

export function gameLoader(game: GameInterface): GameInterface {
  if (!getByLdType(game.actions, theDeathActionMetadata["@type"]).length) {
    addAction(game.actions, theDeathActionMetadata.factory({ game }))
  }
  if (
    !getByLdType(game.actions, findWorkerCharacterActionMetadata["@type"]).length
  ) {
    addAction(game.actions, findWorkerCharacterActionMetadata.factory({ game }))
  }
  // if (!getByLdType(game.entities, buildRequest["@type"]).length) {
  //   addEntityToGame(game, buildRequest.factory())
  // }

  return game
}
