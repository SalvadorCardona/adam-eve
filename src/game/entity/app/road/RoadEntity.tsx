import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"
import { entityMedataFactory } from "@/src/game/entity/EntityMedataFactory"
import icons from "./icon.png"
import React, { useMemo } from "react"
import { ExtrudeGeometry, Shape } from "three/src/Three"

export const roadEntity: EntityMetaDataInterface = entityMedataFactory({
  asset: {
    icon: icons,
  },
  ["@type"]: "entity/building/road",
  component: (data) => {
    const shape = useMemo(() => {
      const s = new Shape()
      s.moveTo(0, 0)
      s.lineTo(1, 0)
      s.lineTo(1, 0.5)
      s.lineTo(0.5, 0.5)
      s.lineTo(0.5, 1)
      s.lineTo(0, 1)
      s.lineTo(0, 0)
      return s
    }, [])

    const geometry = useMemo(
      () => new ExtrudeGeometry(shape, { depth: 0.1, bevelEnabled: false }),
      [shape],
    )

    return (
      <mesh
        geometry={geometry}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0.05]}
      >
        <meshStandardMaterial color="gray" />
      </mesh>
    )
  },
  defaultEntity: () => {
    return {
      size: {
        x: 1,
        y: 1,
        z: 1,
      },
    }
  },
})
