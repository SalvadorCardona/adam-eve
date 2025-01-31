import React, { useState } from "react"
import {
  createVector2,
  Vector2Interface,
  vector3ToVector2,
} from "@/src/utils/math/vector"
import useGameContext from "@/src/UI/provider/useGameContext"
import { useGamePubSub } from "@/src/UI/hook/useGameFrame"
import { appLdType } from "@/src/AppLdType"

export const Camera = () => {
  const [, setCamera] = useState<Vector2Interface>(createVector2())
  const game = useGameContext().game

  useGamePubSub(appLdType.camera, (e) => {
    const newCamera = vector3ToVector2(game.camera.position)
    setCamera({ ...newCamera })
  })

  return <></>
}
