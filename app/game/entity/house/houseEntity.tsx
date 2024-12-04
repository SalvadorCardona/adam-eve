import { EntityMetaDataInterface } from "@/app/domain/entity/EntityMetaDataInterface"
import { imgLoader } from "@/app/domain/3D/textureHelper"
import imageSource from "./houseimg.png"
import { vector3ToArray } from "@/app/domain/3D/Vector"
import { entityFactory } from "@/app/domain/entity/entityFactory"

const image = imgLoader(imageSource.src, "un")

export const houseEntityMetaData: EntityMetaDataInterface = {
  factory: entityFactory,
  ["@type"]: "personnage/house",
  onFrame: ({ entity, game }) => {},
  component: ({ entity }) => {
    return (
      <mesh
        position={vector3ToArray(entity.position)}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[entity.size.x, entity.size.y]} />
        <meshStandardMaterial attach="material" map={image} />
      </mesh>
    )
  },
}
