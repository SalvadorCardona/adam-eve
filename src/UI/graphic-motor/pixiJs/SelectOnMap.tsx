import React, { useEffect, useState } from "react"
import { Vector2Interface } from "@/src/utils/3Dmath/Vector"
import { usePixiApp } from "@/src/UI/graphic-motor/pixiJs/PixiAppProvider/UsePixiApp"
import { Graphics } from "@/src/UI/graphic-motor/pixiJs/components/Graphics"
import { createBounding3D } from "@/src/utils/3Dmath/boudingBox"
import useGameContext from "@/src/UI/provider/useGameContext"
import { onSelectEntityUserActionMetadata } from "@/src/game/actionUser/app/SelectUserAction/onSelectEntityUserActionMetadata"

const mouse: Vector2Interface = { x: 0, y: 0 }
let isDragging = false

interface CreateBuildingPropsInterface {}

export const SelectOnMap = ({}: CreateBuildingPropsInterface) => {
  const appContext = usePixiApp()
  const game = useGameContext().game
  const app = appContext.app
  const [currentPosition, setCurrentPosition] = useState<Vector2Interface | null>(
    null,
  )
  const [startPosition, setStartPosition] = useState<Vector2Interface | null>(null)
  const [endPosition, setEndPosition] = useState<Vector2Interface | null>(null)

  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      isDragging = true
      setStartPosition({ x: event.clientX, y: event.clientY })
      setCurrentPosition({ x: event.clientX, y: event.clientY })
    }

    const handleMouseMove = (event: MouseEvent) => {
      if (startPosition) {
        setCurrentPosition({ x: event.clientX, y: event.clientY })
      }
    }

    const handleMouseUp = (event: MouseEvent) => {
      isDragging = false
      setEndPosition({ x: event.clientX, y: event.clientY })
      setCurrentPosition(null)
    }

    app.canvas.addEventListener("mousedown", handleMouseDown)
    app.canvas.addEventListener("mousemove", handleMouseMove)
    app.canvas.addEventListener("mouseup", handleMouseUp)

    return () => {
      app.canvas.removeEventListener("mousedown", handleMouseDown)
      app.canvas.removeEventListener("mousemove", handleMouseMove)
      app.canvas.removeEventListener("mouseup", handleMouseUp)
    }
  }, [app, startPosition, startPosition])

  useEffect(() => {
    if (startPosition && currentPosition && !isDragging) {
      console.count("envie")
      const width = currentPosition.x - startPosition.x
      const height = currentPosition.y - startPosition.y

      game.userControl.mouseState.bounding3D = createBounding3D({
        size: { x: width, z: height, y: 0 },
        position: { x: startPosition.x, z: startPosition.y, y: 0 },
      })

      onSelectEntityUserActionMetadata.onSelectZone({
        game: game,
      })
    }
  }, [endPosition, currentPosition])

  return (
    <Graphics
      draw={(g) => {
        if (startPosition && currentPosition) {
          const width = currentPosition.x - startPosition.x
          const height = currentPosition.y - startPosition.y
          g.rect(startPosition.x, startPosition.y, width, height)
        }
        g.fill(0x650a5a)
        g.stroke({ width: 2, color: 0xfeeb77 })
      }}
    />
  )
}
