import GameInterface from "@/src/game/game/GameInterface"
import { addAction } from "@/src/game/action/addAction"
import { appLdType } from "@/src/AppLdType"
import { ActionMetadataInterface } from "@/src/game/action/ActionEntityMetadataInterface"
import { getMetaData } from "@/src/game/game/app/getMetaData"
import { getByLdTypeIn, updateCollection } from "@/src/utils/jsonLd/jsonLd"
import { playerMetadata } from "@/src/game/player/SaveGameMetadataInterface"

export function gameLoader(game: GameInterface): GameInterface {
  if (!getByLdTypeIn(game.actions, appLdType.theDeathAction).length) {
    const meta = getMetaData<ActionMetadataInterface<any>>(appLdType.theDeathAction)
    addAction(game.actions, meta.factory({ game }))
  }
  if (!getByLdTypeIn(game.actions, appLdType.findWorkerAction).length) {
    const meta = getMetaData<ActionMetadataInterface<any>>(
      appLdType.findWorkerAction,
    )
    addAction(game.actions, meta.factory({ game }))
  }

  updateCollection(game.players, playerMetadata.getPlayer())

  return game
}
