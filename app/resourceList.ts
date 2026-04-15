import { BaseGameMetaDataInterface } from "@/packages/game/BaseGameMetaDataInterface"
import { workerEntityResource } from "@/entity/app/character/worker/workerEntityResource"
import { houseEntityMetaData } from "@/entity/app/building/house/houseEntity"
import {
  treeDeathEntityMeta,
  treeEntityMetaData,
} from "@/entity/app/resource/tree/TreeEntity"
import { woodResourceMetadata } from "@/entity/app/resource/tree/woodResource"
import { waterResourceMetadata } from "@/inventory/app/water/woodResource"
import { forumEntityResource } from "@/entity/app/building/forum/forumEntityResource"
import { getResourceActionMetaData } from "@/app/action/getResourceActionMetaData"
import { goldResourceMetadata } from "@/entity/app/resource/gold/goldResource"
import { removeBuildingUserActionMetadata } from "@/actionUser/app/RemoveBuildingUserAction/removeBuildingUserActionMetadata"
import { wheatResourceMetadata } from "@/inventory/app/wheat/wheatResource"
import { goBuildOfBuildingActionResource } from "@/app/action/goBuildOfBuildingActionResource"
import { findWorkerCharacterActionMetadata } from "@/app/action/findWorkerCharacterActionMetadata"
import { timberHouseEntityMetaData } from "@/entity/app/building/timberHouse/TimberHouseEntity"
import { theDeathActionResource } from "@/app/action/theDeathActionResource"
import { storageEntityResource } from "@/entity/app/building/storage/storageEntityResource"
import { portEntityResource } from "@/entity/app/building/port/portEntityResource"
import { roadGroundEntityMetadata } from "@/entity/app/ground/road/roadGroundEntityMetadata"
import { gameResource } from "@/packages/game/game/gameResource"
import { zombieEntityResource } from "@/entity/app/character/zombie/zombieEntityResource"
import { towerEntityResource } from "@/entity/app/building/tower/towerEntityResource"
import { towerAttackActionResource } from "@/entity/app/building/tower/towerActionAttackResource"
import { arrowEntityResource } from "@/entity/app/attack/ArrowEntityResource"
import { BridgeEntityResource } from "@/entity/app/ground/bridge/BridgeEntityResource"
import { zombieAttackActionResource } from "@/entity/app/character/zombie/zombieAttackActionResource"
import { arrowAttackActionResource } from "@/entity/app/attack/arrowAttackActionResource"
import { grassGroundEntityMetadata } from "@/entity/app/ground/grass/GrassGroundEntityMetadata"
import { goldResourceEntityResource } from "@/entity/app/resource/gold/goldResourceEntityResource"
import { resourceMappingMetaData } from "@/app/resourceMappingMetadata"
import { goldMineBuildMetaDataEntity } from "@/entity/app/resource/gold/GoldMineBuildingEntityResource"
import { bloodEntityResource } from "@/entity/app/effect/blood/BloodEntityResource"

export const resourceList: BaseGameMetaDataInterface[] = [
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
