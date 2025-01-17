import GameInterface from "@/src/game/game/GameInterface"
import { addAction } from "@/src/game/action/addAction"
import { getByLdType } from "@/src/container/container"
import { appLdType } from "@/src/AppLdType"
import { ActionMetadataInterface } from "@/src/game/action/ActionEntityMetadataInterface"
import { getMetaData } from "@/src/game/game/app/getMetaData"

export function gameLoader(game: GameInterface): GameInterface {
  if (!getByLdType(game.actions, appLdType.theDeathAction).length) {
    const meta = getMetaData<ActionMetadataInterface<any>>(appLdType.theDeathAction)
    addAction(game.actions, meta.factory({ game }))
  }
  if (!getByLdType(game.actions, appLdType.findWorkerAction).length) {
    const meta = getMetaData<ActionMetadataInterface<any>>(
      appLdType.findWorkerAction,
    )
    addAction(game.actions, meta.factory({ game }))
  }

  return game
}
