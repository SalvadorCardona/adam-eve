import EntityInterface from "@/src/game/entity/EntityInterface"
import { getMetaData } from "@/src/game/game/app/configGame"
import { vector3ToArray } from "@/src/utils/3Dmath/Vector"
import { imageToTexture } from "@/src/utils/threejs/textureHelper"
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
    () => imageToTexture(metaData.asset.model2d, "un"),
    [metaData.asset.model2d],
  )

  return (
    <sprite scale={vector3ToArray(entity.size)}>
      <spriteMaterial attach="material" map={image} />
    </sprite>
  )
}
