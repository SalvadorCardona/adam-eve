import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"
import { entityMedataFactory } from "@/src/game/entity/EntityMedataFactory"
import React from "react"
import EntityInterface from "@/src/game/entity/EntityInterface"
import { entityFactory } from "@/src/game/entity/entityFactory"
import { currentGame } from "@/src/game/game/gameFactory"
import { getByLdType } from "@/src/container/container"
import { createRoad } from "@/src/game/entity/app/road/roadUtil"
import { imgLoader } from "@/src/game/3D/textureHelper"
import roadTextureSrc from "./roadtexture.png"
import { Texture } from "three"
import roadIcon from "./roadIcon.png"
import waterIcon from "./waterIcon.png"
import waterTextureSrc from "./waterTexture.png"
import grassIcon from "./grassIcon.png"
import grassTexturesrc from "./grassTexture.png"

const waterTexture = imgLoader(waterTextureSrc, "water")
const roadTexture = imgLoader(roadTextureSrc, "road")
const grassTexture = imgLoader(grassTexturesrc, "road")

export type Ground = {
  id: string // Identifiant unique de la route
  position: { x: number; y: number } // Position dans le monde (grille ou absolue)
  type: string
  connections: {
    top?: boolean
    bottom?: boolean
    left?: boolean
    right?: boolean
  } // Connexions possibles
}

export interface GroundEntityInterface extends EntityInterface {
  roadNetwork: GroundNetwork
}

export type GroundNetwork = Ground[]

export const typeRoad = "entity/ground/road"
export const typeWater = "entity/ground/water"

export const typeGrass = "entity/ground/grass"

const groundMetaDataFactory = ({
  type,
  icon,
  texture,
}: {
  type: string
  icon: string
  texture: Texture
}) => {
  const roadEntityArgs: Partial<EntityMetaDataInterface<GroundEntityInterface>> = {
    asset: {
      icon,
    },
    ["@type"]: type,
    factory: function (payload) {
      const entity = payload?.entity ?? {}
      entity["@type"] = type
      const oldPosition = { ...entity.position }
      const newRoad: GroundEntityInterface = entityFactory({ entity })
      newRoad.position = { x: 0, y: 0, z: 0 }
      const game = currentGame()

      if (payload?.context === "build-request") {
        return entityFactory({ entity })
      }

      const roadEntity =
        (getByLdType(game.entities, type)[0] as GroundEntityInterface) ??
        entityFactory({ entity })

      roadEntity.position = { x: 0, y: 0, z: 0 }

      createRoad(
        roadEntity.roadNetwork,
        {
          x: oldPosition.x ?? 0,
          y: oldPosition.y ?? 0,
        },
        entity["@type"],
      )

      return roadEntity
    },
    component: ({ entity }) => {
      const roads = entity.roadNetwork

      return (
        <>
          {roads.map((road) => (
            <mesh key={road.id} position={[road.position.x, road.position.y, 0]}>
              <planeGeometry args={[entity.size.x, entity.size.y]} />
              <meshStandardMaterial attach="material" map={texture} />
            </mesh>
          ))}
        </>
      )
    },
    defaultEntity: function () {
      return {
        roadNetwork: [],
        size: {
          x: 1,
          y: 1,
          z: 1,
        },
        position: {
          x: 0,
          y: 0,
          z: 0,
        },
      }
    },
  }

  return roadEntityArgs
}

export const roadEntityMetadata = entityMedataFactory<
  EntityMetaDataInterface<GroundEntityInterface>
>(
  groundMetaDataFactory({
    icon: roadIcon,
    type: typeRoad,
    texture: roadTexture,
  }),
)

export const waterEntityMetadata = entityMedataFactory<
  EntityMetaDataInterface<GroundEntityInterface>
>(
  groundMetaDataFactory({
    icon: waterIcon,
    type: typeWater,
    texture: waterTexture,
  }),
)

export const grassEntityMetadata = entityMedataFactory<
  EntityMetaDataInterface<GroundEntityInterface>
>(
  groundMetaDataFactory({
    icon: grassIcon,
    type: typeGrass,
    texture: grassTexture,
  }),
)
