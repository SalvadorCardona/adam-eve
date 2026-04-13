import { BaseGameMetaDataInterface } from "@/src/game/BaseGameMetaDataInterface"
import { workerEntityResource } from "@/src/game/entity/app/character/worker/workerEntityResource"
import { houseEntityMetaData } from "@/src/game/entity/app/building/house/houseEntity"
import {
  treeDeathEntityMeta,
  treeEntityMetaData,
} from "@/src/game/entity/app/resource/tree/TreeEntity"
import { woodResourceMetadata } from "@/src/game/entity/app/resource/tree/woodResource"
import { waterResourceMetadata } from "@/src/game/inventory/app/water/woodResource"
import { forumEntityResource } from "@/src/game/entity/app/building/forum/forumEntityResource"
import { getResourceActionMetaData } from "@/src/game/action/app/getResourceActionMetaData"
import { goldResourceMetadata } from "@/src/game/entity/app/resource/gold/goldResource"
import { removeBuildingUserActionMetadata } from "@/src/game/actionUser/app/RemoveBuildingUserAction/removeBuildingUserActionMetadata"
import { wheatResourceMetadata } from "@/src/game/inventory/app/wheat/wheatResource"
import { goBuildOfBuildingActionResource } from "@/src/game/action/app/goBuildOfBuildingActionResource"
import { findWorkerCharacterActionMetadata } from "@/src/game/action/app/findWorkerCharacterActionMetadata"
import { timberHouseEntityMetaData } from "@/src/game/entity/app/building/timberHouse/TimberHouseEntity"
import { theDeathActionResource } from "@/src/game/action/app/theDeathActionResource"
import { storageEntityResource } from "@/src/game/entity/app/building/storage/storageEntityResource"
import { portEntityResource } from "@/src/game/entity/app/building/port/portEntityResource"
import { roadGroundEntityMetadata } from "@/src/game/entity/app/ground/road/roadGroundEntityMetadata"
import { gameResource } from "@/src/game/game/gameResource"
import { zombieEntityResource } from "@/src/game/entity/app/character/zombie/zombieEntityResource"
import { towerEntityResource } from "@/src/game/entity/app/building/tower/towerEntityResource"
import { towerAttackActionResource } from "@/src/game/entity/app/building/tower/towerActionAttackResource"
import { arrowEntityResource } from "@/src/game/entity/app/attack/ArrowEntityResource"
import { BridgeEntityResource } from "@/src/game/entity/app/ground/bridge/BridgeEntityResource"
import { zombieAttackActionResource } from "@/src/game/entity/app/character/zombie/zombieAttackActionResource"
import { arrowAttackActionResource } from "@/src/game/entity/app/attack/arrowAttackActionResource"
import { grassGroundEntityMetadata } from "@/src/game/entity/app/ground/grass/GrassGroundEntityMetadata"
import { JsonLdTypeContainerInterface } from "@/packages/jsonLd/jsonLd"
import { goldResourceEntityResource } from "@/src/game/entity/app/resource/gold/goldResourceEntityResource"
import { resourceMappingMetaData } from "@/src/resource/resourceMappingMetadata"
import { goldMineBuildMetaDataEntity } from "@/src/game/entity/app/resource/gold/GoldMineBuildingEntityResource"
import { bloodEntityResource } from "@/src/game/entity/app/effect/blood/BloodEntityResource"

const configGame: JsonLdTypeContainerInterface<BaseGameMetaDataInterface> = {
  [goBuildOfBuildingActionResource["@id"]]: goBuildOfBuildingActionResource,
  [forumEntityResource["@id"]]: forumEntityResource,
  [workerEntityResource["@id"]]: workerEntityResource,
  [houseEntityMetaData["@id"]]: houseEntityMetaData,
  [treeEntityMetaData["@id"]]: treeEntityMetaData,
  [woodResourceMetadata["@id"]]: woodResourceMetadata,
  [getResourceActionMetaData["@id"]]: getResourceActionMetaData,
  [timberHouseEntityMetaData["@id"]]: timberHouseEntityMetaData,
  [findWorkerCharacterActionMetadata["@id"]]: findWorkerCharacterActionMetadata,
  [goldResourceMetadata["@id"]]: goldResourceMetadata,
  [waterResourceMetadata["@id"]]: waterResourceMetadata,
  [roadGroundEntityMetadata["@id"]]: roadGroundEntityMetadata,
  [grassGroundEntityMetadata["@id"]]: grassGroundEntityMetadata,
  [removeBuildingUserActionMetadata["@id"]]: removeBuildingUserActionMetadata,
  [wheatResourceMetadata["@id"]]: wheatResourceMetadata,
  [theDeathActionResource["@id"]]: theDeathActionResource,
  [storageEntityResource["@id"]]: storageEntityResource,
  [portEntityResource["@id"]]: portEntityResource,
  [gameResource["@id"]]: gameResource,
  [zombieEntityResource["@id"]]: zombieEntityResource,
  [towerEntityResource["@id"]]: towerEntityResource,
  [towerAttackActionResource["@id"]]: towerAttackActionResource,
  [arrowAttackActionResource["@id"]]: arrowAttackActionResource,
  [arrowEntityResource["@id"]]: arrowEntityResource,
  [zombieAttackActionResource["@id"]]: zombieAttackActionResource,
  [BridgeEntityResource["@id"]]: BridgeEntityResource,
  [treeDeathEntityMeta["@id"]]: treeDeathEntityMeta,
  [bloodEntityResource["@id"]]: bloodEntityResource,
  [goldMineBuildMetaDataEntity["@id"]]: goldMineBuildMetaDataEntity,
  [goldResourceEntityResource["@id"]]: goldResourceEntityResource,
  [resourceMappingMetaData["@id"]]: resourceMappingMetaData,
}

export default configGame
