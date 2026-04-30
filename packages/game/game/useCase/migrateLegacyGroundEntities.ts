import GameInterface from "@/packages/game/game/GameInterface"
import { isGroundEntity } from "@/packages/game/entity/EntityInterface"
import { applyGroundToMatrices } from "@/packages/game/entity/transformer/applyEntityToMatrix"
import { entityToBoundingBox } from "@/packages/game/entity/transformer/entityToBoundingBox"
import { mergeBounding } from "@/packages/math/boudingBox"
import { ContainerAction } from "@/packages/jsonLd/jsonLd"

export function migrateLegacyGroundEntities(game: GameInterface): void {
  const groundIds = Object.keys(game.entities).filter((id) =>
    isGroundEntity(game.entities[id]),
  )
  if (groundIds.length === 0) return

  for (const id of groundIds) {
    const ground = game.entities[id]
    game.gameWorld.bounding = mergeBounding(
      game.gameWorld.bounding,
      entityToBoundingBox(ground),
    )
    applyGroundToMatrices(game, ground, ContainerAction.create)
    delete game.entities[id]
  }
}
