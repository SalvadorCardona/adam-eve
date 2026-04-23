import {
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
}

const useTexture = (src?: string): Texture | undefined => {
  const [texture, setTexture] = useState<Texture | undefined>(() =>
    src ? (Assets.get<Texture>(src) ?? undefined) : undefined,
  )

  useEffect(() => {
    if (!src) {
      setTexture(undefined)
      return
    }
    const cached = Assets.get<Texture>(src)
    if (cached) {
      setTexture(cached)
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
    />
  )
}

export const SpriteAnimated = ({
  spriteSheetData,
}: {
  spriteSheetData: SpritesheetData
}) => {
  const [textures, setTextures] = useState<Texture[] | null>(null)

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

  if (!textures) return null

  return (
    <pixiAnimatedSprite
      textures={textures}
      animationSpeed={0.2}
      width={100}
      height={100}
      x={25}
      y={25}
      anchor={0.5}
      autoPlay
    />
  )
}
