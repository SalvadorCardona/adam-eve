import { Plane } from "@react-three/drei"
import React, { useEffect, useState } from "react"
import { DoubleSide, Raycaster, Vector2 } from "three"
import { useThree } from "@react-three/fiber"
import useGameContext from "@/src/UI/provider/useGameContext"
import {
  arrayToVector3,
  Vector2Interface,
  Vector3Interface,
  vector3ToArray,
} from "@/src/utils/3Dmath/Vector"
import { onSelectEntityUserActionMetadata } from "@/src/game/actionUser/app/SelectUserAction/onSelectEntityUserActionMetadata"

interface CreateBuildingPropsInterface {}

const raycaster = new Raycaster()
const mouse = new Vector2()
let mouseIsFree: boolean = true

export const SelectOnMap = ({}: CreateBuildingPropsInterface) => {
  const [size, setSize] = useState<Vector2Interface | undefined>(undefined)
  const [position, setPosition] = useState<Vector3Interface>({ x: 0, z: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [startPosition, setStartPosition] = useState<Vector3Interface | null>(null)
  const { camera, scene } = useThree()
  const game = useGameContext().game

  const newHandleMouseMove = (event: MouseEvent) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
    handleMouseMove(mouse)
  }

  const handleMouseMove = (mouse: Vector2) => {
    raycaster.setFromCamera(mouse, camera)
    const intersects = raycaster.intersectObjects(scene.children)
    if (!intersects.length) return

    const intersect = intersects[0]
    const point = intersect.point

    game.userControl.mouseState.mousePosition = arrayToVector3([
      point.x,
      point.y,
      point.z,
    ])

    if (isDragging && startPosition) {
      // on mouse reste appuyer
      const width = Math.abs(point.x - startPosition.x)
      const height = Math.abs(point.z - startPosition.z)

      const newPosition = {
        x: (point.x + startPosition.x) / 2,
        y: (point.y + startPosition.y) / 2,
        z: (point.z + startPosition.z) / 2,
      }

      const newSize = {
        x: width,
        y: height,
      }

      const newStartPosition = {
        x: newPosition.x - newSize.x / 2,
        y: newPosition.y,
        z: newPosition.z - newSize.y / 2,
      }

      const newEndPosition = {
        x: newStartPosition.x + newSize.x,
        y: newStartPosition.y,
        z: newStartPosition.z + newSize.y,
      }

      game.userControl.mouseState.startClickPositon = newStartPosition
      game.userControl.mouseState.endClickPosition = newEndPosition
      console.log("ici")
      setSize(newSize)
      setPosition(newPosition)
    } else {
      // on mouse move
      setPosition({
        x: point.x,
        y: point.y,
        z: point.z,
      })
    }
  }

  const handleMouseDown = () => {
    // ici on reste appuyé
    setIsDragging(true)
    mouseIsFree = false
    raycaster.setFromCamera(mouse, camera)
    const intersects = raycaster.intersectObjects(scene.children)
    if (!intersects.length) return

    const intersect = intersects[0]
    setStartPosition(intersect.point)
  }

  const handleMouseUp = (event: MouseEvent) => {
    console.log("on lache", event.type)
    // on lache ici
    setIsDragging(false)
    setSize({ x: 0, y: 0 })

    onSelectEntityUserActionMetadata.onSelectZone({
      game: game,
    })

    mouseIsFree = true
  }

  useEffect(() => {
    window.addEventListener("mouseup", handleMouseUp)
    window.addEventListener("mousemove", newHandleMouseMove)
    window.addEventListener("mousedown", handleMouseDown)
    return () => {
      window.removeEventListener("mousemove", newHandleMouseMove)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging, startPosition])

  if (!size) return

  return (
    <Plane
      args={[size.x, size.y]}
      position={vector3ToArray(position)}
      rotation={[-Math.PI / 2, 0, 0]}
    >
      <meshBasicMaterial
        color="green"
        transparent={true}
        opacity={0.5}
        side={DoubleSide}
      />
    </Plane>
  )
}
