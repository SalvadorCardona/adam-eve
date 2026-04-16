import { ActionUserResource } from "@/packages/game/actionUser/ActionUserResource"
import GameInterface from "@/packages/game/game/GameInterface"

export function hasActionUser(
  game: GameInterface,
  actionUser: ActionUserResource,
): boolean {
  return (
    game.userControl?.currentAction !== undefined &&
    game.userControl.currentAction["@type"] === actionUser["@type"]
  )
}
