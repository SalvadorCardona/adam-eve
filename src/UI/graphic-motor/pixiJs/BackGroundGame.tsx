import React, { useEffect, useState } from "react"
import { Vector2Interface, vector3ToVector2 } from "@/src/utils/math/vector"
import useGameContext from "@/src/UI/provider/useGameContext"
import { usePixiApp } from "@/src/UI/graphic-motor/pixiJs/PixiAppProvider/UsePixiApp"
import { ContainerChild } from "pixi.js/lib/scene/container/Container"
import { useGamePubSub } from "@/src/UI/hook/useGameFrame"
import { appLdType } from "@/src/AppLdType"
import { Sprite } from "@/src/UI/graphic-motor/pixiJs/components/Sprite"
import { assetList } from "@/src/app/assetList"
import { Ticker, TilingSprite } from "pixi.js"
import { ApplicationOptions } from "pixi.js/lib/app/Application"

export const BackGroundGame = ({ size }: { size: Vector2Interface }) => {
  const game = useGameContext().game

  const [camera, setCamera] = useState<Vector2Interface>(
    vector3ToVector2(game.camera.position),
  )
  const pixi = usePixiApp()
  const stage = pixi.app.stage as ContainerChild

  useGamePubSub(appLdType.camera, (e) => {
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
      animation={(e: Ticker, item: TilingSprite) => {
        const deform = 0.02
        const speed = 0.0001
        const moveSize = 0.1
        const scaleFactor = 2 - deform * Math.abs(Math.cos(e.lastTime * speed))
        // const scaleFactor = Math.cos(e.lastTime * speed) * deform
        item.tilePosition.x += moveSize
        // item.tilePosition.y += moveSize
        item.tileScale.x = scaleFactor
        item.tileScale.y = scaleFactor
        // item.position.y += scaleFactor
        // item.position.x += scaleFactor
      }}
    ></Sprite>
  )
}
