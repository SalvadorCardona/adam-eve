import { BaseGameMetaDataInterface } from "@/src/game/BaseGameMetaDataInterface"
import { workerEntityMetaData } from "@/src/game/entity/app/character/worker/WorkerEntity"
import { houseEntityMetaData } from "@/src/game/entity/app/building/house/houseEntity"
import { treeEntityMetaData } from "@/src/game/entity/app/ressource/tree/TreeEntity"
import { woodRessourceMetadata } from "@/src/game/inventory/app/wood/woodRessource"
import { buildRequest } from "@/src/game/entity/app/helper/build-request/BuildRequest"
import { waterRessourceMetadata } from "@/src/game/inventory/app/water/woodRessource"
import { JsonLdTypeContainerInterface } from "@/src/container/container"
import { forumEntityMetaData } from "@/src/game/entity/app/building/forum/ForumEntity"
import { cutTheWoodActionMetaData } from "@/src/game/action/app/cutTheWoodActionMetaData"
import { goldRessourceMetadata } from "@/src/game/inventory/app/gold/woodRessource"
import { JsonLdType } from "@/src/utils/jsonLd/jsonLd"
import { removeBuildingUserActionMetadata } from "@/src/game/actionUser/app/RemoveBuildingUserAction/RemoveBuildingUserActionMetadata"
import { wheatRessourceMetadata } from "@/src/game/inventory/app/wheat/wheatRessource"
import { goBuildOfBuildingActionMetadata } from "@/src/game/action/app/goBuildOfBuildingActionMetadata"
import { findWorkerCharacterActionMetadata } from "@/src/game/action/app/findWorkerCharacterActionMetadata"
import { timberHouseEntityMetaData } from "@/src/game/entity/app/building/timberHouse/TimberHouseEntity"
import { theDeathActionMetadata } from "@/src/game/action/app/TheDeathActionMetadata"
import { storageEntityMetaData } from "@/src/game/entity/app/building/storage/storageEntity"
import { portEntityMetaData } from "@/src/game/entity/app/building/port/portEntity"
import { roadGroundEntityMetadata } from "@/src/game/entity/app/ground/road/RoadGroundEntityMetadata"
import { grassGroundEntityMetadata } from "@/src/game/entity/app/ground/grass/GrassGroundEntityMetadata"
import { gameMetadata } from "@/src/game/game/GameMetaData"

const configGame: JsonLdTypeContainerInterface<BaseGameMetaDataInterface> = {
  [goBuildOfBuildingActionMetadata["@type"]]: goBuildOfBuildingActionMetadata,
  [forumEntityMetaData["@type"]]: forumEntityMetaData,
  [workerEntityMetaData["@type"]]: workerEntityMetaData,
  [houseEntityMetaData["@type"]]: houseEntityMetaData,
  [treeEntityMetaData["@type"]]: treeEntityMetaData,
  [woodRessourceMetadata["@type"]]: woodRessourceMetadata,
  [cutTheWoodActionMetaData["@type"]]: cutTheWoodActionMetaData,
  [timberHouseEntityMetaData["@type"]]: timberHouseEntityMetaData,
  [findWorkerCharacterActionMetadata["@type"]]: findWorkerCharacterActionMetadata,
  [buildRequest["@type"]]: buildRequest,
  [goldRessourceMetadata["@type"]]: goldRessourceMetadata,
  [waterRessourceMetadata["@type"]]: waterRessourceMetadata,
  [roadGroundEntityMetadata["@type"]]: roadGroundEntityMetadata,
  [grassGroundEntityMetadata["@type"]]: grassGroundEntityMetadata,
  [removeBuildingUserActionMetadata["@type"]]: removeBuildingUserActionMetadata,
  [wheatRessourceMetadata["@type"]]: wheatRessourceMetadata,
  [theDeathActionMetadata["@type"]]: theDeathActionMetadata,
  [storageEntityMetaData["@type"]]: storageEntityMetaData,
  [portEntityMetaData["@type"]]: portEntityMetaData,
  [gameMetadata["@type"]]: gameMetadata,
}

export default configGame

export function getMetaData<T = BaseGameMetaDataInterface>(
  metaType: JsonLdType | BaseGameMetaDataInterface,
): T {
  if (typeof metaType === "string") return configGame[metaType] as T

  return configGame[metaType["@type"]] as T
}
