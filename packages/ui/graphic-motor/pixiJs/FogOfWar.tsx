import React, { useState } from "react"
import { Graphics } from "@/packages/ui/graphic-motor/pixiJs/components/Graphics"
import useGameContext from "@/packages/ui/provider/useGameContext"
import { useGameFrame } from "@/packages/ui/hook/useGameFrame"

export const FogOfWar = () => {
  const game = useGameContext().game
  const [tick, setTick] = useState<number>()

  useGameFrame((game) => {
    if (game.time % 30 !== 0) return
    setTick(game["@version"] ?? 1)
  })

  const draw = (g: import("pixi.js").Graphics) => {
    const visited = game.gameWorld.visitedMatrix
    if (!visited) return
    const zoom = game.camera.zoom
    const origin = game.gameWorld.origin ?? { x: 0, y: 0 }
    const height = visited.length
    for (let y = 0; y < height; y++) {
      const row = visited[y]
      if (!row) continue
      const width = row.length
      for (let x = 0; x < width; x++) {
        if (row[x]) continue
        const worldX = x - origin.x
        const worldY = y - origin.y
        g.rect(worldX * zoom, worldY * zoom, zoom, zoom)
        g.fill({ color: 0x000000, alpha: 1 })
      }
    }
  }

  return <Graphics key={"grog" + tick} draw={draw} />
}
