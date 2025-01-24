import React, { useState } from "react"
import {
  createVector2,
  Vector2Interface,
  vector3ToVector2,
} from "@/src/utils/3Dmath/Vector"
import useGameContext from "@/src/UI/provider/useGameContext"
import { usePixiApp } from "@/src/UI/graphic-motor/pixiJs/PixiAppProvider/UsePixiApp"
import { ContainerChild } from "pixi.js/lib/scene/container/Container"
import { useGamePubSub } from "@/src/UI/hook/useGameFrame"
import { appLdType } from "@/src/AppLdType"

export const Camera = () => {
  const [camera, setCamera] = useState<Vector2Interface>(createVector2())
  const game = useGameContext().game
  const pixi = usePixiApp()
  const stage = pixi.app.stage as ContainerChild

  useGamePubSub(appLdType.camera, (e) => {
    const newCamera = vector3ToVector2(game.camera.position)
    setCamera({ ...newCamera })
  })
  //
  // useEffect(() => {
  //   stage.position = camera
  // }, [camera])

  return <></>
}
