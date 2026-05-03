import {
  EntityResourceInterface,
  EntityType,
} from "@/packages/game/entity/EntityResourceInterface"
import React, { useCallback, useMemo, useState } from "react"
import useGameContext from "@/packages/ui/provider/useGameContext"
import { Graphics } from "@/packages/ui/graphic-motor/pixiJs/components/Graphics"
import { Container } from "@/packages/ui/graphic-motor/pixiJs/components/Container"
import { ContainerChild, FederatedPointerEvent, SpritesheetData } from "pixi.js"
import EntityInterface from "@/packages/game/entity/EntityInterface"
import {
  Sprite,
  SpriteAnimated,
  SpriteAnimation,
} from "@/packages/ui/graphic-motor/pixiJs/components/Sprite"
import { Ticker } from "pixi.js"
import { EntityState } from "@/packages/game/entity/EntityState"
import { getResource } from "@/packages/resource/ResourceInterface"
import { Vector2Interface, vector3ToVector2 } from "@/packages/math/vector"
import { useGamePubSub } from "@/packages/ui/hook/useGameFrame"
import { getEntitySize } from "@/packages/game/entity/useCase/query/getEntitySize"
import { vectorRatioUP } from "@/packages/math/ratio"
import { updateGame } from "@/packages/game/game/updateGame"

export interface EntityDecoratorResolverPropsInterface {
  color?: string
  entity: EntityInterface
}

export const EntityDecoratorPixiJs = ({
  entity,
  color,
}: EntityDecoratorResolverPropsInterface) => {
  const [, setVersion] = useState(entity["@version"])
  const entityMetaData = getResource(entity) as
    | EntityResourceInterface
    | undefined
  const game = useGameContext().game
  const [isSelected, setIsSelected] = useState<boolean>(false)
  useGamePubSub(entity["@id"], () => {
    setVersion(entity["@version"])
  })

  useGamePubSub(game.userControl["@id"], () => {
    const newIsSelected = game.userControl.entitySelected === entity["@id"]
    setIsSelected(newIsSelected)
  })

  const EntityComponent = useMemo(() => {
    if (entityMetaData?.component) return entityMetaData.component

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

  const zIndex = useMemo(() => {
    const sizeZ = entity.size?.z ?? 0
    return entity.position.z + sizeZ + entity.position.y * 0.01
  }, [entity.position.y, entity.position.z, entity.size?.z])

  const isSelectable = entity.entityType !== EntityType.ground

  const handlePointerTap = useCallback(
    (e: FederatedPointerEvent) => {
      if (game.userControl.currentAction) return
      e.stopPropagation()
      game.userControl.entitySelected = entity["@id"]
      updateGame(game, game.userControl)
    },
    [entity, game],
  )

  if (entity.hidden) return null

  return (
    <Container
      options={{
        ...dimension,
      }}
      position={position}
      scale={scale}
      zIndex={zIndex}
      cullable
      eventMode={isSelectable ? "static" : undefined}
      cursor={isSelectable ? "pointer" : undefined}
      onPointerTap={isSelectable ? handlePointerTap : undefined}
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
            g.circle(size.x / 2, size.y / 2, Math.max(size.x, size.y) / 2)
            g.stroke({ color: 0xffff00, width: 2, alpha: 1 })
          }}
        />
      )}
      {isSelected && entityMetaData?.propriety?.attack?.attackRange && (
        <Graphics
          draw={(g) => {
            const radius =
              entityMetaData.propriety.attack!.attackRange * game.camera.zoom
            g.circle(size.x / 2, size.y / 2, radius)
            g.stroke({ color: 0xff3333, width: 2, alpha: 0.6 })
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
  const metaData = getResource<EntityResourceInterface>(entity)
  const asset = metaData?.asset?.model2d ?? metaData?.asset?.icon
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

  if (spriteSheetData && typeof spriteSheetData !== "function") {
    return (
      <SpriteAnimated
        spriteSheetData={spriteSheetData as SpritesheetData}
        size={size}
      />
    )
  }

  const alpha =
    entity.state === EntityState.under_construction ? 0.5 : 1

  return (
    <Sprite
      image={asset}
      animation={animation}
      options={{ width: size.x, height: size.y }}
      alpha={alpha}
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
