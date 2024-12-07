import EntityInterface from "@/app/domain/entity/EntityInterface"
import { getMetaData } from "@/app/game/configGame"
import { vector3ToArray } from "@/app/domain/3D/Vector"
import { imgLoader } from "@/app/domain/3D/textureHelper"
import { useMemo } from "react"

interface Model2DPropsInterface {
  entity: EntityInterface
}

export const Model2D = ({ entity }: Model2DPropsInterface) => {
  const metaData = getMetaData(entity)
  if (!metaData.asset?.model2d) {
    console.warn("Component 2D not found")

    return
  }

  const image = useMemo(
    () => imgLoader(metaData.asset.model2d, "un"),
    [metaData.asset.model2d],
  )

  return (
    <mesh position={vector3ToArray(entity.position)} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[entity.size.x, entity.size.y]} />
      <meshStandardMaterial attach="material" map={image} />
    </mesh>
  )
}
