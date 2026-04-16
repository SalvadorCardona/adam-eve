import GameInterface from "@/packages/game/game/GameInterface"
import { getResource } from "@/packages/resource/ResourceInterface"
import { getByLdTypeIn, updateCollection } from "@/packages/jsonLd/jsonLd"
import { playerMetadata } from "@/packages/game/player/playerMetadata"
import { theDeathActionResource } from "@/app/action/theDeathActionResource"
import { findWorkerCharacterActionMetadata } from "@/app/action/findWorkerCharacterActionMetadata"
import { addAction } from "@/packages/game/action/ActionInterface"
import { ActionResourceInterface } from "@/packages/game/action/ActionResourceInterface"

export function gameLoader(game: GameInterface): GameInterface {
  if (!getByLdTypeIn(game.actions, theDeathActionResource["@type"]).length) {
    const meta = getResource<ActionResourceInterface<any>>(
      theDeathActionResource["@type"],
    )
    addAction(game.actions, meta.createItem({ game }))
  }
  if (
    !getByLdTypeIn(game.actions, findWorkerCharacterActionMetadata["@type"]).length
  ) {
    const meta = getResource<ActionResourceInterface<any>>(
      findWorkerCharacterActionMetadata,
    )
    addAction(game.actions, meta.createItem({ game }))
  }

  updateCollection(game.players, playerMetadata.getPlayer())

  return game
}
