import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"
import { entityMedataFactory } from "@/src/game/entity/EntityMedataFactory"
import React from "react"
import roadIcon from "./roadIcon.png"
import { groundMetaDataFactory } from "@/src/game/entity/ground/groundMetaDataFactory"
import { GroundEntityInterface } from "@/src/game/entity/ground/GroundEntityInterface"

export const typeRoad = "entity/ground/road"

export const roadGroundEntityMetadata = entityMedataFactory<
  // @ts-ignore
  EntityMetaDataInterface<GroundEntityInterface>
>(
  groundMetaDataFactory({
    icon: roadIcon,
    defautType: typeRoad,
    component: ({ road }) => {
      return (
        <group key={road.id} position={[road.position.x, road.position.y, -1.5]}>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#8a643a" roughness={0.5} metalness={0.1} />
          </mesh>
          <mesh position={[0, 0, 1]} receiveShadow>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
              color={"#c9b03c"} // Blue for water, green otherwise
              transparent={false} // Make it transparent if it's water
              roughness={0.7} // Higher roughness for a more natural texture
              metalness={0.0} // No metalness for a matte finish
            />
          </mesh>
        </group>
      )
    },
  }),
)
