import {
  GroundInterface,
  GroundNetwork,
} from "@/src/game/entity/ground/GroundInterface"
import { Vector2Interface } from "@/src/game/3D/Vector"

type Position = { x: number; y: number }
type Connection = { [direction: string]: string }

function findClosestNode(
  roadNetwork: GroundNetwork,
  target: Vector2Interface,
): GroundInterface | null {
  let closestNode: GroundInterface | null = null
  let minDistance = Infinity
  for (const node of roadNetwork) {
    const distance = Math.sqrt(
      Math.pow(node.position.x - target.x, 2) +
        Math.pow(node.position.y - target.y, 2),
    )

    if (distance < minDistance) {
      minDistance = distance
      closestNode = node
    }
  }

  return closestNode
}

export function findPath({
  roadNetwork,
  start,
  end,
}: {
  roadNetwork: GroundNetwork
  start: Vector2Interface
  end: Vector2Interface
}): string[] | null {
  const startNode = findClosestNode(roadNetwork, start)
  const endNode = findClosestNode(roadNetwork, end)

  if (!startNode || !endNode) {
    return null // Start or end position not found in the network
  }

  const queue: { node: GroundInterface; path: string[] }[] = [
    { node: startNode, path: [startNode["@id"]] },
  ]
  const visited = new Set<string>()
  console.log(queue)
  while (queue.length > 0) {
    const { node, path } = queue.shift()!
    if (node["@id"] === endNode["@id"]) {
      return path // Path found
    }
    console.log(node)
    visited.add(node["@id"])

    for (const direction of Object.keys(node.connections)) {
      const neighborId = node.connections[direction]
      if (!visited.has(neighborId)) {
        console.log("ici")
        const neighborNode = roadNetwork.find((item) => item.id === neighborId)
        if (neighborNode) {
          queue.push({ node: neighborNode, path: [...path, neighborNode["@id"]] })
        }
      }
    }
  }

  debugger

  return null // No path found
}
