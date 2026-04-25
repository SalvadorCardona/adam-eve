import React, { useEffect, useState } from "react"
import { Vector2Interface, vector3ToVector2 } from "@/packages/math/vector"
import useGameContext from "@/packages/ui/provider/useGameContext"
import { usePixiApp } from "@/packages/ui/graphic-motor/pixiJs/PixiAppProvider/UsePixiApp"
import { ContainerChild } from "pixi.js"
import { useGamePubSub } from "@/packages/ui/hook/useGameFrame"
import { Sprite } from "@/packages/ui/graphic-motor/pixiJs/components/Sprite"
import { assetList } from "@/app/assetList"
import { Ticker, TilingSprite, Sprite as BaseSprite } from "pixi.js"

type WaterLayerConfig = {
  zIndex: number
  scale: number
  driftX: number
  waveAmplitude: number
  waveSpeed: number
  breatheAmplitude: number
  breatheSpeed: number
  alpha: number
  alphaPulse: number
  tint: number
}

const DEEP_LAYER: WaterLayerConfig = {
  zIndex: -999,
  scale: 2.2,
  driftX: 0.05,
  waveAmplitude: 4,
  waveSpeed: 0.0003,
  breatheAmplitude: 0.02,
  breatheSpeed: 0.0001,
  alpha: 1,
  alphaPulse: 0,
  tint: 0x1a6fa0,
}

const SURFACE_LAYER: WaterLayerConfig = {
  zIndex: -998,
  scale: 1.4,
  driftX: -0.18,
  waveAmplitude: 12,
  waveSpeed: 0.0006,
  breatheAmplitude: 0.05,
  breatheSpeed: 0.0002,
  alpha: 0.45,
  alphaPulse: 0.1,
  tint: 0xa9e3ff,
}

const SPARKLE_LAYER: WaterLayerConfig = {
  zIndex: -997,
  scale: 0.6,
  driftX: 0.32,
  waveAmplitude: 28,
  waveSpeed: 0.0011,
  breatheAmplitude: 0.08,
  breatheSpeed: 0.0004,
  alpha: 0.18,
  alphaPulse: 0.07,
  tint: 0xffffff,
}

const makeAnimation = (config: WaterLayerConfig) => {
  let driftX = 0
  return (e: Ticker, item: TilingSprite | BaseSprite) => {
    const tile = item as TilingSprite
    const t = e.lastTime
    driftX += config.driftX
    tile.tilePosition.x = driftX
    tile.tilePosition.y = Math.sin(t * config.waveSpeed) * config.waveAmplitude
    const breathe =
      1 + config.breatheAmplitude * Math.cos(t * config.breatheSpeed)
    tile.tileScale.x = config.scale * breathe
    tile.tileScale.y = config.scale * breathe
    tile.alpha = config.alpha + config.alphaPulse * Math.sin(t * config.waveSpeed)
    tile.tint = config.tint
  }
}

const WaterLayer = ({
  size,
  cameraOffset,
  config,
}: {
  size: Vector2Interface
  cameraOffset: Vector2Interface
  config: WaterLayerConfig
}) => (
  <Sprite
    options={{ width: size.x, height: size.y, zIndex: config.zIndex }}
    position={cameraOffset}
    image={assetList.sea}
    isTilling
    animation={makeAnimation(config)}
  />
)

export const BackGroundGame = ({ size }: { size: Vector2Interface }) => {
  const game = useGameContext().game

  const [camera, setCamera] = useState<Vector2Interface>(
    vector3ToVector2(game.camera.position),
  )
  const pixi = usePixiApp()
  const stage = pixi.app?.stage as ContainerChild | undefined

  useGamePubSub("camera", () => {
    setCamera({ ...vector3ToVector2(game.camera.position) })
  })

  useEffect(() => {
    if (!stage || stage.destroyed || !stage.position) return
    stage.position.copyFrom(camera)
  }, [camera, stage])

  const cameraOffset = { x: -camera.x, y: -camera.y }

  return (
    <>
      <WaterLayer size={size} cameraOffset={cameraOffset} config={DEEP_LAYER} />
      <WaterLayer
        size={size}
        cameraOffset={cameraOffset}
        config={SURFACE_LAYER}
      />
      <WaterLayer
        size={size}
        cameraOffset={cameraOffset}
        config={SPARKLE_LAYER}
      />
    </>
  )
}
