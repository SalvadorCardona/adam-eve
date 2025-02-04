import GameInterface from "@/src/game/game/GameInterface"
import EntityInterface from "@/src/game/entity/EntityInterface"
import { updateEntityInGame } from "@/src/game/game/useCase/command/updateEntityInGame"
import { ContainerAction } from "@/src/utils/jsonLd/jsonLd"

export function addEntityToGame(game: GameInterface, entity: EntityInterface): void {
  updateEntityInGame(game, entity, ContainerAction.create)
}
