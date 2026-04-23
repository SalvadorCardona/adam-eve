import React, { useCallback } from "react"
import {
  Graphics as BaseGraphics,
  GraphicsContext,
  GraphicsOptions,
} from "pixi.js"

interface GraphicsPropsInterface {
  options?: GraphicsOptions | GraphicsContext
  draw?: (graphic: BaseGraphics) => void
}

export const Graphics = ({ options, draw }: GraphicsPropsInterface) => {
  const handleDraw = useCallback(
    (g: BaseGraphics) => {
      g.clear()
      draw?.(g)
    },
    [draw],
  )

  const x =
    options && "position" in options && options.position
      ? (options.position as { x: number }).x
      : undefined
  const y =
    options && "position" in options && options.position
      ? (options.position as { y: number }).y
      : undefined

  return <pixiGraphics draw={handleDraw} x={x} y={y} />
}
