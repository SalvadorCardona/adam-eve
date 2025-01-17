import {
  Assets,
  Sprite as BaseSprite,
  SpriteOptions,
  Ticker,
  TilingSprite,
} from "pixi.js"
import React, { useEffect, useRef, useState } from "react"
import { PixiDecorator } from "@/src/UI/graphic-motor/pixiJs/components/PixiDecorator"
import { Vector2Interface } from "@/src/utils/3Dmath/Vector"
import { ContainerChild } from "pixi.js/lib/scene/container/Container"
import { usePixiApp } from "@/src/UI/graphic-motor/pixiJs/PixiAppProvider/UsePixiApp"

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
  const [texture, setTexture] = useState(null)
  const _image = image ?? "https://pixijs.io/pixi-react/img/bunny.png"
  const containerRef = useRef<BaseSprite | TilingSprite | null>(null)
  const app = usePixiApp().app

  useEffect(() => {
    let isMounted = true
    const loadTexture = async () => {
      return Assets.load(_image)
    }

    loadTexture().then((e) => {
      if (isMounted) {
        setTexture(e)
      }
    })

    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    const Instance: typeof BaseSprite | typeof TilingSprite = !isTilling
      ? BaseSprite
      : TilingSprite
    if (!containerRef?.current) {
      containerRef.current = new Instance(options)
    }
    if (containerRef.current && texture) {
      containerRef.current.texture = texture
    }
  }, [texture, options, _image])

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

  return containerRef.current ? (
    <PixiDecorator container={containerRef.current}></PixiDecorator>
  ) : null
}
