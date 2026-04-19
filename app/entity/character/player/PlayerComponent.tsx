import React, { useMemo } from "react"
import { Sprite } from "@/packages/ui/graphic-motor/pixiJs/components/Sprite"
import EntityInterface from "@/packages/game/entity/EntityInterface"
import { Vector2Interface } from "@/packages/math/vector"
import healthySrc from "./player_healthy.svg?url"
import hurtSrc from "./player_hurt.svg?url"
import criticalSrc from "./player_critical.svg?url"

const PLAYER_MAX_LIFE = 100

function getPlayerSprite(life: number): string {
  const ratio = life / PLAYER_MAX_LIFE
  if (ratio > 0.5) return healthySrc
  if (ratio > 0.25) return hurtSrc
  return criticalSrc
}

export const PlayerComponent = React.memo(
  function PlayerComponent({ entity, size }: { entity: EntityInterface; size: Vector2Interface }) {
    const spriteSrc = useMemo(() => getPlayerSprite(entity.life), [entity.life])

    return (
      <Sprite
        image={spriteSrc}
        options={{ width: size.x, height: size.y }}
      />
    )
  },
  (prev, next) =>
    prev.entity.life === next.entity.life &&
    prev.size.x === next.size.x &&
    prev.size.y === next.size.y,
)
