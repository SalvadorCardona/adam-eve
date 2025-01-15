import React, { useEffect, useState } from "react"
import { createVector2, Vector2Interface } from "@/src/utils/3Dmath/Vector"
import { usePixiApp } from "@/src/UI/graphic-motor/pixiJs/PixiAppProvider/UsePixiApp"
import { Graphics } from "@/src/UI/graphic-motor/pixiJs/components/Graphics"
import useGameContext from "@/src/UI/provider/useGameContext"
import { FederatedPointerEvent } from "pixi.js"
import {
  bounding2ToBounding3,
  BoundingBox2DInterface,
} from "@/src/utils/3Dmath/boudingBox"
import { onSelectEntityUserActionMetadata } from "@/src/game/actionUser/app/SelectUserAction/onSelectEntityUserActionMetadata"

let mouse: Vector2Interface = { x: 0, y: 0 }
let mouseMovePositon = createVector2()
let mouseDownPositon = createVector2()
let mouseUpPositon = createVector2()

interface CreateBuildingPropsInterface {}

export const SelectOnMap = ({}: CreateBuildingPropsInterface) => {
  const appContext = usePixiApp()
  const game = useGameContext().game
  const app = appContext.app

  const [boundingBox, setBoundingBox] = useState<BoundingBox2DInterface>({
    size: { x: 0, y: 0 },
    position: { x: 0, y: 0 },
  })

  const [isDraging, setIsDraging] = useState<boolean>(false)

  function createBoundingBox(): BoundingBox2DInterface {
    const width = Math.abs(mouseUpPositon.x - mouseDownPositon.x)
    const height = Math.abs(mouseUpPositon.y - mouseDownPositon.y)
    const positionX = (mouseDownPositon.x + mouseUpPositon.x) / 2
    const positionY = (mouseDownPositon.y + mouseUpPositon.y) / 2

    return {
      size: { x: width, y: height },
      position: { x: positionX, y: positionY },
    }
  }

  function storeMouse(event: FederatedPointerEvent): void {
    const mousePosition = event.global // Contient {x, y}
    mouseMovePositon =
      (app?.stage && app.stage.toLocal(mousePosition)) ?? createVector2()
    handleMouseMove()
  }

  const handleMouseMove = () => {
    const currentPosition = { ...mouseMovePositon }
    setBoundingBox(createBoundingBox())
    const newBoundingBox = {
      size: { x: 0, y: 0 },
      position: currentPosition,
    }

    game.userControl.mouseState.bounding3D = bounding2ToBounding3(newBoundingBox)
  }

  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      setIsDraging(true)
      mouseDownPositon = { ...mouseMovePositon }
      setBoundingBox(createBoundingBox())
    }

    const handleMouseUp = (event: MouseEvent) => {
      setIsDraging(false)
      mouseUpPositon = { ...mouseMovePositon }

      const newBoundingBox = createBoundingBox()

      game.userControl.mouseState.bounding3D = bounding2ToBounding3(newBoundingBox)
      onSelectEntityUserActionMetadata.onSelectZone({
        game: game,
      })
    }

    if (!app) return

    app.stage.on("mousemove", storeMouse)
    app.canvas.addEventListener("mousedown", handleMouseDown)
    app.canvas.addEventListener("mousemove", handleMouseMove)
    app.canvas.addEventListener("mouseup", handleMouseUp)

    return () => {
      app.stage.removeListener("mousemove", storeMouse)
      app.canvas.removeEventListener("mousedown", handleMouseDown)
      app.canvas.removeEventListener("mousemove", handleMouseMove)
      app.canvas.removeEventListener("mouseup", handleMouseUp)
    }
  }, [app, boundingBox, boundingBox])

  if (!isDraging) return

  return (
    <Graphics
      draw={(g) => {
        if (boundingBox) {
          g.rect(
            boundingBox.position.x,
            boundingBox.position.y,
            boundingBox.size.x,
            boundingBox.size.y,
          )
        }
        g.fill(0x650a5a)
        g.stroke({ width: 2, color: 0xfeeb77 })
      }}
    />
  )
}
