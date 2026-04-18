import GameInterface from "@/packages/game/game/GameInterface"
import { getResource } from "@/packages/resource/ResourceInterface"
import { getByLdTypeIn, updateCollection } from "@/packages/jsonLd/jsonLd"
import { playerMetadata } from "@/packages/game/player/playerMetadata"
import { theDeathActionResource } from "@/app/action/theDeathActionResource"
import { findWorkerCharacterActionMetadata } from "@/app/action/findWorkerCharacterActionMetadata"
import { ActionResourceInterface } from "@/packages/game/action/ActionResourceInterface"
import { addAction } from "@/packages/game/action/AddAction"

export function gameLoader(game: GameInterface): GameInterface {
  if (!getByLdTypeIn(game.actions, theDeathActionResource["@id"]).length) {
    const meta = getResource<ActionResourceInterface<any>>(
      theDeathActionResource["@type"],
    )
    addAction(game.actions, meta.create({ game }))
  }
  if (
    !getByLdTypeIn(game.actions, findWorkerCharacterActionMetadata["@type"]!).length
  ) {
    const meta = getResource<ActionResourceInterface<any>>(
      findWorkerCharacterActionMetadata,
    )
    addAction(game.actions, meta.create({ game }))
  }

  updateCollection(game.players, playerMetadata.getPlayer())

  return game
}
