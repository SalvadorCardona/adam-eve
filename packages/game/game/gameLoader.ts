import GameInterface from "@/packages/game/game/GameInterface"
import { ActionMetadataInterface } from "@/packages/game/action/ActionEntityMetadataInterface"
import { getResource } from "@/packages/metadata/MetadataInterface"
import { getByLdTypeIn, updateCollection } from "@/packages/jsonLd/jsonLd"
import { playerMetadata } from "@/packages/game/player/playerMetadata"
import { theDeathActionResource } from "@/packages/game/action/app/theDeathActionResource"
import { findWorkerCharacterActionMetadata } from "@/packages/game/action/app/findWorkerCharacterActionMetadata"
import { addAction } from "@/packages/game/action/ActionInterface"

export function gameLoader(game: GameInterface): GameInterface {
  if (!getByLdTypeIn(game.actions, theDeathActionResource["@type"]).length) {
    const meta = getResource<ActionMetadataInterface<any>>(
      theDeathActionResource["@type"],
    )
    addAction(game.actions, meta.factory({ game }))
  }
  if (
    !getByLdTypeIn(game.actions, findWorkerCharacterActionMetadata["@type"]).length
  ) {
    const meta = getResource<ActionMetadataInterface<any>>(
      findWorkerCharacterActionMetadata,
    )
    addAction(game.actions, meta.factory({ game }))
  }

  updateCollection(game.players, playerMetadata.getPlayer())

  return game
}
