import { Plane } from "@react-three/drei"
import React, { useEffect, useState } from "react"
import { DoubleSide, Raycaster, Vector2 } from "three"
import { useThree } from "@react-three/fiber"

interface CreateBuildingPropsInterface {}

export const SelectOnMap = ({}: CreateBuildingPropsInterface) => {
  const [size, setSize] = useState<[Number, Number]>([1, 1])
  const [position, setPosition] = useState<[Number, Number, Number]>([0, 0, 0])
  const [isDragging, setIsDragging] = useState(false)
  const [startPosition, setStartPosition] = useState<
    [Number, Number, Number] | null
  >(null)
  const { camera, scene } = useThree()
  const raycaster = new Raycaster()
  const mouse = new Vector2()

  const handleMouseMove = (event: MouseEvent) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
    raycaster.setFromCamera(mouse, camera)
    const intersects = raycaster.intersectObjects(scene.children)

    if (intersects.length > 0) {
      const intersect = intersects[0]
      const point = intersect.point

      if (isDragging && startPosition) {
        const width = Math.abs(point.x - startPosition[0])
        const height = Math.abs(point.z - startPosition[2])
        setSize([width, height])
        setPosition([
          (point.x + startPosition[0]) / 2,
          0.1,
          (point.z + startPosition[2]) / 2,
        ])
      } else {
        setPosition([point.x, 0.1, point.z])
      }
    }
  }

  const handleMouseDown = (event: MouseEvent) => {
    setIsDragging(true)
    raycaster.setFromCamera(mouse, camera)
    const intersects = raycaster.intersectObjects(scene.children)
    if (intersects.length > 0) {
      const intersect = intersects[0]
      setStartPosition([intersect.point.x, 0.1, intersect.point.z])
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    setStartPosition(null)
  }

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging, startPosition])

  return (
    <Plane args={size} position={position} rotation={[-Math.PI / 2, 0, 0]}>
      <meshBasicMaterial
        color="green"
        transparent={true}
        opacity={0.5}
        side={DoubleSide}
      />
    </Plane>
  )
}
