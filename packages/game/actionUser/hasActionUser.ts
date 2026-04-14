import { ActionUserMetaDataInterface } from "@/packages/game/actionUser/ActionUserMetaDataInterface"
import GameInterface from "@/packages/game/game/GameInterface"

export function hasActionUser(
  game: GameInterface,
  actionUser: ActionUserMetaDataInterface,
): boolean {
  return (
    game.userControl?.currentAction !== undefined &&
    game.userControl.currentAction["@type"] === actionUser["@type"]
  )
}
