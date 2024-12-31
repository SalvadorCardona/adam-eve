import EntityInterface from "@/src/game/entity/EntityInterface"
import GameInterface from "@/src/game/game/GameInterface"
import { updateContainer } from "@/src/container/container"
import { updateGroundWithGame } from "@/src/game/entity/entityGround/updateGround"
import { gameCalculated } from "@/src/game/game/gameCalculated"

export function updateEntityInGame(
  game: GameInterface,
  entity: EntityInterface,
  action: "update" | "remove" | "create" = "update",
): void {
  updateContainer(game.entities, entity, action)
  updateGroundWithGame({ game })
  game.gameCalculated = gameCalculated(game)
}
