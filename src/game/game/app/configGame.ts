import { GameMetaDataInterface } from "@/src/game/GameMetaDataInterface"
import { characterEntityMetaData } from "@/src/game/entity/app/character/CharacterEntity"
import { houseEntityMetaData } from "@/src/game/entity/app/house/houseEntity"
import { treeEntityMetaData } from "@/src/game/entity/app/tree/TreeEntity"
import { woodRessourceMetadata } from "@/src/game/inventory/app/wood/woodRessource"
import { buildRequest } from "@/src/game/entity/app/build-request/BuildRequest"
import { waterRessourceMetadata } from "@/src/game/inventory/app/water/woodRessource"
import { JsonLdTypeContainerInterface } from "@/src/container/container"
import { forumEntityMetaData } from "@/src/game/entity/app/forum/ForumEntity"
import { goToDirectionMetaData } from "@/src/game/action/app/goToDirectionMetaData"
import { cutTheWoodActionMetaData } from "@/src/game/action/app/cutTheWoodActionMetaData"
import { goldRessourceMetadata } from "@/src/game/inventory/app/gold/woodRessource"
import {
  grassEntityMetadata,
  roadEntityMetadata,
  waterEntityMetadata,
} from "@/src/game/entity/app/road/RoadEntityMetadata"
import { JsonLdType } from "@/src/utils/jsonLd/jsonLd"

const configGame: JsonLdTypeContainerInterface<GameMetaDataInterface> = {
  [characterEntityMetaData["@type"]]: characterEntityMetaData,
  [houseEntityMetaData["@type"]]: houseEntityMetaData,
  [treeEntityMetaData["@type"]]: treeEntityMetaData,
  [forumEntityMetaData["@type"]]: forumEntityMetaData,
  [goToDirectionMetaData["@type"]]: goToDirectionMetaData,
  [woodRessourceMetadata["@type"]]: woodRessourceMetadata,
  [cutTheWoodActionMetaData["@type"]]: cutTheWoodActionMetaData,
  [buildRequest["@type"]]: buildRequest,
  [goldRessourceMetadata["@type"]]: goldRessourceMetadata,
  [waterRessourceMetadata["@type"]]: waterRessourceMetadata,
  [roadEntityMetadata["@type"]]: roadEntityMetadata,
  [waterEntityMetadata["@type"]]: waterEntityMetadata,
  [grassEntityMetadata["@type"]]: grassEntityMetadata,
}

export default configGame

export function getMetaData<T = GameMetaDataInterface>(
  metaType: JsonLdType | GameMetaDataInterface,
): T {
  if (typeof metaType === "string") return configGame[metaType] as T

  return configGame[metaType["@type"]] as T
}
