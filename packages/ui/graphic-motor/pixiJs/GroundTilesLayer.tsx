import React, { useEffect, useMemo, useState } from "react"
import useGameContext from "@/packages/ui/provider/useGameContext"
import { useGamePubSub } from "@/packages/ui/hook/useGameFrame"
import { usePixiApp } from "@/packages/ui/graphic-motor/pixiJs/PixiAppProvider/UsePixiApp"
import { Sprite } from "@/packages/ui/graphic-motor/pixiJs/components/Sprite"
import { Container } from "@/packages/ui/graphic-motor/pixiJs/components/Container"
import { getResource } from "@/packages/resource/ResourceInterface"
import { EntityResourceInterface } from "@/packages/game/entity/EntityResourceInterface"
import { Matrix2DInterface } from "@/packages/math/matrix"

const CHUNK_SIZE = 16

const DECORATION_PROBABILITY = 0.18

function tileHash(x: number, y: number, salt: number): number {
  let h = (x | 0) * 374761393 + (y | 0) * 668265263 + salt * 2147483647
  h = (h ^ (h >>> 13)) >>> 0
  h = Math.imul(h, 1274126177) >>> 0
  return (h ^ (h >>> 16)) >>> 0
}

interface ViewportRect {
  minX: number
  minY: number
  maxX: number
  maxY: number
}

function computeVisibleChunks(
  cameraX: number,
  cameraY: number,
  screenW: number,
  screenH: number,
  zoom: number,
  originX: number,
  originY: number,
): ViewportRect {
  const worldMinX = -cameraX
  const worldMinY = -cameraY
  const worldMaxX = worldMinX + screenW
  const worldMaxY = worldMinY + screenH

  const cellMinX = Math.floor(worldMinX / zoom) + originX
  const cellMinY = Math.floor(worldMinY / zoom) + originY
  const cellMaxX = Math.ceil(worldMaxX / zoom) + originX
  const cellMaxY = Math.ceil(worldMaxY / zoom) + originY

  return {
    minX: Math.floor(cellMinX / CHUNK_SIZE),
    minY: Math.floor(cellMinY / CHUNK_SIZE),
    maxX: Math.floor((cellMaxX - 1) / CHUNK_SIZE),
    maxY: Math.floor((cellMaxY - 1) / CHUNK_SIZE),
  }
}

export const GroundTilesLayer = () => {
  const game = useGameContext().game
  const app = usePixiApp().app

  const [tilesVersion, setTilesVersion] = useState<number>(
    game.gameWorld["@version"] ?? 0,
  )
  useGamePubSub(game.gameWorld["@id"], () => {
    setTilesVersion(game.gameWorld["@version"] ?? 0)
  })

  const [cameraVersion, setCameraVersion] = useState(0)
  useGamePubSub("camera", () => {
    setCameraVersion((v) => v + 1)
  })

  const [screen, setScreen] = useState<{ w: number; h: number }>(() => ({
    w: app?.screen?.width ?? window.innerWidth,
    h: app?.screen?.height ?? window.innerHeight,
  }))
  useEffect(() => {
    const onResize = () =>
      setScreen({
        w: app?.screen?.width ?? window.innerWidth,
        h: app?.screen?.height ?? window.innerHeight,
      })
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [app])

  const zoom = game.camera.zoom
  const matrix = game.gameWorld.groundMatrix
  const origin = game.gameWorld.origin ?? { x: 0, y: 0 }

  const visibleChunks = useMemo(() => {
    const range = computeVisibleChunks(
      game.camera.position.x,
      game.camera.position.z,
      screen.w,
      screen.h,
      zoom,
      origin.x,
      origin.y,
    )
    const out: Array<{ cx: number; cy: number }> = []
    for (let cy = range.minY; cy <= range.maxY; cy++) {
      for (let cx = range.minX; cx <= range.maxX; cx++) {
        if (cx < 0 || cy < 0) continue
        const chunkOriginY = cy * CHUNK_SIZE
        if (chunkOriginY >= matrix.length) continue
        out.push({ cx, cy })
      }
    }
    return out
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cameraVersion, screen.w, screen.h, zoom, matrix.length, origin.x, origin.y])

  return (
    <>
      {visibleChunks.map(({ cx, cy }) => (
        <GroundChunk
          key={`gc-${cx},${cy}`}
          cx={cx}
          cy={cy}
          zoom={zoom}
          matrix={matrix}
          tilesVersion={tilesVersion}
          originX={origin.x}
          originY={origin.y}
        />
      ))}
    </>
  )
}

interface GroundChunkProps {
  cx: number
  cy: number
  zoom: number
  matrix: Matrix2DInterface
  tilesVersion: number
  originX: number
  originY: number
}

const GroundChunk = React.memo(
  function GroundChunk({
    cx,
    cy,
    zoom,
    matrix,
    tilesVersion,
    originX,
    originY,
  }: GroundChunkProps) {
    const tiles = useMemo(() => {
      const out: Array<{
        key: string
        x: number
        y: number
        image: string
        decoration?: {
          image: string
          size: number
          offsetX: number
          offsetY: number
        }
      }> = []
      const startX = cx * CHUNK_SIZE
      const startY = cy * CHUNK_SIZE
      const endY = Math.min(startY + CHUNK_SIZE, matrix.length)
      for (let y = startY; y < endY; y++) {
        const row = matrix[y]
        if (!row) continue
        const endX = Math.min(startX + CHUNK_SIZE, row.length)
        for (let x = startX; x < endX; x++) {
          const value = row[x]
          if (typeof value !== "string" || !value) continue
          const resource = getResource<EntityResourceInterface>(value)
          const image = resource?.asset?.model2d
          if (!image) continue
          const worldX = x - originX
          const worldY = y - originY

          let decoration:
            | { image: string; size: number; offsetX: number; offsetY: number }
            | undefined
          const decorations = resource?.asset?.decorations
          if (decorations && decorations.length > 0) {
            const roll = tileHash(x, y, 0) / 0xffffffff
            if (roll < DECORATION_PROBABILITY) {
              const idx = tileHash(x, y, 1) % decorations.length
              const size = zoom * 0.45
              const slack = zoom - size
              const offsetX = (tileHash(x, y, 2) / 0xffffffff) * slack
              const offsetY = (tileHash(x, y, 3) / 0xffffffff) * slack
              decoration = {
                image: decorations[idx],
                size,
                offsetX,
                offsetY,
              }
            }
          }

          out.push({
            key: `${x},${y}`,
            x: worldX * zoom,
            y: worldY * zoom,
            image,
            decoration,
          })
        }
      }
      return out
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cx, cy, zoom, matrix, tilesVersion, originX, originY])

    return (
      <>
        {tiles.map((tile) => (
          <Container
            key={tile.key}
            position={{ x: tile.x, y: tile.y }}
            options={{ width: zoom, height: zoom }}
          >
            <Sprite image={tile.image} options={{ width: zoom, height: zoom }} />
            {tile.decoration && (
              <Sprite
                image={tile.decoration.image}
                position={{ x: tile.decoration.offsetX, y: tile.decoration.offsetY }}
                options={{
                  width: tile.decoration.size,
                  height: tile.decoration.size,
                }}
              />
            )}
          </Container>
        ))}
      </>
    )
  },
  (prev, next) =>
    prev.cx === next.cx &&
    prev.cy === next.cy &&
    prev.zoom === next.zoom &&
    prev.matrix === next.matrix &&
    prev.tilesVersion === next.tilesVersion &&
    prev.originX === next.originX &&
    prev.originY === next.originY,
)
