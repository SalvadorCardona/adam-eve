import { EntityMetaDataInterface } from "@/app/game/domain/EntityMetaDataInterface"
import { jsonLdFactory } from "@/packages/utils/jsonLd/jsonLd"
import EntityInterface from "@/app/game/domain/EntityInterface"
import { imgLoader } from "@/app/game/util/textureHelper"
import imageSource from "./img.png"
import { vector3ToArray } from "@/app/game/domain/Vector"
import { useEffect } from "react"

const image = imgLoader(imageSource.src, "un")

export enum Controls {
  up = "up",
  down = "down",
  left = "left",
  right = "right",
  jump = "jump",
}

export const characterEntityMetaData: EntityMetaDataInterface = {
  factory: () => {
    return jsonLdFactory<EntityInterface>("personnage/character",
      {
        position: {
          x: 1,
          y: 0.1,
          z: 1
        },
        life: 60,
        size: {
          x: 1,
          y: 1,
          z: 1
        }
      }
    )
  },
  type: "personnage/character",
  onFrame: ({ entity, game }) => {
    // entity.position.x += Math.random() * 0.2 - 0.1
    // entity.position.z += Math.random() * 0.2 - 0.1
    //
    // updateContainer(game, entity)
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
        <mesh position={vector3ToArray(entity.position)} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[entity.size.x, entity.size.y]} />
          <meshStandardMaterial
            attach="material"
            transparent={true}
            map={image}
          />
        </mesh>
      </>
    )
  }
}
