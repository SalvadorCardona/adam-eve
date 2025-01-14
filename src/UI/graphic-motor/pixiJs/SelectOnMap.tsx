import React, { useEffect, useState } from "react"
import { Vector2Interface } from "@/src/utils/3Dmath/Vector"
import { usePixiApp } from "@/src/UI/graphic-motor/pixiJs/PixiAppProvider/UsePixiApp"
import { Graphics } from "@/src/UI/graphic-motor/pixiJs/components/Graphics"
import useGameContext from "@/src/UI/provider/useGameContext"
import {
  bounding2ToBounding3,
  BoundingBox2DInterface,
} from "@/src/utils/3Dmath/boudingBox"
import { onSelectEntityUserActionMetadata } from "@/src/game/actionUser/app/SelectUserAction/onSelectEntityUserActionMetadata"

const mouse: Vector2Interface = { x: 0, y: 0 }
let isDragging = false

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

  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      setIsDraging(true)
      mouse.x = event.clientX
      mouse.y = event.clientY
      setBoundingBox({
        size: { x: 0, y: 0 },
        position: { x: mouse.x, y: mouse.y },
      })
    }

    const handleMouseMove = (event: MouseEvent) => {
      const newWidth = event.clientX - mouse.x
      const newHeight = event.clientY - mouse.y
      setBoundingBox({
        size: { x: newWidth, y: newHeight },
        position: { x: mouse.x, y: mouse.y },
      })
    }

    const handleMouseUp = (event: MouseEvent) => {
      setIsDraging(false)

      game.userControl.mouseState.bounding3D = bounding2ToBounding3(boundingBox)

      onSelectEntityUserActionMetadata.onSelectZone({
        game: game,
      })
    }

    app.canvas.addEventListener("mousedown", handleMouseDown)
    app.canvas.addEventListener("mousemove", handleMouseMove)
    app.canvas.addEventListener("mouseup", handleMouseUp)

    return () => {
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

//
// useEffect(() => {
//   if (startPosition && currentPosition && !isDragging) {
//     console.log("create")
//     console.count("envie")
//     const width = currentPosition.x - startPosition.x
//     const height = currentPosition.y - startPosition.y
//
//     game.userControl.mouseState.bounding3D = createBounding3D({
//       size: { x: width, z: height, y: 0 },
//       position: { x: startPosition.x, z: startPosition.y, y: 0 },
//     })
//
//     onSelectEntityUserActionMetadata.onSelectZone({
//       game: game,
//     })
//   }
// }, [endPosition, currentPosition])