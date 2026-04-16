import React, { useState } from "react"
import {
  createVector2,
  Vector2Interface,
  vector3ToVector2,
} from "@/packages/math/vector"
import useGameContext from "@/packages/ui/provider/useGameContext"
import { useGamePubSub } from "@/packages/ui/hook/useGameFrame"

export const Camera = () => {
  const [, setCamera] = useState<Vector2Interface>(createVector2())
  const game = useGameContext().game

  useGamePubSub("camera", (e) => {
    const newCamera = vector3ToVector2(game.camera.position)
    setCamera({ ...newCamera })
  })

  return <></>
}
