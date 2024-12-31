import { GroundInterface, GroundNetwork, Vector2Interface } from "@/context.txt"

type PathResult = {
  path: GroundInterface[] // IDs of the nodes in the path
  totalDistance: number
}

function findClosestNode(
  target: Vector2Interface,
  groundNetwork: GroundNetwork,
  tolerance: number = 0.5,
): GroundInterface | undefined {
  return groundNetwork.find(
    (node) =>
      Math.abs(node.position.x - target.x) <= tolerance &&
      Math.abs(node.position.y - target.y) <= tolerance,
  )
}

const calculateDistance = (a: Vector2Interface, b: Vector2Interface): number => {
  return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2))
}

export function findShortestPath(
  start: Vector2Interface,
  end: Vector2Interface,
  groundNetwork: GroundNetwork,
): PathResult | null {
  const nodes = new Map(groundNetwork.map((node) => [node["@id"], node]))

  const startNode = findClosestNode(start, groundNetwork)
  const endNode = findClosestNode(end, groundNetwork)

  if (!endNode || !startNode) {
    throw new Error("node notfound")
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
          Math.pow(neighborNode.position.y - currentNode.position.y, 2),
      )

      const newDistance = currentDistance + distanceToNeighbor

      if (newDistance < distances.get(neighborId)!) {
        distances.set(neighborId, newDistance)
        previousNodes.set(neighborId, currentId)
      }
    })
  }

  const path: GroundInterface[] = []
  let currentNodeId: string | null = endId
  let totalDistance = 0

  while (currentNodeId) {
    const currentNode = nodes.get(currentNodeId)
    const previousNodeId = previousNodes.get(currentNodeId)
    const previousNode = previousNodeId ? nodes.get(previousNodeId) : null
    const distance = previousNode
      ? calculateDistance(previousNode.position, currentNode.position)
      : 0
    totalDistance += distance
    path.unshift(currentNode)
    currentNodeId = previousNodeId
  }

  return path[0]?.["@id"] === startId ? { path, totalDistance } : null
}
