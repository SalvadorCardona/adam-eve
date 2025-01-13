import React, { useEffect, useState } from "react"

import { Graphics as BaseGraphics } from "pixi.js"
import { Container, Graphics, Stage } from "@pixi/react"
import useGameContext from "@/src/UI/provider/useGameContext"
import { EntitiesLoopThreeJs } from "@/src/UI/graphic-motor/pixiJs/EntitiesLoopPixiJs"
import { Vector2Interface } from "@/src/utils/3Dmath/Vector"
import { config } from "@/src/app/config"
import { SelectOnMap } from "@/src/UI/graphic-motor/pixiJs/SelectOnMap"
import "@pixi/events"

export const PixiJsComponent = () => {
  const gameContext = useGameContext()
  const [size, setSize] = useState<Vector2Interface>({
    x: window.innerWidth,
    y: window.innerHeight,
  })

  const game = gameContext.game
  const moveSize = 15

  useEffect(() => {
    const handleResize = () => {
      setSize({
        x: window.innerWidth,
        y: window.innerHeight,
      })
    }
    const keysPressed: Record<string, boolean> = {}

    const handleKeyDown = (event: KeyboardEvent) => {
      keysPressed[event.key] = true
      updateCameraPosition()
    }

    const handleKeyUp = (event: KeyboardEvent) => {
      keysPressed[event.key] = false
    }

    const updateCameraPosition = () => {
      if (keysPressed["ArrowUp"]) {
        game.camera.position.z += moveSize
      }
      if (keysPressed["ArrowDown"]) {
        game.camera.position.z -= moveSize
      }
      if (keysPressed["ArrowLeft"]) {
        game.camera.position.x += moveSize
      }
      if (keysPressed["ArrowRight"]) {
        game.camera.position.x -= moveSize
      }
    }

    window.addEventListener("keyup", handleKeyUp)
    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <>
      <Stage width={size.x} height={size.y} options={{ background: 0x1099bb }}>
        <Container x={game.camera.position.x} y={game.camera.position.z}>
          {gameContext.game.userControl.showGrid && <Grid size={size} />}
          <EntitiesLoopThreeJs></EntitiesLoopThreeJs>
        </Container>
        <SelectOnMap></SelectOnMap>
      </Stage>
    </>
  )
}

interface GridPropsInterface {
  size: Vector2Interface
}

const Grid = ({ size }: GridPropsInterface) => {
  const drawGrid = (graphics: BaseGraphics) => {
    const gridSize = config.pixiJs2dItemSize
    const { x: width, y: height } = size

    graphics.clear()
    graphics.lineStyle(1, 0xcccccc, 1)

    for (let x = 0; x < width; x += gridSize) {
      graphics.moveTo(x, 0)
      graphics.lineTo(x, height)
    }

    for (let y = 0; y < height; y += gridSize) {
      graphics.moveTo(0, y)
      graphics.lineTo(width, y)
    }
  }
  return <Graphics draw={drawGrid} />
}
