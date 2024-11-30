import {
  baseFactory,
  EntityMetaDataInterface,
} from "@/app/game/domain/EntityMetaDataInterface"
import { imgLoader } from "@/app/game/util/textureHelper"
import imageSource from "./img.png"
import { areVectorsEqual, vector3ToArray } from "@/app/game/domain/Vector"
import { useEffect } from "react"
import { findClosest } from "@/app/game/domain/findClosest"
import { Vector3 } from "three"
import { houseEntityMetaData } from "@/app/game/entity/house/houseEntity"

const image = imgLoader(imageSource.src, "un")

export enum Controls {
  up = "up",
  down = "down",
  left = "left",
  right = "right",
  jump = "jump",
}

export function generatePathCoordinates(
  start: Vector3,
  end: Vector3,
  steps: number,
): Vector3[] {
  const path: Vector3[] = []
  for (let i = 0; i <= steps; i++) {
    const t = i / steps
    const x = start.x + t * (end.x - start.x)
    const y = start.y + t * (end.y - start.y)
    const z = start.z + t * (end.z - start.z)
    path.push({ x, y, z })
  }

  return path
}

export const characterEntityMetaData: EntityMetaDataInterface = {
  factory: baseFactory,
  type: "personnage/character",
  onFrame: ({ entity, game }) => {
    const three = findClosest(entity, houseEntityMetaData.type, game)
    console.log(three)
    if (!three) return

    const positions = generatePathCoordinates(entity.position, three.position, 4)
    console.log(positions)
    if (areVectorsEqual(entity.position, positions[0])) {
      entity.position = positions[1]
    } else {
      entity.position = positions[0]
    }
  },
  component: ({ entity }) => {
    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        let control = null
        switch (event.key) {
          case "ArrowUp":
            control = Controls.up
            entity.position.z -= 0.1 // Move forward
            break
          case "ArrowDown":
            control = Controls.down
            entity.position.z += 0.1 // Move backward
            break
          case "ArrowLeft":
            control = Controls.left
            entity.position.x -= 0.1 // Move left
            break
          case "ArrowRight":
            control = Controls.right
            entity.position.x += 0.1 // Move right
            break
          case "Space": // New case for jump
            control = Controls.jump
            entity.position.y += 0.5 // Jump up
            setTimeout(() => {
              entity.position.y -= 0.5 // Fall back down
            }, 500)
            break
          default:
            break
        }

        if (control) {
          console.log(control)
        }
      }

      window.addEventListener("keydown", handleKeyDown)
      return () => {
        window.removeEventListener("keydown", handleKeyDown)
      }
    }, [])
    return (
      <>
        <mesh
          position={vector3ToArray(entity.position)}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[entity.size.x, entity.size.y]} />
          <meshStandardMaterial attach="material" transparent={true} map={image} />
        </mesh>
      </>
    )
  },
}
