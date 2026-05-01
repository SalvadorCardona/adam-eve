import {
  AnimatedSprite,
  Assets,
  Sprite as BaseSprite,
  SpriteOptions,
  SpritesheetData,
  Texture,
  Ticker,
  TilingSprite,
} from "pixi.js"
import React, { useEffect, useRef, useState } from "react"
import { useTick } from "@pixi/react"
import { Vector2Interface } from "@/packages/math/vector"
import { createSpritesheetByData } from "@/packages/ui/graphic-motor/pixiJs/createFramePixiJs"

export type SpriteAnimation = (e: Ticker, item: TilingSprite | BaseSprite) => void

interface SpritePropsInterface {
  options?: SpriteOptions
  image?: string
  position?: Vector2Interface
  isTilling?: boolean
  animation?: SpriteAnimation
  rotation?: number
  alpha?: number
}

const useTexture = (src?: string): Texture | undefined => {
  const [texture, setTexture] = useState<Texture | undefined>(() =>
    src && Assets.cache.has(src)
      ? (Assets.cache.get(src) as Texture | undefined)
      : undefined,
  )

  useEffect(() => {
    if (!src) {
      setTexture(undefined)
      return
    }
    if (Assets.cache.has(src)) {
      setTexture(Assets.cache.get(src) as Texture)
      return
    }
    let cancelled = false
    Assets.load<Texture>(src).then((tex) => {
      if (!cancelled) setTexture(tex)
    })
    return () => {
      cancelled = true
    }
  }, [src])

  return texture
}

export const Sprite = ({
  options,
  image,
  position,
  isTilling,
  animation,
  rotation,
  alpha,
}: SpritePropsInterface) => {
  const texture = useTexture(image) ?? Texture.EMPTY
  const spriteRef = useRef<BaseSprite | TilingSprite | null>(null)

  useTick({
    isEnabled: Boolean(animation),
    callback: (ticker) => {
      if (animation && spriteRef.current) animation(ticker, spriteRef.current)
    },
  })

  const width = options?.width
  const height = options?.height
  const zIndex = options?.zIndex

  if (isTilling) {
    return (
      <pixiTilingSprite
        ref={spriteRef as React.Ref<TilingSprite>}
        texture={texture}
        x={position?.x}
        y={position?.y}
        width={width}
        height={height}
        zIndex={zIndex}
        rotation={rotation}
        alpha={alpha}
      />
    )
  }

  return (
    <pixiSprite
      ref={spriteRef as React.Ref<BaseSprite>}
      texture={texture}
      x={position?.x}
      y={position?.y}
      width={width}
      height={height}
      zIndex={zIndex}
      rotation={rotation}
      alpha={alpha}
    />
  )
}

export const SpriteAnimated = ({
  spriteSheetData,
  size,
}: {
  spriteSheetData: SpritesheetData
  size?: Vector2Interface
}) => {
  const [textures, setTextures] = useState<Texture[] | null>(null)
  const animatedRef = useRef<AnimatedSprite | null>(null)

  useEffect(() => {
    let cancelled = false
    createSpritesheetByData(spriteSheetData).then((sheet) => {
      if (cancelled) return
      setTextures(sheet.animations.main)
    })
    return () => {
      cancelled = true
    }
  }, [spriteSheetData])

  useEffect(() => {
    if (!textures || !animatedRef.current) return
    animatedRef.current.play()
  }, [textures])

  if (!textures) return null

  const baseWidth = size?.x ?? 50
  const baseHeight = size?.y ?? 50
  const renderScale = 2

  return (
    <pixiAnimatedSprite
      ref={animatedRef}
      textures={textures}
      animationSpeed={0.2}
      width={baseWidth * renderScale}
      height={baseHeight * renderScale}
      x={baseWidth / 2}
      y={baseHeight / 2}
      anchor={0.5}
    />
  )
}
