import React, { FC } from "react"
import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"
import { entityFactory } from "@/src/game/entity/entityFactory"
import { getByLdType } from "@/src/container/container"
import { Vector3Interface, vector3ToVector2 } from "@/src/utils/3Dmath/Vector"
import { GroundInterface } from "@/src/game/entity/entityGround/GroundInterface"
import { createGround } from "@/src/game/entity/entityGround/createGround"
import EntityInterface from "@/src/game/entity/EntityInterface"

export const groundMetaDataFactory = ({
  defaultType,
  icon,
  component,
}: {
  defaultType: string
  icon: string
  component?: FC<{ road: GroundInterface }>
}) => {
  const roadEntityArgs: Partial<EntityMetaDataInterface<EntityInterface>> = {
    asset: {
      icon,
    },
    ["@type"]: defaultType,
    // @ts-ignore Interface need to be utpdate
    factory: function (payload) {
      const entity = payload?.entity ?? {}
      const game = payload?.game
      if (!game) return

      entity["@type"] = defaultType
      const oldPosition = { ...entity.position } as Vector3Interface
      const newRoad: EntityInterface = entityFactory({ entity })
      newRoad.position = { x: 0, y: 0, z: 0 }
      if (payload?.context === "build-request") {
        return entityFactory({ entity })
      }
      const roadEntity =
        (getByLdType(game.entities, defaultType)[0] as EntityInterface) ??
        entityFactory({ entity })

      roadEntity.position = { x: 0, y: -1, z: 0 }

      createGround(
        roadEntity.roadNetwork,
        vector3ToVector2(oldPosition),
        defaultType,
      )

      return roadEntity
    },
    component: ({ entity }) => {
      const roads = entity.roadNetwork
      const Component = component
      return (
        <>
          {roads.map((road) => {
            return Component ? (
              <group
                key={road["@id"]}
                position={[road.position.x, 0, road.position.y]}
                rotation={[-Math.PI / 2, 0, 0]}
              >
                <Component road={road}></Component>
              </group>
            ) : (
              <group
                key={road["@id"]}
                position={[road.position.x, -1.5, road.position.y]}
              >
                <mesh position={[0, 0, 0]}>
                  <boxGeometry args={[1, 1, 1]} />
                  <meshStandardMaterial
                    color="#8a643a" // Brown color for a cozy look
                    roughness={0.5} // Adjust roughness for a softer appearance
                    metalness={0.1} // Low metalness for a more matte finish
                  />
                </mesh>
              </group>
            )
          })}
        </>
      )
    },
    defaultEntity: function () {
      return {
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
