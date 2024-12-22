import { Ground, GroundNetwork } from "@/src/game/entity/app/road/RoadEntityMetadata"
import { Mesh, MeshStandardMaterial, TextureLoader } from "three"
import createUniqId from "@/src/utils/id/createUniqId"

function updateRoad(grid: GroundNetwork) {
  const size = 1
  grid.forEach((road) => {
    // Reset connections
    road.connections = { top: false, bottom: false, left: false, right: false }

    // Check for neighboring roads and update connections
    grid.forEach((otherRoad) => {
      if (road.id !== otherRoad.id) {
        if (
          road.position.x === otherRoad.position.x &&
          road.position.y === otherRoad.position.y + size
        ) {
          road.connections.top = true
        }
        if (
          road.position.x === otherRoad.position.x &&
          road.position.y + 1 === otherRoad.position.y
        ) {
          road.connections.bottom = true
        }
        if (
          road.position.y === otherRoad.position.y &&
          road.position.x === otherRoad.position.x + 1
        ) {
          road.connections.left = true
        }
        if (
          road.position.y === otherRoad.position.y &&
          road.position.x + 1 === otherRoad.position.x
        ) {
          road.connections.right = true
        }
      }
    })
  })
}

export function createRoad(
  grid: GroundNetwork,
  position: { x: number; y: number },
  type?: string,
): void {
  const newRoad: Ground = {
    type: type ?? "road",
    id: createUniqId(),
    position,
    connections: {
      top: false,
      bottom: false,
      left: false,
      right: false,
    },
  }

  grid.push(newRoad)

  updateRoad(grid)
}

function applyConnectionTexture(road: Ground, mesh: Mesh) {
  const textureLoader = new TextureLoader()

  if (road.connections.top && road.connections.left) {
    const curveTexture = textureLoader.load("/textures/curve.png") // Texture de courbe
    ;(mesh.material as MeshStandardMaterial).map = curveTexture
  } else if (road.connections.top) {
    const verticalTexture = textureLoader.load("/textures/vertical.png") // Route droite verticale
    ;(mesh.material as MeshStandardMaterial).map = verticalTexture
  } else {
    const defaultTexture = textureLoader.load("/textures/default.png") // Texture par défaut
    ;(mesh.material as MeshStandardMaterial).map = defaultTexture
  }
}
