import { ContainerInterface } from "@/packages/container/container"
import { characterEntityMetaData } from "@/app/game/entity/character/CharacterEntity"
import { EntityMetaDataInterface } from "@/app/game/domain/entity/EntityMetaDataInterface"
import { houseEntityMetaData } from "@/app/game/entity/house/houseEntity"
import { threeEntityMetaData } from "@/app/game/entity/three/Three2Entity"
import { ActionMetadataInterface } from "@/app/game/domain/action/ActionMetadataInterface"
import { goToDirectionMetaData } from "@/app/game/action/goToDirectionMetaData"
import { forumEntityMetaData } from "@/app/game/entity/forum/ForumEntity"
import { woodRessourceMetadata } from "@/app/game/ressource/woodRessource"
import { RessourceMetadataInterface } from "@/app/game/domain/ressource/RessourceInterface"

const configGame: ContainerInterface<
  EntityMetaDataInterface | ActionMetadataInterface<any> | RessourceMetadataInterface
> = {
  [characterEntityMetaData["@type"]]: characterEntityMetaData,
  [houseEntityMetaData["@type"]]: houseEntityMetaData,
  [threeEntityMetaData["@type"]]: threeEntityMetaData,
  [forumEntityMetaData["@type"]]: forumEntityMetaData,
  [goToDirectionMetaData["@type"]]: goToDirectionMetaData,
  [woodRessourceMetadata["@type"]]: woodRessourceMetadata,
}

export default configGame
