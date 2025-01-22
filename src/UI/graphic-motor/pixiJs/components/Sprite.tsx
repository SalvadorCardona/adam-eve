import { Sprite as BaseSprite, SpriteOptions, Ticker, TilingSprite } from "pixi.js"
import React, { useEffect, useRef } from "react"
import { Vector2Interface } from "@/src/utils/3Dmath/Vector"
import { ContainerChild } from "pixi.js/lib/scene/container/Container"
import { usePixiApp } from "@/src/UI/graphic-motor/pixiJs/PixiAppProvider/UsePixiApp"
import {
  usePixiInstance,
  useTexture,
} from "@/src/UI/graphic-motor/pixiJs/hook/useTexture"

interface SpritePropsInterface {
  options?: SpriteOptions
  image?: string
  position?: Vector2Interface
  isTilling?: boolean
  animation?: SpriteAnimation
}

export type SpriteAnimation = (e: Ticker, item: ContainerChild) => void

export const Sprite = ({
  options,
  image,
  position,
  isTilling,
  animation,
}: SpritePropsInterface) => {
  const _image = image ?? "https://pixijs.io/pixi-react/img/bunny.png"
  const Instance: typeof BaseSprite | typeof TilingSprite = !isTilling
    ? BaseSprite
    : TilingSprite
  const containerRef = useRef<BaseSprite | TilingSprite>(new Instance(options))
  const app = usePixiApp().app
  useTexture({
    textureSrc: _image,
    container: containerRef.current,
  })

  useEffect(() => {
    if (!animation || !containerRef.current) return

    const animate = (e: Ticker) => {
      animation(e, containerRef.current as BaseSprite)
    }

    app.ticker.add(animate)

    return () => {
      app.ticker.remove(animate)
    }
  }, [animation])

  useEffect(() => {
    if (position && containerRef.current) {
      containerRef.current.x = position.x
      containerRef.current.y = position.y
    }
  }, [position])

  usePixiInstance({ container: containerRef.current })

  return <></>
}
