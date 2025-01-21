import { entityMedataFactory } from "@/src/game/entity/EntityMedataFactory"
import grassIcon from "./grassIcon.png"
import { JsonLdTypeFactory } from "@/src/utils/jsonLd/jsonLd"
import { appLdType } from "@/src/AppLdType"
import EntityInterface from "@/src/game/entity/EntityInterface"
import { entityQuery } from "@/src/game/entity/useCase/query/entityQuery"
import { entityHasCollision } from "@/src/game/entity/useCase/entityHasCollision"
import grassBottomLeft from "./asset/grass-bottom-left.png"
import grassBottomRight from "./asset/grass-bottom-right.png"
import grassTopRight from "./asset/grass-top-right.png"
import grassTopLeft from "./asset/grass-top-left.png"
import grassLeft from "./asset/grass-left.png"
import grassRight from "./asset/grass-right.png"
import grassTop from "./asset/grass-top.png"
import grassBottom from "./asset/grass-bottom.png"
import grassCornerBottomLeft from "./asset/grass-corner-bottom-left.png"
import grassCornerTopLeft from "./asset/grass-corner-bottom-left.png"
import grassCornerBottomRight from "./asset/grass-corner-bottom-right.png"
import grassCornerTopRight from "./asset/grass-corner-bottom-right.png"
import grass1 from "./asset/normal/grass1.png"
import grass2 from "./asset/normal/grass2.png"
import grass3 from "./asset/normal/grass3.png"
import grass4 from "./asset/normal/grass4.png"
import grass5 from "./asset/normal/grass5.png"
import grass6 from "./asset/normal/grass6.png"
import grass7 from "./asset/normal/grass7.png"
import grass8 from "./asset/normal/grass8.png"
import grass9 from "./asset/normal/grass9.png"
import grass10 from "./asset/normal/grass10.png"
import grass11 from "./asset/normal/grass11.png"
import grass12 from "./asset/normal/grass12.png"
import grass13 from "./asset/normal/grass13.png"
import { Sprite } from "@/src/UI/graphic-motor/pixiJs/components/Sprite"
import React, { useMemo, useState } from "react"
import { getMetaData } from "@/src/game/game/app/getMetaData"
import { EntityMetaDataInterface } from "../../../EntityMetaDataInterface"
import { Vector3Interface } from "@/src/utils/3Dmath/Vector"

const grassNormal = [
  grass1,
  grass2,
  grass3,
  grass4,
  grass5,
  grass6,
  grass7,
  grass8,
  grass9,
  grass10,
  grass11,
  grass12,
  grass13,
]

const type = JsonLdTypeFactory(appLdType.entityGround, "grass")
export const grassGroundEntityMetadata = entityMedataFactory({
  asset: {
    icon: grassIcon,
    multiModel2d: [
      grassBottomLeft,
      grassBottomRight,
      grassTopRight,
      grassTopLeft,
      grassLeft,
      grassRight,
      grassTop,
      grassBottom,
      grassCornerBottomLeft,
      grassCornerBottomRight,
      grassCornerTopRight,
      grassCornerTopLeft,
      ...grassNormal,
    ],
  },
  propriety: {
    size: {
      x: 50,
      y: 50,
      z: 50,
    },
  },
  ["@type"]: type,
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
    const [version, setVersion] = useState(1)

    const size = useMemo(() => {
      const size = getMetaData<EntityMetaDataInterface>(entity).propriety
        .size as Vector3Interface
      return {
        width: size.x as Number,
        height: size.y as Number,
      }
    }, [])

    const texturePath = useMemo(() => {
      let asset = grassNormal[Math.floor(Math.random() * (grassNormal.length - 1))]
      const connections = entity.connections
      switch (true) {
        case connections.top !== undefined &&
          connections.left !== undefined &&
          connections.right !== undefined &&
          connections.bottom !== undefined:
          break
        case connections.top !== undefined &&
          connections.left !== undefined &&
          connections.right !== undefined:
          asset = grassBottom
          break
        case connections.top !== undefined &&
          connections.left !== undefined &&
          connections.bottom !== undefined:
          asset = grassRight
          break
        case connections.top !== undefined &&
          connections.right !== undefined &&
          connections.bottom !== undefined:
          asset = grassLeft
          break
        case connections.left !== undefined &&
          connections.right !== undefined &&
          connections.bottom !== undefined:
          asset = grassTop
          break
        case connections.top !== undefined && connections.left !== undefined:
          asset = grassBottomRight
          break
        case connections.top !== undefined && connections.right !== undefined:
          asset = grassBottomLeft
          break
        case connections.bottom !== undefined && connections.left !== undefined:
          asset = grassTopRight
          break
        case connections.bottom !== undefined && connections.right !== undefined:
          asset = grassTopLeft
          break
        default:
          asset = asset
      }

      return asset
    }, [entity.connections])

    return <Sprite image={texturePath} options={size} />
  },
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
