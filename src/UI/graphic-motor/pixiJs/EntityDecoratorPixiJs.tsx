import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"
import { getMetaData } from "@/src/game/game/app/configGame"
import React, { useMemo, useState } from "react"
import useGameContext from "@/src/UI/provider/useGameContext"
import { EntityDecoratorResolverPropsInterface } from "@/src/UI/graphic-motor/EntityDecoratorResolver"
import { Graphics } from "@/src/UI/graphic-motor/pixiJs/components/Graphics"
import { Container } from "@/src/UI/graphic-motor/pixiJs/components/Container"
import { ContainerOptions } from "pixi.js/lib/scene/container/Container"
import { config } from "@/src/app/config"
import EntityInterface from "@/src/game/entity/EntityInterface"
import { Sprite } from "@/src/UI/graphic-motor/pixiJs/components/Sprite"
import { useGamePubSub } from "@/src/UI/hook/useGameFrame"

export const EntityDecoratorPixiJs = ({
  entity: baseEntity,
  color,
}: EntityDecoratorResolverPropsInterface) => {
  const [entity, setEntity] = useState(baseEntity)
  const entityMetaData = getMetaData(entity) as EntityMetaDataInterface
  const game = useGameContext().game

  useGamePubSub(entity["@id"], (e) => {
    setEntity({ ...e.item })
  })

  const isSelected = useMemo(() => {
    return game.userControl.entitiesSelected.includes(entity["@id"])
  }, [game.userControl.entitiesSelected])

  const EntityComponent = useMemo(() => {
    if (entityMetaData.component) return entityMetaData.component

    return Model2DPixiJs
  }, [])

  const size = useMemo<ContainerOptions>(() => {
    return entityMetaData?.propriety?.size
      ? {
          x: entityMetaData.propriety.size.x,
          y: entityMetaData.propriety.size.y,
        }
      : { x: 0, y: 0 }
  }, [])

  const options = useMemo<ContainerOptions>(() => {
    return {
      width: size.x,
      height: size.y,
    }
  }, [])

  const position = useMemo(() => {
    return {
      x: entity.position.x,
      y: entity.position.z,
    }
  }, [entity])

  return (
    <Container
      options={{ ...options, zIndex: entity.position.y }}
      position={position}
    >
      <EntityComponent entity={entity} />
      {color && (
        <Graphics
          draw={(g) => {
            g.rect(0, 0, entity.size.x, entity.size.z)
            g.fill({ color, alpha: 0.5 })
          }}
        />
      )}
      {isSelected && (
        <Graphics
          draw={(g) => {
            g.rect(0, 0, entity.size.x, entity.size.z)
            g.fill({ color: 0xffff00, alpha: 0.5 })
          }}
        />
      )}
    </Container>
  )
}

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

  const size = useMemo(() => {
    if (metaData?.propriety?.size)
      return {
        width: metaData.propriety.size.x,
        height: metaData.propriety.size.y,
      }

    console.warn("Problem with entity size")
    return {
      width: config.pixiJs2dItemSize,
      height: config.pixiJs2dItemSize,
    }
  }, [])

  return <Sprite image={asset} options={size} />
}
