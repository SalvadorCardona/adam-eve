import React, { useEffect, useState } from "react"

import { Graphics as BaseGraphics } from "pixi.js"
import useGameContext from "@/src/UI/provider/useGameContext"
import { Vector2Interface } from "@/src/utils/3Dmath/Vector"
import { config } from "@/src/app/config"
import { PixiProvider } from "@/src/UI/graphic-motor/pixiJs/PixiAppProvider/PixiProvider"
import { ApplicationOptions } from "pixi.js/lib/app/Application"
import { Graphics } from "./components/Graphics"
import { Container } from "@/src/UI/graphic-motor/pixiJs/components/Container"
import { SelectOnMap } from "@/src/UI/graphic-motor/pixiJs/SelectOnMap"
import { EntitiesLoopPixiJs } from "@/src/UI/graphic-motor/pixiJs/EntitiesLoopPixiJs"

export const PixijsAppComponent = () => {
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

  const options: Partial<ApplicationOptions> = {
    width: size.x,
    height: size.y,
    background: 0x1099bb,
  }

  return (
    <>
      <PixiProvider options={options}>
        <Grid size={size}></Grid>
        <Container
          position={{ x: game.camera.position.x, y: game.camera.position.y }}
        >
          <EntitiesLoopPixiJs></EntitiesLoopPixiJs>
        </Container>
        <SelectOnMap></SelectOnMap>
      </PixiProvider>
    </>
  )
}

interface GridPropsInterface {
  size: Vector2Interface
}

const Grid = ({ size }: GridPropsInterface) => {
  const drawGrid = (graphics: BaseGraphics) => {
    const lineWidth = 1
    const lineColor = "white"

    const cellSize = config.pixiJs2dItemSize
    const { x: width, y: height } = size
    // graphics.setStrokeStyle({ width: 1, color: lineColor })

    // Dessiner les lignes verticales
    for (let x = 0; x <= width; x += cellSize) {
      graphics.moveTo(x, 0) // Début de la ligne
      graphics.lineTo(x, height) // Fin de la ligne
    }

    // Dessiner les lignes horizontales
    for (let y = 0; y <= height; y += cellSize) {
      graphics.moveTo(0, y) // Début de la ligne
      graphics.lineTo(width, y) // Fin de la ligne
    }

    graphics.fill(0xff3300)
    graphics.stroke({ width: lineWidth, color: lineColor })
  }

  return <Graphics draw={drawGrid} options={{ position: { x: 0, y: 0 } }} />
}
