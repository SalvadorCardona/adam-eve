import EntityInterface from "@/src/game/entity/EntityInterface"
import { Vector3Interface } from "./Vector"
import { distanceBetweenVector } from "@/src/utils/3Dmath/distanceBetweenVector"

type PathResult = {
  path: EntityInterface[]
  totalDistance: number
}

function findClosestNode(
  target: Vector3Interface,
  groundNetwork: EntityInterface[],
  tolerance: number = 1,
): EntityInterface | undefined {
  return groundNetwork.find(
    (node) =>
      Math.abs(node.position.x - target.x) <= tolerance &&
      Math.abs(node.position.z - target.z) <= tolerance,
  )
}

const calculateDistance = (a: Vector3Interface, b: Vector3Interface): number => {
  return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.z - a.z, 2))
}

export function findShortestPath(
  start: Vector3Interface,
  end: Vector3Interface,
  groundNetwork: EntityInterface[],
): PathResult | null {
  const nodes = new Map(groundNetwork.map((node) => [node["@id"], node]))
  const startNode = findClosestNode(start, groundNetwork)
  const endNode = findClosestNode(end, groundNetwork)

  if (!startNode) {
    throw new Error("start node notfound")
  }

  if (!endNode) {
    throw new Error("End node notfound")
  }

  const startId = startNode["@id"]
  const endId = endNode["@id"]

  if (!nodes.has(startId) || !nodes.has(endId)) {
    throw new Error("Invalid start or end ID")
  }

  const distances = new Map<string, number>()
  const previousNodes = new Map<string, string | null>()
  const unvisited = new Set<string>(nodes.keys())

  // Initialize distances
  nodes.forEach((_, id) => {
    distances.set(id, id === startId ? 0 : Infinity)
    previousNodes.set(id, null)
  })

  while (unvisited.size > 0) {
    // Get the node with the smallest distance
    const currentId = Array.from(unvisited).reduce((minId, nodeId) => {
      return distances.get(nodeId)! < distances.get(minId)! ? nodeId : minId
    })

    if (currentId === endId) {
      break // We've found the shortest path to the end node
    }

    unvisited.delete(currentId)

    const currentNode = nodes.get(currentId)!
    const currentDistance = distances.get(currentId)!

    // Update distances to neighbors
    Object.values(currentNode.connections).forEach((neighborId) => {
      if (!neighborId || !unvisited.has(neighborId)) return

      const neighborNode = nodes.get(neighborId)!
      const distanceToNeighbor = Math.sqrt(
        Math.pow(neighborNode.position.x - currentNode.position.x, 2) +
          Math.pow(neighborNode.position.z - currentNode.position.z, 2),
      )

      const newDistance = currentDistance + distanceToNeighbor

      if (newDistance < distances.get(neighborId)!) {
        distances.set(neighborId, newDistance)
        previousNodes.set(neighborId, currentId)
      }
    })
  }

  const path: EntityInterface[] = []
  let currentNodeId: string | null = endId
  let totalDistance = 0

  while (currentNodeId) {
    const currentNode = nodes.get(currentNodeId)
    const previousNodeId = previousNodes.get(currentNodeId)
    const previousNode = previousNodeId ? nodes.get(previousNodeId) : null
    const distance = previousNode
      ? distanceBetweenVector(previousNode.position, currentNode.position)
      : 0
    totalDistance += distance
    path.unshift(currentNode)
    currentNodeId = previousNodeId
  }

  return path[0]?.["@id"] === startId ? { path, totalDistance } : null
}
