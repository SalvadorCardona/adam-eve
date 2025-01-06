import GameInterface from "@/src/game/game/GameInterface"
import { addAction } from "@/src/game/action/addAction"
import { theDeathActionMetadata } from "@/src/game/action/app/TheDeathActionMetadata"
import { getByLdType } from "@/src/container/container"
import { appLdType } from "@/src/AppLdType"
import { getMetaData } from "@/src/game/game/app/configGame"
import { ActionMetadataInterface } from "@/src/game/action/ActionEntityMetadataInterface"

export function gameLoader(game: GameInterface): GameInterface {
  if (!getByLdType(game.actions, theDeathActionMetadata["@type"]).length) {
    addAction(game.actions, theDeathActionMetadata.factory({ game }))
  }
  if (
    !getByLdType(game.actions, appLdType.findWorkerAction).length
  ) {
    const meta = getMetaData<ActionMetadataInterface<any>>(appLdType.findWorkerAction)
    addAction(game.actions, meta.factory({ game }))
  }
  // if (!getByLdType(game.entities, buildRequest["@type"]).length) {
  //   addEntityToGame(game, buildRequest.factory())
  // }

  return game
}
