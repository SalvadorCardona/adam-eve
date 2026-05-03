import { BaseJsonLdItemInterface } from "@/packages/jsonLd/jsonLd"
import { workerEntityResource } from "@/app/entity/character/worker/workerEntityResource"
import { houseEntityMetaData } from "@/app/entity/building/house/houseEntity"
import { treeDeathEntityMeta, treeEntityMetaData } from "@/app/entity/resource/tree/TreeEntity"
import { woodResourceMetadata } from "@/app/entity/resource/tree/woodResource"
import { waterResourceMetadata } from "@/app/inventory/water/woodResource"
import { forumEntityResource } from "@/app/entity/building/forum/forumEntityResource"
import { getResourceActionResource } from "@/app/action/getResourceActionResource"
import { goldResourceMetadata } from "@/app/entity/resource/gold/goldResource"
import {
  removeBuildingUserActionMetadata
} from "@/app/actionUser/RemoveBuildingUserAction/removeBuildingUserActionMetadata"
import { wheatResourceMetadata } from "@/app/inventory/wheat/wheatResource"
import { goBuildOfBuildingActionResource } from "@/app/action/goBuildOfBuildingActionResource"
import { stayInBuildingActionResource } from "@/app/action/stayInBuildingActionResource"
import { findWorkerCharacterActionMetadata } from "@/app/action/findWorkerCharacterActionMetadata"
import { timberHouseEntityMetaData } from "@/app/entity/building/timberHouse/TimberHouseEntity"
import { theDeathActionResource } from "@/app/action/theDeathActionResource"
import { storageEntityResource } from "@/app/entity/building/storage/storageEntityResource"
import { roadGroundEntityMetadata } from "@/app/entity/ground/road/roadGroundEntityMetadata"
import { gameResource } from "@/packages/game/game/gameResource"
import { zombieEntityResource } from "@/app/entity/character/zombie/zombieEntityResource"
import { towerEntityResource } from "@/app/entity/building/tower/towerEntityResource"
import towerAttackActionResource from "@/app/entity/building/tower/towerActionAttackResource"
import { fireballEntityResource } from "@/app/entity/attack/FireballEntityResource"
import { BridgeEntityResource } from "@/app/entity/ground/bridge/BridgeEntityResource"
import { zombieAttackActionResource } from "@/app/entity/character/zombie/zombieAttackActionResource"
import { grassGroundEntityMetadata } from "@/app/entity/ground/grass/GrassGroundEntityMetadata"
import { waterGroundEntityMetadata } from "@/app/entity/ground/water/WaterGroundEntityMetadata"
import { goldResourceEntityResource } from "@/app/entity/resource/gold/goldResourceEntityResource"
import { resourceMappingMetaData } from "@/app/resourceMappingMetadata"
import { goldMineBuildMetaDataEntity } from "@/app/entity/resource/gold/GoldMineBuildingEntityResource"
import { bloodEntityResource } from "@/app/entity/effect/blood/BloodEntityResource"
import { slashEntityResource } from "@/app/entity/effect/slash/SlashEntityResource"
import { floatingTextEntityResource } from "@/app/entity/effect/floatingText/FloatingTextEntityResource"
import { knowledgeResourceMetadata } from "@/app/entity/resource/knowledge/knowledgeResource"
import { researchCenterEntityResource } from "@/app/entity/building/researchCenter/researchCenterEntityResource"
import { forestierEntityResource } from "@/app/entity/building/forestier/forestierEntityResource"
import { playerEntityResource } from "@/app/entity/character/player/playerEntityResource"
import { playerAttackActionResource } from "@/app/entity/character/player/playerAttackActionResource"
import { playerBuildUserActionMetadata } from "@/app/actionUser/PlayerBuildUserAction/playerBuildUserActionMetadata"
import { daycareEntityResource } from "@/app/entity/building/daycare/daycareEntityResource"
import { zombieHouseEntityResource } from "@/app/entity/building/zombieHouse/zombieHouseEntityResource"
import { agingActionResource } from "@/app/action/agingActionResource"
import { saveGameActionResource } from "@/app/action/saveGameActionResource"
import { updateFogOfWarActionResource } from "@/app/action/updateFogOfWarActionResource"
import { stoneResourceMetadata } from "@/app/inventory/stone/stoneResource"
import { stoneResourceEntityResource } from "@/app/entity/resource/stone/stoneResourceEntityResource"
import { stoneMineBuildMetaDataEntity } from "@/app/entity/resource/stone/StoneMineBuildingEntityResource"
import { ironResourceMetadata } from "@/app/inventory/iron/ironResource"
import { ironResourceEntityResource } from "@/app/entity/resource/iron/ironResourceEntityResource"
import { ironMineBuildMetaDataEntity } from "@/app/entity/resource/iron/IronMineBuildingEntityResource"
import { researchMutationActionResource } from "@/app/action/researchMutationActionResource"
import { workerSpeedMutation } from "@/app/mutation/workerSpeedMutation"

export const resourceList: BaseJsonLdItemInterface[] = [
  goBuildOfBuildingActionResource,
  stayInBuildingActionResource,
  forumEntityResource,
  workerEntityResource,
  houseEntityMetaData,
  treeEntityMetaData,
  woodResourceMetadata,
  getResourceActionResource,
  timberHouseEntityMetaData,
  findWorkerCharacterActionMetadata,
  goldResourceMetadata,
  waterResourceMetadata,
  roadGroundEntityMetadata,
  grassGroundEntityMetadata,
  waterGroundEntityMetadata,
  removeBuildingUserActionMetadata,
  wheatResourceMetadata,
  theDeathActionResource,
  storageEntityResource,
  gameResource,
  zombieEntityResource,
  towerEntityResource,
  towerAttackActionResource,
  fireballEntityResource,
  zombieAttackActionResource,
  BridgeEntityResource,
  treeDeathEntityMeta,
  bloodEntityResource,
  slashEntityResource,
  floatingTextEntityResource,
  goldMineBuildMetaDataEntity,
  goldResourceEntityResource,
  resourceMappingMetaData,
  knowledgeResourceMetadata,
  researchCenterEntityResource,
  forestierEntityResource,
  playerEntityResource,
  playerAttackActionResource,
  playerBuildUserActionMetadata,
  daycareEntityResource,
  zombieHouseEntityResource,
  agingActionResource,
  saveGameActionResource,
  updateFogOfWarActionResource,
  stoneResourceMetadata,
  stoneResourceEntityResource,
  stoneMineBuildMetaDataEntity,
  ironResourceMetadata,
  ironResourceEntityResource,
  ironMineBuildMetaDataEntity,
  researchMutationActionResource,
  workerSpeedMutation,
]
