import { EntityMetaDataInterface } from "@/app/domain/entity/EntityMetaDataInterface"
import { vector3ToArray } from "@/app/domain/3D/Vector"
import { useEffect } from "react"
import { entityFactory } from "@/app/domain/entity/entityFactory"
import { useGLTF } from "@react-three/drei"

export enum Controls {
  up = "up",
  down = "down",
  left = "left",
  right = "right",
  jump = "jump",
}

useGLTF.preload("./low_poly_human.glb")

export const characterEntityMetaData: EntityMetaDataInterface = {
  factory: entityFactory,
  ["@type"]: "personnage/character",
  onFrame: ({ entity, game }) => {
    // const three = findClosest(entity, houseEntityMetaData.type, game)
    // console.log(three)
    // if (!three) return
    //
    // const positions = generatePathCoordinates(entity.position, three.position, 4)
    // console.log(positions)
    // if (areVectorsEqual(entity.position, positions[0])) {
    //   entity.position = positions[1]
    // } else {
    //   entity.position = positions[0]
    // }
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
    const glb = useGLTF("./low_poly_human.glb") // Load the GLB model
    return (
      <primitive
        object={glb.scene}
        scale={[0.5, 0.5, 0.5]}
        position={vector3ToArray(entity.position)}
      />
    )
  },
}
