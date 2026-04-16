import { BaseGameResource } from "@/packages/game/BaseGameResource"
import { workerEntityResource } from "@/app/entity/character/worker/workerEntityResource"
import { houseEntityMetaData } from "@/app/entity/building/house/houseEntity"
import {
  treeDeathEntityMeta,
  treeEntityMetaData,
} from "@/app/entity/resource/tree/TreeEntity"
import { woodResourceMetadata } from "@/app/entity/resource/tree/woodResource"
import { waterResourceMetadata } from "@/app/inventory/water/woodResource"
import { forumEntityResource } from "@/app/entity/building/forum/forumEntityResource"
import { getResourceActionMetaData } from "@/app/action/getResourceActionMetaData"
import { goldResourceMetadata } from "@/app/entity/resource/gold/goldResource"
import { removeBuildingUserActionMetadata } from "@/app/ationUser/RemoveBuildingUserAction/removeBuildingUserActionMetadata"
import { wheatResourceMetadata } from "@/app/inventory/wheat/wheatResource"
import { goBuildOfBuildingActionResource } from "@/app/action/goBuildOfBuildingActionResource"
import { findWorkerCharacterActionMetadata } from "@/app/action/findWorkerCharacterActionMetadata"
import { timberHouseEntityMetaData } from "@/app/entity/building/timberHouse/TimberHouseEntity"
import { theDeathActionResource } from "@/app/action/theDeathActionResource"
import { storageEntityResource } from "@/app/entity/building/storage/storageEntityResource"
import { portEntityResource } from "@/app/entity/building/port/portEntityResource"
import { roadGroundEntityMetadata } from "@/app/entity/ground/road/roadGroundEntityMetadata"
import { gameResource } from "@/packages/game/game/gameResource"
import { zombieEntityResource } from "@/app/entity/character/zombie/zombieEntityResource"
import { towerEntityResource } from "@/app/entity/building/tower/towerEntityResource"
import { towerAttackActionResource } from "@/app/entity/building/tower/towerActionAttackResource"
import { arrowEntityResource } from "@/app/entity/attack/ArrowEntityResource"
import { BridgeEntityResource } from "@/app/entity/ground/bridge/BridgeEntityResource"
import { zombieAttackActionResource } from "@/app/entity/character/zombie/zombieAttackActionResource"
import { arrowAttackActionResource } from "@/app/entity/attack/arrowAttackActionResource"
import { grassGroundEntityMetadata } from "@/app/entity/ground/grass/GrassGroundEntityMetadata"
import { goldResourceEntityResource } from "@/app/entity/resource/gold/goldResourceEntityResource"
import { resourceMappingMetaData } from "@/app/resourceMappingMetadata"
import { goldMineBuildMetaDataEntity } from "@/app/entity/resource/gold/GoldMineBuildingEntityResource"
import { bloodEntityResource } from "@/app/entity/effect/blood/BloodEntityResource"

export const resourceList: BaseGameResource[] = [
  goBuildOfBuildingActionResource,
  forumEntityResource,
  workerEntityResource,
  houseEntityMetaData,
  treeEntityMetaData,
  woodResourceMetadata,
  getResourceActionMetaData,
  timberHouseEntityMetaData,
  findWorkerCharacterActionMetadata,
  goldResourceMetadata,
  waterResourceMetadata,
  roadGroundEntityMetadata,
  grassGroundEntityMetadata,
  removeBuildingUserActionMetadata,
  wheatResourceMetadata,
  theDeathActionResource,
  storageEntityResource,
  portEntityResource,
  gameResource,
  zombieEntityResource,
  towerEntityResource,
  towerAttackActionResource,
  arrowAttackActionResource,
  arrowEntityResource,
  zombieAttackActionResource,
  BridgeEntityResource,
  treeDeathEntityMeta,
  bloodEntityResource,
  goldMineBuildMetaDataEntity,
  goldResourceEntityResource,
  resourceMappingMetaData,
]
