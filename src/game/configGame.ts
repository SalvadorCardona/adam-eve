import { JsonLdTypeContainerInterface } from "@/packages/container/container"
import { characterEntityMetaData } from "@/src/game/entity/character/CharacterEntity"
import { houseEntityMetaData } from "@/src/game/entity/house/houseEntity"
import { goToDirectionMetaData } from "@/src/game/action/goToDirectionMetaData"
import { forumEntityMetaData } from "@/src/game/entity/forum/ForumEntity"
import { woodRessourceMetadata } from "@/src/game/ressource/wood/woodRessource"
import { MetaDataInterface } from "@/src/domain/MetaDataInterface"
import { cutTheWoodActionMetaData } from "@/src/game/action/cutTheWoodActionMetaData"
import { treeEntityMetaData } from "@/src/game/entity/tree/TreeEntity"
import { JsonLdType } from "@/packages/utils/jsonLd/jsonLd"
import { buildRequest } from "@/src/game/entity/build-request/BuildRequest"

const configGame: JsonLdTypeContainerInterface<MetaDataInterface> = {
  [characterEntityMetaData["@type"]]: characterEntityMetaData,
  [houseEntityMetaData["@type"]]: houseEntityMetaData,
  [treeEntityMetaData["@type"]]: treeEntityMetaData,
  [forumEntityMetaData["@type"]]: forumEntityMetaData,
  [goToDirectionMetaData["@type"]]: goToDirectionMetaData,
  [woodRessourceMetadata["@type"]]: woodRessourceMetadata,
  [cutTheWoodActionMetaData["@type"]]: cutTheWoodActionMetaData,
  [buildRequest["@type"]]: buildRequest,
}

export default configGame

export function getMetaData<T = MetaDataInterface>(
  metaType: JsonLdType | MetaDataInterface,
): T {
  if (typeof metaType === "string") return configGame[metaType] as T

  return configGame[metaType["@type"]] as T
}
