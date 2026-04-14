import EntityInterface, {
  isBuildingEntity,
  isGroundEntity,
} from "@/packages/game/entity/EntityInterface"
import GameInterface from "@/packages/game/game/GameInterface"
import { updateGroundWithGame } from "@/packages/game/entity/useCase/updateGround"
import { entityToBoundingBox } from "@/packages/game/entity/transformer/entityToBoundingBox"
import { mergeBounding } from "@/packages/math/boudingBox"
import { updateGame } from "@/packages/game/game/updateGame"
import { gameToMatrix } from "@/packages/game/entity/transformer/gameToMatrix"

export function updateGameWorld(game: GameInterface, entity: EntityInterface): void {
  if (isGroundEntity(entity) || isBuildingEntity(entity)) {
    const boundingEntity = entityToBoundingBox(entity)
    game.gameWorld.bounding = mergeBounding(game.gameWorld.bounding, boundingEntity)
    game.gameWorld.entitiesMatrix = gameToMatrix(game)
    updateGame(game, game.gameWorld)
  }

  if (isGroundEntity(entity)) {
    updateGroundWithGame({ game })
  }
}
