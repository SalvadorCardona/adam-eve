import {
  AnimatedSprite,
  Sprite as BaseSprite,
  SpriteOptions,
  Ticker,
  TilingSprite,
} from "pixi.js"
import React, { useEffect, useMemo, useRef, useState } from "react"
import { Vector2Interface } from "@/packages/math/vector"
import {
  usePixiAnimation,
  usePixiInstance,
  useTexture,
} from "@/packages/ui/graphic-motor/pixiJs/hook/useTexture"
import { SpritesheetData } from "pixi.js"
import { createSpritesheetByData } from "@/packages/ui/graphic-motor/pixiJs/createFramePixiJs"

interface SpritePropsInterface {
  options?: SpriteOptions
  image?: string
  position?: Vector2Interface
  isTilling?: boolean
  animation?: SpriteAnimation
  rotation?: number
}

export type SpriteAnimation = (e: Ticker, item: TilingSprite | BaseSprite) => void

export const Sprite = ({
  options,
  image,
  position,
  isTilling,
  animation,
  rotation,
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
    if (position) {
      containerRef.current.x = position.x
      containerRef.current.y = position.y
    }
  }, [position])

  useEffect(() => {
    if (rotation) {
      containerRef.current.rotation = rotation
    }
  }, [rotation])

  usePixiInstance({ container: containerRef.current })

  return <></>
}

export const SpriteAnimated = ({
  spriteSheetData,
}: SpritePropsInterface & { spriteSheetData: SpritesheetData }) => {
  const [animatedSprite, setAnimatedSprite] = useState<AnimatedSprite | null>(
    null,
  )

  useEffect(() => {
    let cancelled = false
    createSpritesheetByData(spriteSheetData).then((spriteSheet) => {
      if (cancelled) return
      setAnimatedSprite(new AnimatedSprite(spriteSheet.animations.main))
    })
    return () => {
      cancelled = true
    }
  }, [spriteSheetData])

  if (!animatedSprite) return <></>

  return <SpriteAnimatedInstance animatedSprite={animatedSprite} />
}

const SpriteAnimatedInstance = ({
  animatedSprite,
}: {
  animatedSprite: AnimatedSprite
}) => {
  usePixiInstance({ container: animatedSprite })

  useEffect(() => {
    const anim = animatedSprite
    anim.animationSpeed = 0.2
    anim.play()
    anim.width = 100
    anim.height = 100
    anim.anchor.set(0.5)
    anim.x = 25
    anim.y = 25
    return () => anim.stop()
  }, [animatedSprite])

  return <></>
}
