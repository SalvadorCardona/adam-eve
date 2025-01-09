import { Plane } from "@react-three/drei"
import React, { useEffect, useState } from "react"
import { DoubleSide, Raycaster, Vector2 } from "three"
import { useThree } from "@react-three/fiber"
import useGameContext from "@/src/UI/provider/useGameContext"
import {
  arrayToVector3,
  Vector3Interface,
  vector3ToArray,
} from "@/src/utils/3Dmath/Vector"
import { onSelectEntityUserActionMetadata } from "@/src/game/actionUser/app/SelectUserAction/onSelectEntityUserActionMetadata"
import { createBounding3D } from "@/src/utils/3Dmath/boudingBox"
import { aroundVector } from "@/src/utils/3Dmath/aroundVector"
import { entityQuery } from "@/src/game/entity/useCase/query/entityQuery"

interface CreateBuildingPropsInterface {}

const raycaster = new Raycaster()
const mouse = new Vector2()

export const SelectOnMap = ({}: CreateBuildingPropsInterface) => {
  const [size, setSize] = useState<Vector3Interface | undefined>(undefined)
  const [position, setPosition] = useState<Vector3Interface>({ x: 0, z: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [startPosition, setStartPosition] = useState<Vector3Interface>({
    x: 0,
    z: 0,
    y: 0,
  })
  const { camera, scene } = useThree()
  const game = useGameContext().game

  const handleMouseMove = (event: MouseEvent) => {
    if (!isGame(event)) return
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
    raycaster.setFromCamera(mouse, camera)
    const intersects = raycaster.intersectObjects(scene.children)
    if (!intersects.length) return

    const intersect = intersects[0]
    const point = intersect.point

    game.userControl.mouseState.bounding3D.position = arrayToVector3([
      point.x,
      point.y,
      point.z,
    ])

    if (!isDragging) {
      game.userControl.mouseState.bounding3D.size = { x: 0, z: 0, y: 0 }
      setSize({ x: 0, y: 0, z: 0 })
      const entities = entityQuery(game, {
        circleSearch: {
          center: game.userControl.mouseState.bounding3D.position,
          radius: 1,
        },
      })

      if (entities.length) {
        game.userControl.entitySelectedByHover = entities[0]["@id"]
      }

      return
    }

    const width = Math.abs(point.x - startPosition.x)
    const height = Math.abs(point.z - startPosition.z)
    const depths = Math.abs(point.y - startPosition.y)

    const newPosition = aroundVector({
      x: (point.x + startPosition.x) / 2,
      y: (point.y + startPosition.y) / 2,
      z: (point.z + startPosition.z) / 2,
    })

    const newSize = aroundVector({
      x: width,
      y: depths,
      z: height,
    })

    game.userControl.mouseState.bounding3D = createBounding3D({
      size: newSize,
      position: newPosition,
    })

    setSize(newSize)
    setPosition(newPosition)
  }

  const handleMouseDown = (event: MouseEvent) => {
    if (!isGame(event)) return
    // ici on reste appuyé
    setIsDragging(true)

    raycaster.setFromCamera(mouse, camera)
    const intersects = raycaster.intersectObjects(scene.children)
    if (!intersects.length) return

    const intersect = intersects[0]
    setStartPosition(intersect.point)
  }

  const handleMouseUp = (event: MouseEvent) => {
    if (!isGame(event)) return
    // on lache ici
    setIsDragging(false)
  }

  const isGame = (event: MouseEvent): boolean => {
    // @ts-ignore
    return event.target && event.target.tagName === "CANVAS"
  }

  useEffect(() => {
    if (isDragging) return

    onSelectEntityUserActionMetadata.onSelectZone({
      game: game,
    })
  }, [isDragging])

  useEffect(() => {
    window.addEventListener("mouseup", handleMouseUp)
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mousedown", handleMouseDown)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging, startPosition])

  if (!size) return

  return (
    <Plane
      args={[size.x, size.z]}
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
