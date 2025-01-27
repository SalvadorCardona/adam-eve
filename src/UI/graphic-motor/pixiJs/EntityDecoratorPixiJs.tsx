import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"
import React, { useMemo, useState } from "react"
import useGameContext from "@/src/UI/provider/useGameContext"
import { Graphics } from "@/src/UI/graphic-motor/pixiJs/components/Graphics"
import { Container } from "@/src/UI/graphic-motor/pixiJs/components/Container"
import { ContainerChild } from "pixi.js/lib/scene/container/Container"
import { config } from "@/src/app/config"
import EntityInterface from "@/src/game/entity/EntityInterface"
import {
  Sprite,
  SpriteAnimated,
  SpriteAnimation,
} from "@/src/UI/graphic-motor/pixiJs/components/Sprite"
import { Ticker } from "pixi.js"
import { EntityState } from "@/src/game/entity/EntityState"
import { getMetaData } from "@/src/game/game/app/getMetaData"
import { Vector2Interface } from "@/src/utils/math/Vector"
import { useGamePubSub } from "@/src/UI/hook/useGameFrame"

export interface EntityDecoratorResolverPropsInterface {
  color?: string
  entity: EntityInterface
}

export const EntityDecoratorPixiJs = ({
  entity,
  color,
}: EntityDecoratorResolverPropsInterface) => {
  const [, setVersion] = useState(entity["@version"])

  const entityMetaData = getMetaData(entity) as EntityMetaDataInterface
  const game = useGameContext().game

  useGamePubSub(entity["@id"], () => {
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
  }, [entity])

  const { width, height } = useMemo(() => {
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

  const scale = useMemo(() => {
    if (!entity.rotation) return undefined
    return {
      x: entity.rotation < 0 ? -1 : 1,
      y: 1,
    }
  }, [entity.rotation])
  //
  // const rotation = useMemo(() => {
  //   if (!entity.rotation) return undefined
  //
  //   return entity.rotation - Math.PI / 2
  // }, [entity.rotation])

  return (
    <Container
      options={{
        width: width,
        height: height,
        zIndex: entity.position.y,
      }}
      position={position}
      scale={scale}
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

      {/*{isCharacterEntity(entity) && (*/}
      {/*  <>*/}
      {/*    <Graphics*/}
      {/*      draw={(g) => {*/}
      {/*        g.rect(0, 0, size.x, size.y)*/}
      {/*        g.fill({ color: 0xffff00, alpha: 0.5 })*/}
      {/*      }}*/}
      {/*    />*/}
      {/*    <Sprite*/}
      {/*      options={{ width, height, zIndex: entity.position.y - 1 }}*/}
      {/*      image={assetList.arrowDirectionnal}*/}
      {/*    ></Sprite>*/}
      {/*  </>*/}
      {/*)}*/}
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
    console.warn("Component 2D not found with", metaData)

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

  const spriteSheetData = useMemo(() => {
    return (
      entity.state &&
      metaData.asset?.animationMapper &&
      metaData.asset?.animationMapper[entity.state]
    )
  }, [entity.state])

  if (spriteSheetData) {
    return <SpriteAnimated spriteSheetData={spriteSheetData} />
  }

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
  [EntityState.under_construction]: (e: Ticker, item: ContainerChild) => {
    item.alpha = 0.5
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
  [EntityState.move]: (e: Ticker, item: ContainerChild) => {
    const deform = 0.1
    const speed = 0.01
    // const scaleFactor = (1 - deform * Math.abs(Math.cos(e.lastTime * speed))) / 1.9
    const scaleFactor = Math.cos(e.lastTime * speed) * deform

    // item.position.x += scaleFactor
    item.position.y += scaleFactor
    item.rotation += scaleFactor / 4
  },
  [EntityState.cut_the_tree]: (e: Ticker, item: ContainerChild) => {
    const deform = 0.1
    const speed = 0.01
    // const scaleFactor = (1 - deform * Math.abs(Math.cos(e.lastTime * speed))) / 1.9
    const scaleFactor = Math.cos(e.lastTime * speed) * deform

    // item.position.x += scaleFactor
    item.position.y += scaleFactor
    item.rotation += scaleFactor / 4
  },
}
