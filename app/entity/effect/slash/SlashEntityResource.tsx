import React from "react"
import { Texture } from "pixi.js"
import { createEntityResource } from "@/packages/game/entity/createEntityResource"
import { EntityType } from "@/packages/game/entity/EntityResourceInterface"
import { removeEntityToGame } from "@/packages/game/entity/useCase/removeEntityToGame"
import { addEntityToGame } from "@/packages/game/entity/useCase/addEntityToGame"
import EntityInterface from "@/packages/game/entity/EntityInterface"
import GameInterface from "@/packages/game/game/GameInterface"
import { Vector2Interface } from "@/packages/math/vector"
import { useTexture } from "@/packages/ui/graphic-motor/pixiJs/components/Sprite"
import model from "@/app/entity/effect/slash/model.png"

export type SlashFacing = "north" | "south" | "east" | "west"

export interface SlashEntityInterface extends EntityInterface {
  angle?: number
}

const SlashComponent = ({
  entity,
  size,
}: {
  entity: SlashEntityInterface
  size: Vector2Interface
}) => {
  const texture = useTexture(model) ?? Texture.EMPTY
  return (
    <pixiSprite
      texture={texture}
      x={size.x / 2}
      y={size.y / 2}
      anchor={0.5}
      width={size.x}
      height={size.y}
      rotation={entity.angle ?? 0}
    />
  )
}

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
  component: SlashComponent as any,
  propriety: {
    health: { maxLife: 8 },
    size: { x: 1, y: 1, z: 1 },
  },
})

const FACING_OFFSETS: Record<SlashFacing, { dx: number; dz: number; angle: number }> = {
  north: { dx: 0, dz: -1, angle: 0 },
  south: { dx: 0, dz: 1, angle: Math.PI },
  east: { dx: 1, dz: 0, angle: Math.PI / 2 },
  west: { dx: -1, dz: 0, angle: -Math.PI / 2 },
}

export function spawnSlashInFront(
  game: GameInterface,
  entity: EntityInterface,
  facing: SlashFacing,
): void {
  const { dx, dz, angle } = FACING_OFFSETS[facing]

  const slash = slashEntityResource.create({
    game,
    item: {
      position: {
        x: entity.position.x + dx,
        y: entity.position.y,
        z: entity.position.z + dz,
      },
      angle,
    } as Partial<SlashEntityInterface>,
  })
  addEntityToGame(game, slash)
}
