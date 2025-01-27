import React, { useEffect, useState } from "react"
import { createVector2, Vector2Interface } from "@/src/utils/math/Vector"
import { usePixiApp } from "@/src/UI/graphic-motor/pixiJs/PixiAppProvider/UsePixiApp"
import { Graphics } from "@/src/UI/graphic-motor/pixiJs/components/Graphics"
import { Container, FederatedPointerEvent, Graphics as BaseGraphic } from "pixi.js"
import { BoundingBox2DInterface } from "@/src/utils/math/boudingBox"
import useGameContext from "@/src/UI/provider/useGameContext"
import { onSelectEntityUserActionMetadata } from "@/src/game/actionUser/app/SelectUserAction/onSelectEntityUserActionMetadata"
import { useDebounce } from "react-use"
import { updateGame } from "@/src/game/game/updateGame"

let mouseMovePositon = createVector2()

export const SelectOnMap = () => {
  const app = usePixiApp().app
  const game = useGameContext().game
  const [isDragging, setIsDragging] = useState(false)

  const [startPosition, setStartPosition] = useState<Vector2Interface>({
    x: 0,
    y: 0,
  })
  const [currentPosition, setCurrentPosition] = useState<Vector2Interface>({
    x: 0,
    y: 0,
  })

  useDebounce(
    () => {
      if (isDragging) return

      // game.mouseState.position = mouseMovePositon
      const bounding = createBoundingBoxByMouse()
      game.mouseState.bounding2d.size = bounding.size
      onSelectEntityUserActionMetadata.onSelectZone({
        game: game,
      })
    },
    50,
    [isDragging],
  )

  const createBoundingBoxByMouse = (): BoundingBox2DInterface => {
    const width = Math.abs(currentPosition.x - startPosition.x)
    const height = Math.abs(currentPosition.y - startPosition.y)

    return {
      position: {
        x: Math.min(startPosition.x, currentPosition.x),
        y: Math.min(startPosition.y, currentPosition.y),
      },
      size: { x: width, y: height },
    }
  }

  useEffect(() => {
    const handlePointerDown = (event: FederatedPointerEvent) => {
      const localPosition = app.stage.toLocal(event.global)
      setStartPosition({
        x: localPosition.x,
        y: localPosition.y,
      })
      setCurrentPosition({
        x: localPosition.x,
        y: localPosition.y,
      })

      setIsDragging(true)
    }

    const handlePointerMove = (event: FederatedPointerEvent) => {
      const localPosition = app.stage.toLocal(event.global)
      const newPosition = {
        x: localPosition.x,
        y: localPosition.y,
      }
      if (isDragging) {
        setCurrentPosition(newPosition)
      }
      mouseMovePositon = newPosition
      game.mouseState.position = mouseMovePositon
      updateGame(game, game.mouseState)

      game.mouseState.bounding2d = createBoundingBoxByMouse()
    }

    const handlePointerUp = () => {
      setIsDragging(false)
    }

    if (!app) return

    const interactionLayer = new Container()
    interactionLayer.interactive = true
    interactionLayer.zIndex = 90
    interactionLayer.hitArea = app.screen // Cover the entire screen
    app.stage.addChild(interactionLayer)

    interactionLayer.on("pointerdown", handlePointerDown)
    interactionLayer.on("pointermove", handlePointerMove)
    interactionLayer.on("pointerup", handlePointerUp)
    interactionLayer.on("pointerupoutside", handlePointerUp) // Capture pointerup outside
    app.canvas.addEventListener("mouseup", handlePointerUp)

    return () => {
      interactionLayer.off("pointerdown", handlePointerDown)
      interactionLayer.off("pointermove", handlePointerMove)
      interactionLayer.off("pointerup", handlePointerUp)
      app.canvas.removeEventListener("mouseup", handlePointerUp)
    }
  }, [app, isDragging])

  const drawSelectionBox = (g: BaseGraphic) => {
    if (isDragging) {
      const boundingBox = createBoundingBoxByMouse()
      g.rect(
        boundingBox.position.x,
        boundingBox.position.y,
        boundingBox.size.x,
        boundingBox.size.y,
      )
      g.fill(0x650a5a)
      g.stroke({ width: 2, color: 0xfeeb77 })
    }
  }

  return <Graphics draw={drawSelectionBox} />
}
