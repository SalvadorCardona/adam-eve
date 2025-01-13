import React, { useEffect, useState } from "react"
import { Container, Graphics, useApp } from "@pixi/react"
import useGameContext from "@/src/UI/provider/useGameContext"
import { arrayToVector3, Vector3Interface } from "@/src/utils/3Dmath/Vector"
import { onSelectEntityUserActionMetadata } from "@/src/game/actionUser/app/SelectUserAction/onSelectEntityUserActionMetadata"
import { entityQueryFindOne } from "@/src/game/entity/useCase/query/entityQuery"
import { createBounding3D } from "@/src/utils/3Dmath/boudingBox"
import "@pixi/events"

interface CreateBuildingPropsInterface {}

export const SelectOnMap = ({}: CreateBuildingPropsInterface) => {
  const [size, setSize] = useState<Vector3Interface | undefined>(undefined)
  const [position, setPosition] = useState<Vector3Interface>({ x: 0, z: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [startPosition, setStartPosition] = useState<Vector3Interface>({
    x: 0,
    z: 0,
    y: 0,
  })
  const app = useApp()
  const game = useGameContext().game

  const handleMouseMove = (event) => {
    console.log(event)
    if (!isGame(event)) return
    const point = event.data.global

    game.userControl.mouseState.bounding3D.position = arrayToVector3([
      point.x,
      0,
      point.y,
    ])
    console.log(event)
    if (!isDragging) {
      game.userControl.mouseState.bounding3D.size = { x: 0, z: 0, y: 0 }
      setSize({ x: 0, y: 0, z: 0 })
      const entity = entityQueryFindOne(game, {
        circleSearch: {
          center: game.userControl.mouseState.bounding3D.position,
          radius: 1,
        },
      })

      if (entity) {
        game.userControl.entitySelectedByHover = entity["@id"]
      }

      return
    }

    const width = Math.abs(point.x - startPosition.x)
    const height = Math.abs(point.y - startPosition.z)

    const newPosition = {
      x: (point.x + startPosition.x) / 2,
      y: 0,
      z: (point.y + startPosition.z) / 2,
    }

    const newSize = {
      x: width,
      y: 0,
      z: height,
    }

    game.userControl.mouseState.bounding3D = createBounding3D({
      size: newSize,
      position: newPosition,
    })

    setSize(newSize)
    setPosition(newPosition)
  }

  const handleMouseDown = (event) => {
    console.log(event)
    if (!isGame(event)) return
    setIsDragging(true)
    const point = event.data.global
    setStartPosition({ x: point.x, y: 0, z: point.y })
  }

  const handleMouseUp = (event: PIXI.InteractionEvent) => {
    console.log(event)
    if (!isGame(event)) return
    setIsDragging(false)
  }

  const isGame = (event: PIXI.InteractionEvent): boolean => {
    console.log(event)
    return event.target && event.target instanceof Container
  }

  useEffect(() => {
    if (isDragging) return

    onSelectEntityUserActionMetadata.onSelectZone({
      game: game,
    })
  }, [isDragging])

  useEffect(() => {
    app.stage.on("pointerup", handleMouseUp)
    app.stage.on("pointermove", handleMouseMove)
    app.stage.on("pointerdown", handleMouseDown)
    return () => {
      app.stage.off("pointermove", handleMouseMove)
      app.stage.off("pointerdown", handleMouseDown)
      app.stage.off("pointerup", handleMouseUp)
    }
  }, [app.stage])

  if (!size) return null

  return (
    <Graphics
      draw={(g) => {
        g.clear()
        g.beginFill(0x00ff00, 0.5)
        g.drawRect(position.x - size.x / 2, position.z - size.z / 2, size.x, size.z)
        g.endFill()
      }}
    />
  )
}
