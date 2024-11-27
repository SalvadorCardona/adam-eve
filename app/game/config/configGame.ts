import { ContainerInterface } from "@/packages/container/container"
import { characterEntityMetaData } from "@/app/game/entity/CharacterEntity"
import { EntityMetaDataInterface } from "@/app/game/domain/EntityMetaDataInterface"

const configGame: ContainerInterface<EntityMetaDataInterface> = {
  [characterEntityMetaData.type]: characterEntityMetaData,
}

export default configGame
