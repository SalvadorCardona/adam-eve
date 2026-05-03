import React from "react"
import { Sprite } from "@/packages/ui/graphic-motor/pixiJs/components/Sprite"
import { Vector2Interface } from "@/packages/math/vector"
import {
  FLOATING_TEXT_LIFE,
  FloatingTextEntityInterface,
} from "./FloatingTextEntityResource"

interface FloatingTextProps {
  entity: FloatingTextEntityInterface
  size: Vector2Interface
}

export const FloatingTextComponent = ({ entity, size }: FloatingTextProps) => {
  const alpha = Math.max(0, Math.min(1, entity.life / FLOATING_TEXT_LIFE))
  const iconSize = Math.min(size.x, size.y)
  const text = entity.text ?? "+1"

  return (
    <pixiContainer alpha={alpha}>
      {entity.iconAsset && (
        <Sprite
          image={entity.iconAsset}
          options={{ width: iconSize, height: iconSize }}
        />
      )}
      <pixiText
        text={text}
        x={iconSize}
        y={0}
        style={{
          fontSize: Math.round(iconSize * 0.7),
          fontWeight: "bold",
          fill: 0xffffff,
          stroke: { color: 0x000000, width: 3 },
        }}
      />
    </pixiContainer>
  )
}
