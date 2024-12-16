import { EntityMetaDataInterface } from "@/src/domain/entity/EntityMetaDataInterface"
import { entityMedataFactory } from "@/src/domain/entity/EntityMedataFactory"
import icons from "./icon.png"
import { Plane } from "@react-three/drei"
import React from "react"

export const roadEntity: EntityMetaDataInterface = entityMedataFactory({
  asset: {
    icon: icons,
  },
  ["@type"]: "entity/building/road",
  component: (data) => {
    return <Plane args={[2, 2]} />
  },
  defaultEntity: () => {
    return {
      life: 50,
      size: {
        x: 1,
        y: 1,
        z: 1,
      },
      scale: {
        x: 0.2,
        y: 0.2,
        z: 0.2,
      },
    }
  },
})
