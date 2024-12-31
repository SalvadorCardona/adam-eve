import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"
import { entityMedataFactory } from "@/src/game/entity/EntityMedataFactory"
import React from "react"
import roadIcon from "./roadIcon.png"
import { groundMetaDataFactory } from "@/src/game/entity/entityGround/groundMetaDataFactory"
import { JsonLdTypeFactory } from "@/src/utils/jsonLd/jsonLd"
import { appLdType } from "@/src/AppLdType"

export const roadGroundEntityMetadata = entityMedataFactory<
  // @ts-ignore
  EntityMetaDataInterface<GroundEntityInterface>
>(
  groundMetaDataFactory({
    icon: roadIcon,
    defaultType: JsonLdTypeFactory(appLdType.entityGround, "road"),
    component: ({ road }) => {
      return (
        <>
          <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#8a643a" roughness={0.5} metalness={0.1} />
          </mesh>
          <mesh position={[0, 0, 0]} receiveShadow>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
              color={"#c9b03c"} // Blue for water, green otherwise
              transparent={false} // Make it transparent if it's water
              roughness={0.7} // Higher roughness for a more natural texture
              metalness={0.0} // No metalness for a matte finish
            />
          </mesh>
        </>
      )
    },
  }),
)
