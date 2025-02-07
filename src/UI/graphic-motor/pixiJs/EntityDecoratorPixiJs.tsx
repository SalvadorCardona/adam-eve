import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"
import React, { useMemo, useState } from "react"
import useGameContext from "@/src/UI/provider/useGameContext"
import { Graphics } from "@/src/UI/graphic-motor/pixiJs/components/Graphics"
import { Container } from "@/src/UI/graphic-motor/pixiJs/components/Container"
import { ContainerChild } from "pixi.js/lib/scene/container/Container"
import EntityInterface from "@/src/game/entity/EntityInterface"
import {
  Sprite,
  SpriteAnimated,
  SpriteAnimation,
} from "@/src/UI/graphic-motor/pixiJs/components/Sprite"
import { Ticker } from "pixi.js"
import { EntityState } from "@/src/game/entity/EntityState"
import { getMetaData } from "@/src/utils/metadata/MetadataInterface"
import { Vector2Interface, vector3ToVector2 } from "@/src/utils/math/vector"
import { useGamePubSub } from "@/src/UI/hook/useGameFrame"
import { getEntitySize } from "@/src/game/entity/useCase/query/getEntitySize"
import { vectorRatioUP } from "@/src/utils/math/ratio"

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
  const [isSelected, setIsSelected] = useState<boolean>(false)
  useGamePubSub(entity["@id"], () => {
    setVersion(entity["@version"])
  })

  useGamePubSub(game.userControl["@type"], () => {
    const newIsSelected = game.userControl.entitiesSelected.includes(entity["@id"])
    setIsSelected(newIsSelected)
  })

  const EntityComponent = useMemo(() => {
    if (entityMetaData.component) return entityMetaData.component

    return Model2DPixiJs
  }, [])

  const size = useMemo<Vector2Interface>(() => {
    return vectorRatioUP(vector3ToVector2(getEntitySize(entity)), game.camera.zoom)
  }, [entity])

  const dimension = useMemo(() => {
    return {
      width: size.x,
      height: size.y,
    }
  }, [size])

  const position = useMemo(() => {
    return vectorRatioUP(vector3ToVector2(entity.position), game.camera.zoom)
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
        ...dimension,
        zIndex: entity.position.y,
      }}
      position={position}
      scale={scale}
    >
      <EntityComponent entity={entity} size={size} />
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
  size: Vector2Interface
}

export const Model2DPixiJs = ({ entity, size }: Model2DPropsInterface) => {
  const metaData = getMetaData<EntityMetaDataInterface>(entity)
  const asset = metaData.asset?.model2d ?? metaData.asset?.icon
  if (!asset) {
    console.warn("Component 2D not found with", metaData)

    return
  }

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

  return (
    <Sprite
      image={asset}
      animation={animation}
      options={{ width: size.x, height: size.y }}
    />
  )
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
