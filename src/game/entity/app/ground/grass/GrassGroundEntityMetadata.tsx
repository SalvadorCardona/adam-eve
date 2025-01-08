import { entityMedataFactory } from "@/src/game/entity/EntityMedataFactory"
import grassIcon from "./grassIcon.png"
import React, { useMemo } from "react"
import { Shape } from "three"
import { JsonLdTypeFactory } from "@/src/utils/jsonLd/jsonLd"
import { appLdType } from "@/src/AppLdType"
import EntityInterface from "@/src/game/entity/EntityInterface"
import { entityQuery } from "@/src/game/entity/useCase/query/entityQuery"
import { entityHasCollision } from "@/src/game/entity/useCase/entityHasCollision"

export const grassGroundEntityMetadata = entityMedataFactory({
  asset: {
    icon: grassIcon,
  },
  ["@type"]: JsonLdTypeFactory(appLdType.entityGround, "grass"),
  label: "Herbe",
  canBeBuild: ({ entity, game }) => {
    const grounds = entityQuery(game, { "@type": appLdType.entityGround })
    for (const ground of grounds) {
      if (entityHasCollision(entity, ground)) {
        return false
      }
    }

    return true
  },
  component: ({ entity }) => {
    return (
      <group rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#8a643a" roughness={0.5} metalness={0.1} />
        </mesh>
        <mesh receiveShadow>
          <RoundedCubeLine road={entity} />
          <meshStandardMaterial color={"#5a7c57"} roughness={0.7} metalness={0.0} />
        </mesh>
      </group>
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

interface RoundedCubeLinePropsInterface {
  road: EntityInterface
}

const RoundedCubeLine: React.FC<RoundedCubeLinePropsInterface> = ({ road }) => {
  const { connections } = road

  // Memoize the shape for performance
  const roundedBox = useMemo(() => {
    const shape = new Shape()
    const size = 1 // Size of the square
    const radius = 0.2 // Radius for rounded corners

    shape.moveTo(-size / 2 + radius, -size / 2)
    // Bottom edge
    if (!connections.right && !connections.bottom) {
      shape.lineTo(size / 2 - radius, -size / 2)
      shape.quadraticCurveTo(size / 2, -size / 2, size / 2, -size / 2 + radius)
    } else {
      shape.lineTo(size / 2, -size / 2)
    }

    // Right edge
    if (!connections.top && !connections.right) {
      shape.lineTo(size / 2, size / 2 - radius)
      shape.quadraticCurveTo(size / 2, size / 2, size / 2 - radius, size / 2)
    } else {
      shape.lineTo(size / 2, size / 2)
    }

    // Top edge
    if (!connections.left && !connections.top) {
      shape.lineTo(-size / 2 + radius, size / 2)
      shape.quadraticCurveTo(-size / 2, size / 2, -size / 2, size / 2 - radius)
    } else {
      shape.lineTo(-size / 2, size / 2)
    }

    // Left edge
    if (!connections.bottom && !connections.left) {
      shape.lineTo(-size / 2, -size / 2 + radius)
      shape.quadraticCurveTo(-size / 2, -size / 2, -size / 2 + radius, -size / 2)
    } else {
      shape.lineTo(-size / 2, -size / 2)
    }

    return shape
  }, [connections])

  // Memoize extrusion settings for performance
  const extrudeSettings = useMemo(
    () => ({
      depth: 1, // Extrusion height
      bevelEnabled: false, // No beveled edges
    }),
    [],
  )

  return <extrudeGeometry args={[roundedBox, extrudeSettings]} />
}
