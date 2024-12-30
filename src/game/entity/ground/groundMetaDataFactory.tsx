import React, { FC } from "react"
import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"
import { entityFactory } from "@/src/game/entity/entityFactory"
import { getByLdType } from "@/src/container/container"
import { createRoad } from "@/src/game/entity/ground/roadUtil"
import { GroundInterface } from "@/src/game/entity/ground/GroundInterface"
import { GroundEntityInterface } from "@/src/game/entity/ground/GroundEntityInterface"

export const groundMetaDataFactory = ({
  defautType,
  icon,
  component,
}: {
  defautType: string
  icon: string
  component?: FC<{ road: GroundInterface }>
}) => {
  const roadEntityArgs: Partial<EntityMetaDataInterface<GroundEntityInterface>> = {
    asset: {
      icon,
    },
    ["@type"]: defautType,
    // @ts-ignore Interface need to be utpdate
    factory: function (payload) {
      const entity = payload?.entity ?? {}
      const game = payload?.game
      if (!game) return

      entity["@type"] = defautType
      const oldPosition = { ...entity.position }
      const newRoad: GroundEntityInterface = entityFactory({ entity })
      newRoad.position = { x: 0, y: 0, z: 0 }
      if (payload?.context === "build-request") {
        return entityFactory({ entity })
      }
      const roadEntity =
        (getByLdType(game.entities, defautType)[0] as GroundEntityInterface) ??
        entityFactory({ entity })

      roadEntity.position = { x: 0, y: -1, z: 0 }

      createRoad(
        roadEntity.roadNetwork,
        {
          x: oldPosition.x ?? 0,
          y: oldPosition.z ?? 0,
        },
        defautType,
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
              <Component key={road.id} road={road}></Component>
            ) : (
              <group
                key={road.id}
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
