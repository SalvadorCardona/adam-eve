import { ActionUserMetaDataInterface } from "@/src/game/actionUser/ActionUserMetaDataInterface"
import GameInterface from "@/src/game/game/GameInterface"

export function hasActionUser(
  game: GameInterface,
  actionUser: ActionUserMetaDataInterface,
): boolean {
  return (
    game.userControl?.currentAction !== undefined &&
    game.userControl.currentAction["@type"] === actionUser["@type"]
  )
}
