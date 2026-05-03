import { createEntityResource } from "@/packages/game/entity/createEntityResource"
import { EntityType } from "@/packages/game/entity/EntityResourceInterface"
import { removeEntityToGame } from "@/packages/game/entity/useCase/removeEntityToGame"
import { addEntityToGame } from "@/packages/game/entity/useCase/addEntityToGame"
import EntityInterface from "@/packages/game/entity/EntityInterface"
import GameInterface from "@/packages/game/game/GameInterface"
import model from "@/app/entity/effect/slash/model.png"

export const slashEntityResource = createEntityResource({
  ["@id"]: "effect/slash",
  label: "Slash",
  entityType: EntityType.effect,
  onFrame: ({ entity, game }) => {
    entity.life--
    if (entity.life <= 0) {
      removeEntityToGame(game, entity)
    }
  },
  asset: {
    model2d: model,
  },
  propriety: {
    health: { maxLife: 8 },
    size: { x: 1.5, y: 1.5, z: 1.5 },
  },
})

export function spawnSlashInFront(
  game: GameInterface,
  entity: EntityInterface,
): void {
  const offset =
    entity.rotation === -1
      ? { x: -1, y: 0 }
      : entity.rotation === 1
        ? { x: 1, y: 0 }
        : { x: 0, y: 1 }

  const slash = slashEntityResource.create({
    game,
    item: {
      position: {
        x: entity.position.x + offset.x,
        y: entity.position.y + offset.y,
        z: entity.position.z,
      },
    },
  })
  addEntityToGame(game, slash)
}
