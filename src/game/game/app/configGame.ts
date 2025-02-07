import { BaseGameMetaDataInterface } from "@/src/game/BaseGameMetaDataInterface"
import { workerEntityMetaData } from "@/src/game/entity/app/character/worker/workerEntity"
import { houseEntityMetaData } from "@/src/game/entity/app/building/house/houseEntity"
import {
  treeDeathEntityMeta,
  treeEntityMetaData,
} from "@/src/game/entity/app/ressource/tree/TreeEntity"
import { woodRessourceMetadata } from "@/src/game/entity/app/ressource/tree/woodRessource"
import { waterRessourceMetadata } from "@/src/game/inventory/app/water/woodRessource"
import { forumEntityMetaData } from "@/src/game/entity/app/building/forum/ForumEntity"
import { getRessourceActionMetaData } from "@/src/game/action/app/getRessourceActionMetaData"
import { goldRessourceMetadata } from "@/src/game/entity/app/ressource/gold/goldRessource"
import { removeBuildingUserActionMetadata } from "@/src/game/actionUser/app/RemoveBuildingUserAction/removeBuildingUserActionMetadata"
import { wheatRessourceMetadata } from "@/src/game/inventory/app/wheat/wheatRessource"
import { goBuildOfBuildingActionMetadata } from "@/src/game/action/app/goBuildOfBuildingActionMetadata"
import { findWorkerCharacterActionMetadata } from "@/src/game/action/app/findWorkerCharacterActionMetadata"
import { timberHouseEntityMetaData } from "@/src/game/entity/app/building/timberHouse/TimberHouseEntity"
import { theDeathActionMetadata } from "@/src/game/action/app/TheDeathActionMetadata"
import { storageEntityMetaData } from "@/src/game/entity/app/building/storage/storageEntity"
import { portEntityMetaData } from "@/src/game/entity/app/building/port/portEntity"
import { roadGroundEntityMetadata } from "@/src/game/entity/app/ground/road/roadGroundEntityMetadata"
import { gameMetadata } from "@/src/game/game/GameMetaData"
import { zombieEntityMetaData } from "@/src/game/entity/app/character/zombie/zombieEntity"
import { towerEntityMetaData } from "@/src/game/entity/app/building/tower/TowerEntity"
import { towerAttackActionMetadata } from "@/src/game/entity/app/building/tower/TowerAction"
import { ArrowEntityMetaData } from "@/src/game/entity/app/attack/ArrowEntity"
import { bridgeEntityMetaData } from "@/src/game/entity/app/ground/bridge/BridgeEntity"
import { zombieAttackActionMetadata } from "@/src/game/entity/app/character/zombie/zombieAttackActionMetadata"
import { arrowAttackActionMetadata } from "@/src/game/entity/app/attack/ArrowAttackActionMetadata"
import { grassGroundEntityMetadata } from "@/src/game/entity/app/ground/grass/GrassGroundEntityMetadata"
import { JsonLdTypeContainerInterface } from "@/src/utils/jsonLd/jsonLd"
import { bloodEntityMetaData } from "@/src/game/entity/app/effect/blood/BloodEntity"
import {
  goldMineBuildMetaDataEntity,
  goldMineRessourceMetaDataEntity,
} from "@/src/game/entity/app/ressource/gold/GoldMineBuildMetaDataEntity"
import { ressourceMappingMetaData } from "@/src/ressource/ressourceMappingMetadata"

const configGame: JsonLdTypeContainerInterface<BaseGameMetaDataInterface> = {
  [goBuildOfBuildingActionMetadata["@type"]]: goBuildOfBuildingActionMetadata,
  [forumEntityMetaData["@type"]]: forumEntityMetaData,
  [workerEntityMetaData["@type"]]: workerEntityMetaData,
  [houseEntityMetaData["@type"]]: houseEntityMetaData,
  [treeEntityMetaData["@type"]]: treeEntityMetaData,
  [woodRessourceMetadata["@type"]]: woodRessourceMetadata,
  [getRessourceActionMetaData["@type"]]: getRessourceActionMetaData,
  [timberHouseEntityMetaData["@type"]]: timberHouseEntityMetaData,
  [findWorkerCharacterActionMetadata["@type"]]: findWorkerCharacterActionMetadata,
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
  [zombieEntityMetaData["@type"]]: zombieEntityMetaData,
  [towerEntityMetaData["@type"]]: towerEntityMetaData,
  [towerAttackActionMetadata["@type"]]: towerAttackActionMetadata,
  [arrowAttackActionMetadata["@type"]]: arrowAttackActionMetadata,
  [ArrowEntityMetaData["@type"]]: ArrowEntityMetaData,
  [zombieAttackActionMetadata["@type"]]: zombieAttackActionMetadata,
  [bridgeEntityMetaData["@type"]]: bridgeEntityMetaData,
  [treeDeathEntityMeta["@type"]]: treeDeathEntityMeta,
  [bloodEntityMetaData["@type"]]: bloodEntityMetaData,
  [goldMineBuildMetaDataEntity["@type"]]: goldMineBuildMetaDataEntity,
  [goldMineRessourceMetaDataEntity["@type"]]: goldMineRessourceMetaDataEntity,
  [ressourceMappingMetaData["@type"]]: ressourceMappingMetaData,
}

export default configGame
