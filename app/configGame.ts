import { BaseGameMetaDataInterface } from "@/src/game/BaseGameMetaDataInterface"
import { workerEntityMetaData } from "@/src/game/entity/app/character/worker/workerEntity"
import { houseEntityMetaData } from "@/src/game/entity/app/building/house/houseEntity"
import {
  treeDeathEntityMeta,
  treeEntityMetaData,
} from "@/src/game/entity/app/resource/tree/TreeEntity"
import { woodResourceMetadata } from "@/src/game/entity/app/resource/tree/woodResource"
import { waterResourceMetadata } from "@/src/game/inventory/app/water/woodResource"
import { forumEntityMetaData } from "@/src/game/entity/app/building/forum/ForumEntity"
import { getResourceActionMetaData } from "@/src/game/action/app/getResourceActionMetaData"
import { goldResourceMetadata } from "@/src/game/entity/app/resource/gold/goldResource"
import { removeBuildingUserActionMetadata } from "@/src/game/actionUser/app/RemoveBuildingUserAction/removeBuildingUserActionMetadata"
import { wheatResourceMetadata } from "@/src/game/inventory/app/wheat/wheatResource"
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
import { JsonLdTypeContainerInterface } from "@/packages/jsonLd/jsonLd"
import { bloodEntityMetaData } from "@/src/game/entity/app/effect/blood/BloodEntity"
import {
  goldMineBuildMetaDataEntity,
  goldMineResourceMetaDataEntity,
} from "@/src/game/entity/app/resource/gold/GoldMineBuildMetaDataEntity"
import { resourceMappingMetaData } from "@/src/resource/resourceMappingMetadata"

const configGame: JsonLdTypeContainerInterface<BaseGameMetaDataInterface> = {
  [goBuildOfBuildingActionMetadata["@type"]]: goBuildOfBuildingActionMetadata,
  [forumEntityMetaData["@type"]]: forumEntityMetaData,
  [workerEntityMetaData["@type"]]: workerEntityMetaData,
  [houseEntityMetaData["@type"]]: houseEntityMetaData,
  [treeEntityMetaData["@type"]]: treeEntityMetaData,
  [woodResourceMetadata["@type"]]: woodResourceMetadata,
  [getResourceActionMetaData["@type"]]: getResourceActionMetaData,
  [timberHouseEntityMetaData["@type"]]: timberHouseEntityMetaData,
  [findWorkerCharacterActionMetadata["@type"]]: findWorkerCharacterActionMetadata,
  [goldResourceMetadata["@type"]]: goldResourceMetadata,
  [waterResourceMetadata["@type"]]: waterResourceMetadata,
  [roadGroundEntityMetadata["@type"]]: roadGroundEntityMetadata,
  [grassGroundEntityMetadata["@type"]]: grassGroundEntityMetadata,
  [removeBuildingUserActionMetadata["@type"]]: removeBuildingUserActionMetadata,
  [wheatResourceMetadata["@type"]]: wheatResourceMetadata,
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
  [goldMineResourceMetaDataEntity["@type"]]: goldMineResourceMetaDataEntity,
  [resourceMappingMetaData["@type"]]: resourceMappingMetaData,
}

export default configGame
