import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"
import { entityMedataFactory } from "@/src/game/entity/EntityMedataFactory"
import icons from "./icon.png"
import React from "react"
import EntityInterface from "@/src/game/entity/EntityInterface"
import { entityFactory } from "@/src/game/entity/entityFactory"
import { currentGame } from "@/src/game/game/gameFactory"
import { getByLdType } from "@/src/container/container"
import { createRoad } from "@/src/game/entity/app/road/roadUtil"

export type Road = {
  id: string // Identifiant unique de la route
  position: { x: number; y: number } // Position dans le monde (grille ou absolue)
  size: { width: number; height: number } // Dimensions du segment de route
  type: string
  connections: {
    top?: boolean
    bottom?: boolean
    left?: boolean
    right?: boolean
  } // Connexions possibles
}

export interface RoadEntityInterface extends EntityInterface {
  roadNetwork: RoadNetwork
}

export type RoadNetwork = Road[]

export const typeRoad = "entity/building/road"
const roadEntityArgs: Partial<EntityMetaDataInterface<RoadEntityInterface>> = {
  asset: {
    icon: icons,
  },
  ["@type"]: typeRoad,
  factory: (payload) => {
    const entity = payload?.entity ?? {}
    entity["@type"] = typeRoad
    const oldPosition = { ...entity.position }
    let newRoad: RoadEntityInterface = entityFactory({ entity })
    newRoad.position = { x: 0, y: 0, z: 0 }
    const game = currentGame()

    if (payload?.context === "build-request") {
      return entityFactory({ entity })
    }

    const roadEntity =
      (getByLdType(game.entities, typeRoad)[0] as RoadEntityInterface) ??
      entityFactory({ entity })

    createRoad(roadEntity.roadNetwork, {
      x: oldPosition.x ?? 0,
      y: oldPosition.y ?? 0,
    })

    return roadEntity
  },
  component: ({ entity }) => {
    const roads = entity.roadNetwork

    return (
      <>
        {roads.map((road) => (
          <mesh key={road.id} position={[road.position.x, road.position.y, 0]}>
            <planeGeometry args={[road.size.width, road.size.height]} />
            <meshStandardMaterial color="brown" />
          </mesh>
        ))}
      </>
    )
  },
  defaultEntity: () => {
    return {
      type: "road",
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

export const roadEntity =
  entityMedataFactory<EntityMetaDataInterface<RoadEntityInterface>>(roadEntityArgs)
