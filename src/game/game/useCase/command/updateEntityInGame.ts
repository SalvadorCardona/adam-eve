import EntityInterface from "@/src/game/entity/EntityInterface"
import GameInterface from "@/src/game/game/GameInterface"
import { ContainerAction, updateContainer } from "@/src/utils/jsonLd/jsonLd"
import { updateGameWorld } from "@/src/game/game/useCase/command/updateGameWorld"

export function updateEntityInGame(
  game: GameInterface,
  entity: EntityInterface,
  action: ContainerAction = ContainerAction.update,
): void {
  updateContainer(game.entities, entity, action)
  updateGameWorld(game, entity)
}
