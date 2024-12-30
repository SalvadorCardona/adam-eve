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
    },
  }),
)
