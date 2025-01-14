import { Graphics as BaseGraphics } from "pixi.js"
import { GraphicsContext } from "pixi.js/lib/scene/graphics/shared/GraphicsContext"
import { GraphicsOptions } from "pixi.js/lib/scene/graphics/shared/Graphics"
import { usePixiApp } from "@/src/UI/graphic-motor/pixiJs/components/UsePixiApp"
import { useEffect, useMemo } from "react"

interface GraphicsPropsInterface {
  options?: GraphicsOptions | GraphicsContext
  draw?: (graphic: BaseGraphics) => void
}

export const Graphics = ({ options, draw }: GraphicsPropsInterface) => {
  const app = usePixiApp().app
  const graphic = useMemo(() => {
    return new BaseGraphics(options)
  }, [])

  useEffect(() => {
    if (draw) {
      draw(graphic)
    }
    app?.stage.addChild(graphic)

    return () => {
      app?.stage.removeChild(graphic)
    }
  }, [graphic])

  return
}
