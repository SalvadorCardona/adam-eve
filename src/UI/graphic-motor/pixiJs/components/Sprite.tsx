import { Assets, Sprite as BaseSprite, SpriteOptions } from "pixi.js"
import React, { useEffect, useMemo, useState } from "react"
import { PixiDecorator } from "@/src/UI/graphic-motor/pixiJs/components/PixiDecorator"
import { Vector2Interface } from "@/src/utils/3Dmath/Vector"

interface GraphicsPropsInterface {
  options?: SpriteOptions
  image?: string
  position?: Vector2Interface
}

export const Sprite = ({ options, image, position }: GraphicsPropsInterface) => {
  const [texture, setTexture] = useState(null)
  const _image = image ?? "https://pixijs.io/pixi-react/img/bunny.png"
  useEffect(() => {
    let isMounted = true
    const loadTexture = async () => {
      const loadedTexture = await Assets.load(_image)
      if (isMounted) {
        setTexture(loadedTexture)
      }
    }

    loadTexture()

    return () => {
      isMounted = false
    }
  }, [])

  const container = useMemo(() => {
    if (!texture) return new BaseSprite(options)

    return new BaseSprite({ ...options, texture: texture })
  }, [texture, options, _image])

  useEffect(() => {
    if (position) {
      container.x = position.x
      container.y = position.y
    }
  }, [position])

  return container ? <PixiDecorator container={container}></PixiDecorator> : null
}
