import EntityInterface, { isGroundEntity } from "@/src/game/entity/EntityInterface"
import GameInterface from "@/src/game/game/GameInterface"
import { updateGroundWithGame } from "@/src/game/entity/useCase/updateGround"
import { ContainerAction, updateContainer } from "@/src/utils/jsonLd/jsonLd"
import { entityToBoundingBox } from "@/src/game/entity/transformer/entityToBoundingBox"
import { mergeBounding } from "@/src/utils/math/boudingBox"
import { updateGame } from "@/src/game/game/updateGame"

export function updateEntityInGame(
  game: GameInterface,
  entity: EntityInterface,
  action: ContainerAction = ContainerAction.update,
): void {
  updateContainer(game.entities, entity, action)

  if (isGroundEntity(entity)) {
    updateGroundWithGame({ game })
  }
  
  const boundingEntity = entityToBoundingBox(entity)
  const newGameSize = mergeBounding(game.gameSize, boundingEntity)
  game.gameSize = { ...game.gameSize, ...newGameSize }
  updateGame(game, game.gameSize)
}
