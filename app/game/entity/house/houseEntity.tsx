import {
  baseFactory,
  EntityMetaDataInterface,
} from "@/app/game/domain/EntityMetaDataInterface"
import { imgLoader } from "@/app/game/util/textureHelper"
import imageSource from "./houseimg.png"
import { vector3ToArray } from "@/app/game/domain/Vector"

const image = imgLoader(imageSource.src, "un")

export const houseEntityMetaData: EntityMetaDataInterface = {
  factory: baseFactory,
  type: "personnage/house",
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
