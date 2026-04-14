import { BaseGameMetaDataInterface } from "@/packages/game/BaseGameMetaDataInterface"
import { workerEntityResource } from "@/packages/game/entity/app/character/worker/workerEntityResource"
import { houseEntityMetaData } from "@/packages/game/entity/app/building/house/houseEntity"
import {
  treeDeathEntityMeta,
  treeEntityMetaData,
} from "@/packages/game/entity/app/resource/tree/TreeEntity"
import { woodResourceMetadata } from "@/packages/game/entity/app/resource/tree/woodResource"
import { waterResourceMetadata } from "@/packages/game/inventory/app/water/woodResource"
import { forumEntityResource } from "@/packages/game/entity/app/building/forum/forumEntityResource"
import { getResourceActionMetaData } from "@/packages/game/action/app/getResourceActionMetaData"
import { goldResourceMetadata } from "@/packages/game/entity/app/resource/gold/goldResource"
import { removeBuildingUserActionMetadata } from "@/packages/game/actionUser/app/RemoveBuildingUserAction/removeBuildingUserActionMetadata"
import { wheatResourceMetadata } from "@/packages/game/inventory/app/wheat/wheatResource"
import { goBuildOfBuildingActionResource } from "@/packages/game/action/app/goBuildOfBuildingActionResource"
import { findWorkerCharacterActionMetadata } from "@/packages/game/action/app/findWorkerCharacterActionMetadata"
import { timberHouseEntityMetaData } from "@/packages/game/entity/app/building/timberHouse/TimberHouseEntity"
import { theDeathActionResource } from "@/packages/game/action/app/theDeathActionResource"
import { storageEntityResource } from "@/packages/game/entity/app/building/storage/storageEntityResource"
import { portEntityResource } from "@/packages/game/entity/app/building/port/portEntityResource"
import { roadGroundEntityMetadata } from "@/packages/game/entity/app/ground/road/roadGroundEntityMetadata"
import { gameResource } from "@/packages/game/game/gameResource"
import { zombieEntityResource } from "@/packages/game/entity/app/character/zombie/zombieEntityResource"
import { towerEntityResource } from "@/packages/game/entity/app/building/tower/towerEntityResource"
import { towerAttackActionResource } from "@/packages/game/entity/app/building/tower/towerActionAttackResource"
import { arrowEntityResource } from "@/packages/game/entity/app/attack/ArrowEntityResource"
import { BridgeEntityResource } from "@/packages/game/entity/app/ground/bridge/BridgeEntityResource"
import { zombieAttackActionResource } from "@/packages/game/entity/app/character/zombie/zombieAttackActionResource"
import { arrowAttackActionResource } from "@/packages/game/entity/app/attack/arrowAttackActionResource"
import { grassGroundEntityMetadata } from "@/packages/game/entity/app/ground/grass/GrassGroundEntityMetadata"
import { goldResourceEntityResource } from "@/packages/game/entity/app/resource/gold/goldResourceEntityResource"
import { resourceMappingMetaData } from "@/app/resourceMappingMetadata"
import { goldMineBuildMetaDataEntity } from "@/packages/game/entity/app/resource/gold/GoldMineBuildingEntityResource"
import { bloodEntityResource } from "@/packages/game/entity/app/effect/blood/BloodEntityResource"

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
