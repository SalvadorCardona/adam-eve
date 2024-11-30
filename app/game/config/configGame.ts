import { ContainerInterface } from "@/packages/container/container"
import { characterEntityMetaData } from "@/app/game/entity/character/CharacterEntity"
import { EntityMetaDataInterface } from "@/app/game/domain/EntityMetaDataInterface"
import { houseEntityMetaData } from "@/app/game/entity/house/houseEntity"
import { character2 } from "@/app/game/entity/character2/character2Entity"
import { threeEntityMetaData } from "@/app/game/entity/three/Three2Entity"

const configGame: ContainerInterface<EntityMetaDataInterface> = {
  [characterEntityMetaData.type]: characterEntityMetaData,
  [houseEntityMetaData.type]: houseEntityMetaData,
  [character2.type]: character2,
  [threeEntityMetaData.type]: threeEntityMetaData,
}

export default configGame
