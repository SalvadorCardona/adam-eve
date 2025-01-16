import { entityMedataFactory } from "@/src/game/entity/EntityMedataFactory"
import grassIcon from "./grassIcon.png"
import grassTexture from "./grassTexture1.png"
import { JsonLdTypeFactory } from "@/src/utils/jsonLd/jsonLd"
import { appLdType } from "@/src/AppLdType"
import EntityInterface from "@/src/game/entity/EntityInterface"
import { entityQuery } from "@/src/game/entity/useCase/query/entityQuery"
import { entityHasCollision } from "@/src/game/entity/useCase/entityHasCollision"

export const grassGroundEntityMetadata = entityMedataFactory({
  asset: {
    icon: grassIcon,
    model2d: grassTexture,
  },
  propriety: {
    size: {
      x: 50,
      y: 50,
      z: 50,
    },
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
  // component: ({ entity }) => {
  //   const randomGreen = () => {
  //     const baseGreen = 124 // Base green value (0-255)
  //     const variation = Math.floor(Math.random() * 20) - 5 // Random variation between -10 and +10
  //     return Math.min(255, Math.max(0, baseGreen + variation)) // Ensure value is within 0-255
  //   }
  //
  //   const greenColor = useMemo(() => {
  //     return `rgb(90, ${randomGreen()}, 87)`
  //   }, [entity["@id"]])
  //
  //   return (
  //     <group rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
  //       {/*<mesh position={[0, 0, -1]}>*/}
  //       {/*  <RoundedCubeLine road={entity} />*/}
  //       {/*  <meshStandardMaterial color={"#8a643a"} roughness={0.7} metalness={0.0} />*/}
  //       {/*</mesh>*/}
  //       <mesh receiveShadow>
  //         <RoundedCubeLine road={entity} />
  //         <meshStandardMaterial color={greenColor} roughness={0.7} metalness={0.0} />
  //       </mesh>
  //     </group>
  //   )
  // },
})

interface RoundedCubeLinePropsInterface {
  road: EntityInterface
}

//
// const RoundedCubeLine: React.FC<RoundedCubeLinePropsInterface> = ({ road }) => {
//   const { connections } = road
//
//   // Memoize the shape for performance
//   const roundedBox = useMemo(() => {
//     const shape = new Shape()
//     const size = 1 // Size of the square
//     const radius = 0.2 // Radius for rounded corners
//
//     shape.moveTo(-size / 2 + radius, -size / 2)
//     // Bottom edge
//     if (!connections.right && !connections.bottom) {
//       shape.lineTo(size / 2 - radius, -size / 2)
//       shape.quadraticCurveTo(size / 2, -size / 2, size / 2, -size / 2 + radius)
//     } else {
//       shape.lineTo(size / 2, -size / 2)
//     }
//
//     // Right edge
//     if (!connections.top && !connections.right) {
//       shape.lineTo(size / 2, size / 2 - radius)
//       shape.quadraticCurveTo(size / 2, size / 2, size / 2 - radius, size / 2)
//     } else {
//       shape.lineTo(size / 2, size / 2)
//     }
//
//     // Top edge
//     if (!connections.left && !connections.top) {
//       shape.lineTo(-size / 2 + radius, size / 2)
//       shape.quadraticCurveTo(-size / 2, size / 2, -size / 2, size / 2 - radius)
//     } else {
//       shape.lineTo(-size / 2, size / 2)
//     }
//
//     // Left edge
//     if (!connections.bottom && !connections.left) {
//       shape.lineTo(-size / 2, -size / 2 + radius)
//       shape.quadraticCurveTo(-size / 2, -size / 2, -size / 2 + radius, -size / 2)
//     } else {
//       shape.lineTo(-size / 2, -size / 2)
//     }
//
//     return shape
//   }, [connections])
//
//   // Memoize extrusion settings for performance
//   const extrudeSettings = useMemo(
//     () => ({
//       depth: 1, // Extrusion height
//       bevelEnabled: false, // No beveled edges
//     }),
//     [],
//   )
//
//   return <extrudeGeometry args={[roundedBox, extrudeSettings]} />
// }
