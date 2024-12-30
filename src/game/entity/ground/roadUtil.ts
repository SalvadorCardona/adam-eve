import createUniqId from "@/src/utils/id/createUniqId"
import {
  GroundInterface,
  GroundNetwork,
} from "@/src/game/entity/ground/GroundInterface"
import { jsonLdFactory } from "@/src/utils/jsonLd/jsonLd"

function updateRoad({ grid }: { grid: GroundNetwork }) {
  const size = 1

  grid.forEach((road) => {
    // Reset connections
    road.connections = {
      top: undefined,
      bottom: undefined,
      left: undefined,
      right: undefined,
    }

    // Check for neighboring roads and update connections
    grid.forEach((otherRoad) => {
      if (road.id !== otherRoad.id) {
        if (
          road.position.x === otherRoad.position.x &&
          road.position.y === otherRoad.position.y + size
        ) {
          road.connections.top = road["@id"]
        }
        if (
          road.position.x === otherRoad.position.x &&
          road.position.y + 1 === otherRoad.position.y
        ) {
          road.connections.bottom = road["@id"]
        }
        if (
          road.position.y === otherRoad.position.y &&
          road.position.x === otherRoad.position.x + 1
        ) {
          road.connections.left = road["@id"]
        }
        if (
          road.position.y === otherRoad.position.y &&
          road.position.x + 1 === otherRoad.position.x
        ) {
          road.connections.right = road["@id"]
        }
      }
    })
  })
}

export function createRoad(
  grid: GroundNetwork,
  position: { x: number; y: number },
  type?: string,
) {
  const newRoad = jsonLdFactory<GroundInterface>((type ?? "road") + "/item", {
    id: createUniqId(),
    position,
    connections: {
      top: undefined,
      bottom: undefined,
      left: undefined,
      right: undefined,
    },
  })

  grid.push(newRoad)

  updateRoad({ grid })

  console.log(newRoad)
  return newRoad
}
