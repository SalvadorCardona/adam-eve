import GameInterface from "@/src/game/game/GameInterface"
import { Vector3Interface } from "@/src/game/3D/Vector"

interface Node {
  position: Vector3Interface
  parent?: Node
  g: number // Cost from start to this node
  h: number // Heuristic cost to goal
  f: number // Total cost (g + h)
}

function heuristic(a: Vector3Interface, b: Vector3Interface): number {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y)
}

export function aStarPathfinding(
  start: Vector3Interface,
  goal: Vector3Interface,
  game: GameInterface,
  step?: number,
): Vector3Interface[] | null {
  const openSet: Node[] = []
  const closedSet: Set<string> = new Set()

  openSet.push({ position: start, g: 0, h: heuristic(start, goal), f: 0 })

  while (openSet.length > 0) {
    // Sort openSet by f value and get the node with the lowest f
    openSet.sort((a, b) => a.f - b.f)
    const current = openSet.shift()!

    if (current.position.x === goal.x && current.position.y === goal.y) {
      // Reconstruct path
      const path: Vector3Interface[] = []
      let temp: Node | undefined = current
      while (temp) {
        path.push(temp.position)
        temp = temp.parent
      }

      return path.reverse()
    }

    closedSet.add(`${current.position.x},${current.position.y}`)

    // Check neighbors
    const neighbors = getNeighbors(current.position)
    for (const neighbor of neighbors) {
      if (closedSet.has(`${neighbor.x},${neighbor.y}`)) continue

      const tentativeG = current.g + 1

      const existingNode = openSet.find(
        (node) => node.position.x === neighbor.x && node.position.y === neighbor.y,
      )

      if (!existingNode || tentativeG < existingNode.g) {
        const h = heuristic(neighbor, goal)
        const f = tentativeG + h
        openSet.push({ position: neighbor, g: tentativeG, h, f, parent: current })

        // if (!entityHasCollision({ position: neighbor, size: { x: 1, y: 1 } })) {
        //   if (existingNode) {
        //     existingNode.g = tentativeG
        //     existingNode.h = h
        //     existingNode.f = f
        //     existingNode.parent = current
        //   } else {
        //     openSet.push({ position: neighbor, g: tentativeG, h, f, parent: current })
        //   }
        // }
      }
    }
  }

  return null // No path found
}

function getNeighbors(position: Vector3Interface): Vector3Interface[] {
  return [
    { x: position.x + 1, y: position.y, z: position.z },
    { x: position.x - 1, y: position.y, z: position.z },
    { x: position.x, y: position.y + 1, z: position.z },
    { x: position.x, y: position.y - 1, z: position.z },
  ]
}

export function interpolatePath(
  path: Vector3Interface[],
  steps: number,
): Vector3Interface[] {
  const interpolatedPath: Vector3Interface[] = []

  for (let i = 0; i < path.length - 1; i++) {
    const start = path[i]
    const end = path[i + 1]

    interpolatedPath.push(start)

    for (let j = 1; j <= steps; j++) {
      const t = j / steps
      const x = start.x + t * (end.x - start.x)
      const y = start.y + t * (end.y - start.y)
      const z = (start.z ?? 0) + t * ((end.z ?? 0) - (start.z ?? 0))
      path.push({ x, y, z })
    }
  }

  interpolatedPath.push(path[path.length - 1])

  return interpolatedPath
}
