import EntityInterface from "@/src/domain/entity/EntityInterface"
import { getMetaData } from "@/src/game/configGame"
import { vector3ToArray } from "@/src/domain/3D/Vector"
import { imgLoader } from "@/src/domain/3D/textureHelper"
import React, { useMemo } from "react"

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
    <sprite scale={vector3ToArray(entity.size)}>
      <spriteMaterial attach="material" map={image} />
    </sprite>
  )
}
