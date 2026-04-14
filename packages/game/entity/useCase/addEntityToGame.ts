import GameInterface from "@/packages/game/game/GameInterface"
import EntityInterface from "@/packages/game/entity/EntityInterface"
import { updateEntityInGame } from "@/packages/game/game/useCase/command/updateEntityInGame"
import { ContainerAction } from "@/packages/jsonLd/jsonLd"

export function addEntityToGame(game: GameInterface, entity: EntityInterface): void {
  updateEntityInGame(game, entity, ContainerAction.create)
}
