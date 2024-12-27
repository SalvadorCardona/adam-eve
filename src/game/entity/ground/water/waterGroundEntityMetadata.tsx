import { entityMedataFactory } from "@/src/game/entity/EntityMedataFactory"
import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"
import waterIcon from "@/src/game/entity/ground/water/waterIcon.png"
import React from "react"
import { groundMetaDataFactory } from "@/src/game/entity/ground/groundMetaDataFactory"
import { GroundEntityInterface } from "@/src/game/entity/ground/GroundEntityInterface"

export const typeWater = "entity/ground/water"

export const waterGroundEntityMetadata = entityMedataFactory<
  // @ts-ignore
  EntityMetaDataInterface<GroundEntityInterface>
>(
  groundMetaDataFactory({
    icon: waterIcon,
    defautType: typeWater,
    component: ({ road }) => {
      return <></>
      // return (
      //   <group key={road.id} position={[road.position.x, road.position.y, -1.5]}>
      //     <mesh position={[0, 0, 0]}>
      //       <boxGeometry args={[1, 1, 1]} />
      //       <meshStandardMaterial color="#8a643a" roughness={0.5} metalness={0.1} />
      //     </mesh>
      //   </group>
      // )
    },
  }),
)
