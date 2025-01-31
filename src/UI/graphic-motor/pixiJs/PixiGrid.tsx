import { Graphics as BaseGraphics } from "pixi.js"
import { config } from "@/src/app/config"
import { Graphics } from "@/src/UI/graphic-motor/pixiJs/components/Graphics"
import React, { useState } from "react"
import { Vector2Interface } from "@/src/utils/math/vector"
import { useGamePubSub } from "@/src/UI/hook/useGameFrame"
import { appLdType } from "@/src/AppLdType"
import { UserControl } from "@/src/game/game/GameInterface"
import useGameContext from "@/src/UI/provider/useGameContext"

interface GridPropsInterface {
  size: Vector2Interface
}

export const PixiGrid = ({ size }: GridPropsInterface) => {
  const game = useGameContext().game
  const [showGrid, setShowGrid] = useState<boolean>(game.userControl.showGrid)

  useGamePubSub(appLdType.userControl, (e) => {
    const userControl = e.item as UserControl
    setShowGrid(userControl.showGrid)
  })

  if (!showGrid) return

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

    graphics.stroke({ width: lineWidth, color: lineColor, alpha: 0.2 })
  }

  return <Graphics draw={drawGrid} options={{ position: { x: 0, y: 0 } }} />
}
