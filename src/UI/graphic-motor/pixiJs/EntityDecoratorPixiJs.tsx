import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"
import React, { useMemo, useState } from "react"
import useGameContext from "@/src/UI/provider/useGameContext"
import { Graphics } from "@/src/UI/graphic-motor/pixiJs/components/Graphics"
import { Container } from "@/src/UI/graphic-motor/pixiJs/components/Container"
import {
  ContainerChild,
  ContainerOptions,
} from "pixi.js/lib/scene/container/Container"
import { config } from "@/src/app/config"
import EntityInterface from "@/src/game/entity/EntityInterface"
import {
  Sprite,
  SpriteAnimation,
} from "@/src/UI/graphic-motor/pixiJs/components/Sprite"
import { Ticker } from "pixi.js"
import { EntityState } from "@/src/game/entity/EntityState"
import { getMetaData } from "@/src/game/game/app/getMetaData"
import { Vector2Interface } from "@/src/utils/3Dmath/Vector"
import { useGamePubSub } from "@/src/UI/hook/useGameFrame"

export interface EntityDecoratorResolverPropsInterface {
  color?: string
  entity: EntityInterface
}

export const EntityDecoratorPixiJs = ({
  entity,
  color,
}: EntityDecoratorResolverPropsInterface) => {
  const [version, setVersion] = useState(entity["@version"])

  const entityMetaData = getMetaData(entity) as EntityMetaDataInterface
  const game = useGameContext().game

  useGamePubSub(entity["@id"], (e) => {
    setVersion(entity["@version"])
  })

  const isSelected = useMemo(() => {
    return game.userControl.entitiesSelected.includes(entity["@id"])
  }, [game.userControl.entitiesSelected])

  const EntityComponent = useMemo(() => {
    if (entityMetaData.component) return entityMetaData.component

    return Model2DPixiJs
  }, [])

  const size = useMemo<Vector2Interface>(() => {
    return entityMetaData?.propriety?.size
      ? {
          x: entityMetaData.propriety.size.x ?? 0,
          y: entityMetaData.propriety.size.y ?? 0,
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
  }, [entity.position.x, entity.position.z])

  return (
    <Container
      options={{ ...options, zIndex: entity.position.y }}
      position={position}
    >
      <EntityComponent entity={entity} />
      {color && (
        <Graphics
          draw={(g) => {
            g.rect(0, 0, size.x, size.y)
            g.fill({ color, alpha: 0.5 })
          }}
        />
      )}
      {isSelected && (
        <Graphics
          draw={(g) => {
            g.rect(0, 0, size.x, size.y)
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

  const animation = useMemo(() => {
    if (entity.state && entity.state in entityAnimation)
      return entityAnimation[entity.state]
    return undefined
  }, [entity.state])

  return <Sprite image={asset} options={size} animation={animation} />
}

const entityAnimation: Partial<Record<EntityState, SpriteAnimation>> = {
  [EntityState.wait]: (e: Ticker, item: ContainerChild) => {
    const deform = 0.1
    const speed = 0.001
    const scaleFactor = 1 - deform * Math.abs(Math.cos(e.lastTime * speed))

    item.scale.x = scaleFactor / 5
    item.scale.y = scaleFactor / 5
  },
  [EntityState.find_enemy]: (e: Ticker, item: ContainerChild) => {
    const deform = 0.1
    const speed = 0.01
    // const scaleFactor = (1 - deform * Math.abs(Math.cos(e.lastTime * speed))) / 1.9
    const scaleFactor = Math.cos(e.lastTime * speed) * deform

    // item.position.x += scaleFactor
    item.position.y += scaleFactor
    item.rotation += scaleFactor / 4
  },
}
