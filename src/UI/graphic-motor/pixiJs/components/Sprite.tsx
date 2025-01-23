import {
  AnimatedSprite,
  Sprite as BaseSprite,
  SpriteOptions,
  Ticker,
  TilingSprite,
} from "pixi.js"
import React, { useEffect, useMemo, useRef } from "react"
import { Vector2Interface } from "@/src/utils/3Dmath/Vector"
import { ContainerChild } from "pixi.js/lib/scene/container/Container"
import {
  usePixiAnimation,
  usePixiInstance,
  useTexture,
} from "@/src/UI/graphic-motor/pixiJs/hook/useTexture"
import { SpritesheetData } from "pixi.js/lib/spritesheet/Spritesheet"
import { createSpritesheetByData } from "@/src/UI/graphic-motor/pixiJs/createFramePixiJs"

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
  const Instance: typeof BaseSprite | typeof TilingSprite = !isTilling
    ? BaseSprite
    : TilingSprite
  const containerRef = useRef<BaseSprite | TilingSprite>(new Instance(options))
  useTexture({
    textureSrc: image,
    container: containerRef.current,
  })

  usePixiAnimation({ container: containerRef.current, animation })

  useEffect(() => {
    if (position && containerRef.current) {
      containerRef.current.x = position.x
      containerRef.current.y = position.y
    }
  }, [position])

  usePixiInstance({ container: containerRef.current })

  return <></>
}

export const SpriteAnimated = ({
  spriteSheetData,
}: SpritePropsInterface & { spriteSheetData: SpritesheetData }) => {
  const animatedSprite = useMemo(() => {
    const spriteSheet = createSpritesheetByData(spriteSheetData)
    return new AnimatedSprite(spriteSheet.animations.main)
  }, [spriteSheetData])

  const container = useMemo(() => {
    return new AnimatedSprite(animatedSprite)
  }, [animatedSprite])

  usePixiInstance({ container })

  useEffect(() => {
    const anim = container
    anim.animationSpeed = 0.2
    anim.play()
    anim.width = 100
    anim.height = 100
    anim.anchor.set(0.5)
    anim.x = 25
    anim.y = 25
    return () => anim.stop()
  }, [container])

  return <></>
}
