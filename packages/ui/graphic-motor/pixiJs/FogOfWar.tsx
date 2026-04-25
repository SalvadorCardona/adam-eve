import React, { useState } from "react"
import { Graphics } from "@/packages/ui/graphic-motor/pixiJs/components/Graphics"
import useGameContext from "@/packages/ui/provider/useGameContext"
import { useGameFrame } from "@/packages/ui/hook/useGameFrame"

const UNEXPLORED_ALPHA = 1
const EXPLORED_ALPHA = 0.5

export const FogOfWar = () => {
  const game = useGameContext().game
  const [, setTick] = useState(0)
  useGameFrame(() => setTick((t) => t + 1))

  const draw = (g: import("pixi.js").Graphics) => {
    const visited = game.gameWorld.visitedMatrix
    const visible = game.gameWorld.visibleMatrix
    if (!visited) return
    const zoom = game.camera.zoom
    const height = visited.length
    for (let y = 0; y < height; y++) {
      const visitedRow = visited[y]
      if (!visitedRow) continue
      const width = visitedRow.length
      const visibleRow = visible?.[y]
      for (let x = 0; x < width; x++) {
        if (visibleRow?.[x]) continue
        const alpha = visitedRow[x] ? EXPLORED_ALPHA : UNEXPLORED_ALPHA
        g.rect(x * zoom, y * zoom, zoom, zoom)
        g.fill({ color: 0x000000, alpha })
      }
    }
  }

  return <Graphics draw={draw} />
}
