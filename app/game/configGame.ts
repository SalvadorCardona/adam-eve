import { JsonLdTypeContainerInterface } from "@/packages/container/container"
import { characterEntityMetaData } from "@/app/game/entity/character/CharacterEntity"
import { houseEntityMetaData } from "@/app/game/entity/house/houseEntity"
import { goToDirectionMetaData } from "@/app/game/action/goToDirectionMetaData"
import { forumEntityMetaData } from "@/app/game/entity/forum/ForumEntity"
import { woodRessourceMetadata } from "@/app/game/ressource/wood/woodRessource"
import { MetaDataInterface } from "@/app/domain/MetaDataInterface"
import { cutTheWoodActionMetaData } from "@/app/game/action/cutTheWoodActionMetaData"
import { treeEntityMetaData } from "@/app/game/entity/tree/TreeEntity"
import { JsonLdType } from "@/packages/utils/jsonLd/jsonLd"
import { buildRequest } from "@/app/game/entity/build-request/BuildRequest"

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
