import GameInterface from "@/src/game/game/GameInterface"
import { addAction } from "@/src/game/action/addAction"
import { ActionMetadataInterface } from "@/src/game/action/ActionEntityMetadataInterface"
import { getMetaData } from "@/src/game/game/app/getMetaData"
import { getByLdTypeIn, updateCollection } from "@/src/utils/jsonLd/jsonLd"
import { playerMetadata } from "@/src/game/player/playerMetadata"
import { theDeathActionMetadata } from "@/src/game/action/app/TheDeathActionMetadata"
import { findWorkerCharacterActionMetadata } from "@/src/game/action/app/findWorkerCharacterActionMetadata"

export function gameLoader(game: GameInterface): GameInterface {
  if (!getByLdTypeIn(game.actions, theDeathActionMetadata["@type"]).length) {
    const meta = getMetaData<ActionMetadataInterface<any>>(
      theDeathActionMetadata["@type"],
    )
    addAction(game.actions, meta.factory({ game }))
  }
  if (
    !getByLdTypeIn(game.actions, findWorkerCharacterActionMetadata["@type"]).length
  ) {
    const meta = getMetaData<ActionMetadataInterface<any>>(
      findWorkerCharacterActionMetadata,
    )
    addAction(game.actions, meta.factory({ game }))
  }

  updateCollection(game.players, playerMetadata.getPlayer())

  return game
}
