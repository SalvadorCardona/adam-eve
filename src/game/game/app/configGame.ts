import { GameMetaDataInterface } from "@/src/game/GameMetaDataInterface"
import { workerEntityMetaData } from "@/src/game/entity/app/worker/WorkerEntity"
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
import { roadGroundEntityMetadata } from "@/src/game/entity/ground/road/RoadGroundEntityMetadata"
import { JsonLdType } from "@/src/utils/jsonLd/jsonLd"
import { removeBuildingUserActionMetadata } from "@/src/game/actionUser/app/RemoveBuildingUserAction/RemoveBuildingUserActionMetadata"
import { wheatRessourceMetadata } from "@/src/game/inventory/app/wheat/wheatRessource"
import { goBuildOfBuildingActionMetadata } from "@/src/game/action/app/goBuildOfBuildingActionMetadata"
import { findWorkerCharacterActionMetadata } from "@/src/game/action/app/findWorkerCharacterActionMetadata"
import { timberHouseEntityMetaData } from "@/src/game/entity/app/timberHouse/TimberHouseEntity"
import { theDeathActionMetadata } from "@/src/game/action/app/TheDeathActionMetadata"
import { storageEntityMetaData } from "@/src/game/entity/app/storage/storageEntity"
import { portEntityMetaData } from "@/src/game/entity/app/port/portEntity"
import { waterGroundEntityMetadata } from "@/src/game/entity/ground/water/waterGroundEntityMetadata"
import { grassGroundEntityMetadata } from "@/src/game/entity/ground/grass/GrassGroundEntityMetadata"

const configGame: JsonLdTypeContainerInterface<GameMetaDataInterface> = {
  [goBuildOfBuildingActionMetadata["@type"]]: goBuildOfBuildingActionMetadata,
  [forumEntityMetaData["@type"]]: forumEntityMetaData,
  [workerEntityMetaData["@type"]]: workerEntityMetaData,
  [houseEntityMetaData["@type"]]: houseEntityMetaData,
  [treeEntityMetaData["@type"]]: treeEntityMetaData,
  [goToDirectionMetaData["@type"]]: goToDirectionMetaData,
  [woodRessourceMetadata["@type"]]: woodRessourceMetadata,
  [cutTheWoodActionMetaData["@type"]]: cutTheWoodActionMetaData,
  [timberHouseEntityMetaData["@type"]]: timberHouseEntityMetaData,
  [findWorkerCharacterActionMetadata["@type"]]: findWorkerCharacterActionMetadata,
  [buildRequest["@type"]]: buildRequest,
  [goldRessourceMetadata["@type"]]: goldRessourceMetadata,
  [waterRessourceMetadata["@type"]]: waterRessourceMetadata,
  [roadGroundEntityMetadata["@type"]]: roadGroundEntityMetadata,
  [waterGroundEntityMetadata["@type"]]: waterGroundEntityMetadata,
  [grassGroundEntityMetadata["@type"]]: grassGroundEntityMetadata,
  [removeBuildingUserActionMetadata["@type"]]: removeBuildingUserActionMetadata,
  [wheatRessourceMetadata["@type"]]: wheatRessourceMetadata,
  [theDeathActionMetadata["@type"]]: theDeathActionMetadata,
  [storageEntityMetaData["@type"]]: storageEntityMetaData,
  [portEntityMetaData["@type"]]: portEntityMetaData,
}

export default configGame

export function getMetaData<T = GameMetaDataInterface>(
  metaType: JsonLdType | GameMetaDataInterface,
): T {
  if (typeof metaType === "string") return configGame[metaType] as T

  return configGame[metaType["@type"]] as T
}
