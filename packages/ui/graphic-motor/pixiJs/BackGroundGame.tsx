import React, { useEffect, useState } from "react"
import { Vector2Interface, vector3ToVector2 } from "@/packages/math/vector"
import useGameContext from "@/packages/ui/provider/useGameContext"
import { usePixiApp } from "@/packages/ui/graphic-motor/pixiJs/PixiAppProvider/UsePixiApp"
import { ContainerChild } from "pixi.js"
import { useGamePubSub } from "@/packages/ui/hook/useGameFrame"
import { Sprite } from "@/packages/ui/graphic-motor/pixiJs/components/Sprite"
import { assetList } from "@/app/assetList"
import { Ticker, TilingSprite, Sprite as BaseSprite } from "pixi.js"
import { ApplicationOptions } from "pixi.js"

export const BackGroundGame = ({ size }: { size: Vector2Interface }) => {
  const game = useGameContext().game

  const [camera, setCamera] = useState<Vector2Interface>(
    vector3ToVector2(game.camera.position),
  )
  const pixi = usePixiApp()
  const stage = pixi.app.stage as ContainerChild

  useGamePubSub("camera", (e) => {
    const newCamera = vector3ToVector2(game.camera.position)
    setCamera({ ...newCamera })
  })

  useEffect(() => {
    stage.position = camera
  }, [camera])

  const options: Partial<ApplicationOptions> = {
    width: size.x,
    height: size.y,
  }

  return (
    <Sprite
      options={{ ...options, zIndex: -999 }}
      position={{
        x: -camera.x,
        y: -camera.y,
      }}
      image={assetList.sea}
      isTilling={true}
      animation={(e: Ticker, item: TilingSprite | BaseSprite) => {
        const tile = item as TilingSprite
        const deform = 0.02
        const speed = 0.0001
        const moveSize = 0.1
        const scaleFactor = 2 - deform * Math.abs(Math.cos(e.lastTime * speed))
        tile.tilePosition.x += moveSize
        tile.tileScale.x = scaleFactor
        tile.tileScale.y = scaleFactor
      }}
    ></Sprite>
  )
}
