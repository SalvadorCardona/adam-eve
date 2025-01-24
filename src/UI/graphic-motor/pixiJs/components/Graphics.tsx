import { Graphics as BaseGraphics } from "pixi.js"
import { GraphicsContext } from "pixi.js/lib/scene/graphics/shared/GraphicsContext"
import { GraphicsOptions } from "pixi.js/lib/scene/graphics/shared/Graphics"
import React, { useMemo } from "react"
import { usePixiInstance } from "@/src/UI/graphic-motor/pixiJs/hook/useTexture"

interface GraphicsPropsInterface {
  options?: GraphicsOptions | GraphicsContext
  draw?: (graphic: BaseGraphics) => void
}

export const Graphics = ({ options, draw }: GraphicsPropsInterface) => {
  const container = useMemo(() => {
    const graphic = new BaseGraphics(options)

    if (draw) {
      draw(graphic)
    }

    return graphic
  }, [draw, options])

  usePixiInstance({ container })

  return <></>
}
