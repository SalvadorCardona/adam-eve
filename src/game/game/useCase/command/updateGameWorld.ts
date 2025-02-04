import EntityInterface, {
  isBuildingEntity,
  isGroundEntity,
} from "@/src/game/entity/EntityInterface"
import GameInterface from "@/src/game/game/GameInterface"
import { updateGroundWithGame } from "@/src/game/entity/useCase/updateGround"
import { entityToBoundingBox } from "@/src/game/entity/transformer/entityToBoundingBox"
import { mergeBounding } from "@/src/utils/math/boudingBox"
import { updateGame } from "@/src/game/game/updateGame"
import { gameToMatrix } from "@/src/game/entity/transformer/gameToMatrix"

export function updateGameWorld(game: GameInterface, entity: EntityInterface): void {
  if (isGroundEntity(entity)) {
    updateGroundWithGame({ game })
  }

  if (isGroundEntity(entity) || isBuildingEntity(entity)) {
    const boundingEntity = entityToBoundingBox(entity)
    game.gameWorld.bounding = mergeBounding(game.gameWorld.bounding, boundingEntity)
    game.gameWorld.entitiesMatrix = gameToMatrix(game)
    updateGame(game, game.gameWorld)
  }
}
