import EntityInterface from "@/src/game/entity/EntityInterface"
import { getMetaData } from "@/src/game/game/app/configGame"
import { Vector2Interface } from "@/src/utils/3Dmath/Vector"
import React, { useMemo } from "react"
import { Sprite } from "@pixi/react"
import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"
import { config } from "@/src/app/config"

interface Model2DPropsInterface {
  entity: EntityInterface
}

export const Model2DPixiJs = ({ entity }: Model2DPropsInterface) => {
  const metaData = getMetaData<EntityMetaDataInterface>(entity)
  const asset = metaData.asset?.model2d ?? metaData.asset?.icon
  if (!asset) {
    console.warn("Component 2D not found")

    return
  }

  const size = useMemo<Vector2Interface>(() => {
    if (metaData?.propriety?.size)
      return {
        x: metaData.propriety.size.x * config.pixiJs2dItemSize,
        y: metaData.propriety.size.y * config.pixiJs2dItemSize,
      }

    console.warn("Problem with entity size")
    return {
      x: config.pixiJs2dItemSize,
      y: config.pixiJs2dItemSize,
    }
  }, [])

  return <Sprite image={asset} x={size.x} y={size.y} />
}
