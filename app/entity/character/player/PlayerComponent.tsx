import React, { useEffect, useRef, useState } from "react"
import { AnimatedSprite, Assets, Texture } from "pixi.js"
import EntityInterface from "@/packages/game/entity/EntityInterface"
import { Vector2Interface } from "@/packages/math/vector"
import { EntityState } from "@/packages/game/entity/EntityState"
import {
  sageIdleFrames,
  sageWalkFrames,
  SageDirection,
} from "@/app/entity/resource/knowledge/sprites/sage"

function pickDirection(rotation: number | undefined): SageDirection {
  if (rotation === -1) return "west"
  if (rotation === 1) return "east"
  return "south"
}

export const PlayerComponent = React.memo(
  function PlayerComponent({
    entity,
    size,
  }: {
    entity: EntityInterface
    size: Vector2Interface
  }) {
    const direction = pickDirection(entity.rotation)
    const isMoving = entity.state === EntityState.move
    const frames = (isMoving ? sageWalkFrames : sageIdleFrames)[direction]
    const [textures, setTextures] = useState<Texture[] | null>(null)
    const animatedRef = useRef<AnimatedSprite | null>(null)

    useEffect(() => {
      let cancelled = false
      Assets.load(frames).then((loaded: Record<string, Texture>) => {
        if (cancelled) return
        setTextures(frames.map((f) => loaded[f]))
      })
      return () => {
        cancelled = true
      }
    }, [frames])

    useEffect(() => {
      if (!textures || !animatedRef.current) return
      animatedRef.current.play()
    }, [textures])

    if (!textures) return null

    return (
      <pixiAnimatedSprite
        ref={animatedRef}
        textures={textures}
        animationSpeed={0.2}
        width={size.x}
        height={size.y}
      />
    )
  },
  (prev, next) =>
    prev.entity.state === next.entity.state &&
    prev.entity.rotation === next.entity.rotation &&
    prev.size.x === next.size.x &&
    prev.size.y === next.size.y,
)
