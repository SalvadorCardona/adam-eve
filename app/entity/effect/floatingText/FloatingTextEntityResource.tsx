import { createEntityResource } from "@/packages/game/entity/createEntityResource"
import {
  EntityResourceInterface,
  EntityType,
} from "@/packages/game/entity/EntityResourceInterface"
import EntityInterface from "@/packages/game/entity/EntityInterface"
import { removeEntityToGame } from "@/packages/game/entity/useCase/removeEntityToGame"
import { updateEntityInGame } from "@/packages/game/game/useCase/command/updateEntityInGame"
import { addEntityToGame } from "@/packages/game/entity/useCase/addEntityToGame"
import { Vector3Interface } from "@/packages/math/vector"
import GameInterface from "@/packages/game/game/GameInterface"
import { FloatingTextComponent } from "./FloatingTextComponent"

export interface FloatingTextEntityInterface extends EntityInterface {
  iconAsset?: string
  text?: string
}

export const FLOATING_TEXT_LIFE = 45
const RISE_PER_TICK = 0.04

export const floatingTextEntityResource =
  createEntityResource<EntityResourceInterface<FloatingTextEntityInterface>>({
    ["@id"]: "effect/floatingText",
    label: "Texte flottant",
    entityType: EntityType.effect,
    propriety: {
      health: {
        maxLife: FLOATING_TEXT_LIFE,
      },
      size: {
        x: 0.6,
        y: 0.6,
        z: 0.6,
      },
    },
    component: FloatingTextComponent,
    onFrame: ({ entity, game }) => {
      entity.life--
      if (entity.life <= 0) {
        removeEntityToGame(game, entity)
        return
      }
      entity.position.z -= RISE_PER_TICK
      updateEntityInGame(game, entity)
    },
  })

export function spawnFloatingText(
  game: GameInterface,
  position: Vector3Interface,
  iconAsset: string | undefined,
  text: string = "+1",
): void {
  const entity = floatingTextEntityResource.create({
    game,
    item: {
      position: { x: position.x, y: position.y, z: position.z },
      iconAsset,
      text,
    },
  })
  addEntityToGame(game, entity)
}
