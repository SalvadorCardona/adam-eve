import { entityMedataFactory } from "@/src/game/entity/EntityMedataFactory"
import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"
import grassIcon from "./grassIcon.png"
import React, { useMemo } from "react"
import { Color, ShaderMaterial, Shape } from "three"
import { groundMetaDataFactory } from "@/src/game/entity/entityGround/groundMetaDataFactory"
import { GroundInterface } from "@/src/game/entity/entityGround/GroundInterface"
import { JsonLdTypeFactory } from "@/src/utils/jsonLd/jsonLd"
import { appLdType } from "@/src/AppLdType"

const gradientMaterial = new ShaderMaterial({
  uniforms: {
    color1: { value: new Color("#8a643a") }, // Couleur de départ
    color2: { value: new Color("#5a7c57") }, // Couleur de fin
  },
  vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
  fragmentShader: `
      uniform vec3 color1;
      uniform vec3 color2;
      varying vec2 vUv;
      void main() {
        gl_FragColor = vec4(mix(color1, color2, vUv.y), 1.0);
      }
    `,
})

export const grassGroundEntityMetadata = entityMedataFactory<
  // @ts-ignore
  EntityMetaDataInterface<GroundEntityInterface>
>(
  groundMetaDataFactory({
    icon: grassIcon,
    defaultType: JsonLdTypeFactory(appLdType.entityGround, "grass"),
    component: ({ road }) => {
      return (
        <>
          <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
              color="#8a643a" // Brown color for a cozy look
              roughness={0.5} // Adjust roughness for a softer appearance
              metalness={0.1} // Low metalness for a more matte finish
            />
          </mesh>
          <mesh receiveShadow material={gradientMaterial}>
            <RoundedCubeLine road={road} />
            <meshStandardMaterial
              color={"#5a7c57"} // Blue for water, green otherwise
              roughness={0.7} // Higher roughness for a more natural texture
              metalness={0.0} // No metalness for a matte finish
            />
          </mesh>
        </>
      )
    },
  }),
)

interface RoundedCubeLinePropsInterface {
  road: GroundInterface
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
