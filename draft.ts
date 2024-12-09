// const line = 50
// const count = line * line
// const halfSize = line / 2
// const temp = new Object3D()
// const instancedMeshRef = useRef<InstancedMesh>() as MutableRefObject<InstancedMesh>
// const grass = useLoader(TextureLoader, "/grass2.png")
// const gameContext = useGameContext()
//
// useEffect(() => {
//   let localCount = 0
//   // Set positions
//   for (let x = -halfSize; x < halfSize; x++) {
//     for (let y = -halfSize; y < halfSize; y++) {
//       temp.position.set(x, -0.5, y)
//       temp.updateMatrix()
//       instancedMeshRef.current.setMatrixAt(localCount, temp.matrix)
//       localCount++
//     }
//   }
//
//   // Update the instance
//   instancedMeshRef.current.instanceMatrix.needsUpdate = true
// }, [])


import { getByTypeInContainer } from "@/packages/container/container"

const character = getByTypeInContainer(
  gameContext.game.entities,
  characterEntityMetaData["@type"],
)[0] as EntityInterface

const action = goToDirectionMetaData.factory({
  entity: character,
  target: e.point as Vector3Interface,
})


import { EntityMetaDataInterface } from "@/app/domain/entity/EntityMetaDataInterface"
import { Vector3Interface, vector3ToArray } from "@/app/domain/3D/Vector"
import { useEffect } from "react"
import { entityFactory } from "@/app/domain/entity/entityFactory"
import { useGLTF } from "@react-three/drei"
import EntityInterface from "@/app/domain/entity/EntityInterface"
import { goToDirectionMetaData } from "@/app/game/action/goToDirectionMetaData"

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
  onFrame: ({ entity, game }) => {},
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
