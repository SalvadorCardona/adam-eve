import { jsonLdFactory, JsonLdType } from "@/src/utils/jsonLd/jsonLd"
import { getMetaData } from "@/src/game/game/app/configGame"
import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"
import EntityInterface, {
  EntityFaction,
  isBuildingEntity,
  isCharacterEntity,
  isGroundEntity,
} from "@/src/game/entity/EntityInterface"
import { ActionMetadataInterface } from "@/src/game/action/ActionEntityMetadataInterface"
import { addAction } from "@/src/game/action/addAction"
import { EntityState } from "@/src/game/entity/EntityState"
import { aroundVector } from "@/src/utils/3Dmath/aroundVector"

export function entityFactory<
  T extends EntityInterface = EntityInterface,
>(payload?: { entity?: Partial<T> }): T {
  let ldType: JsonLdType = "undefined"

  if (payload?.entity?.["@type"]) ldType = payload.entity["@type"]
  // @ts-ignore
  if (this && this["@type"]) ldType = this["@type"]
  if (ldType === "undefined") console.warn("Has not Type", payload?.entity)

  const metaData = getMetaData<EntityMetaDataInterface>(ldType)
  const baseEntity: Partial<EntityInterface> = {
    workers: [],
    rotation: {
      x: 0,
      y: 0,
      z: 0,
    },
    connections: {},
    position: {
      x: 0,
      y: 0,
      z: 0,
    },
    actions: {},
    inventory: {},

    ...(metaData?.defaultEntity ? metaData?.defaultEntity() : {}),
    ...(payload?.entity ?? {}),
  }

  if (metaData?.propriety?.health) {
    baseEntity.life = metaData.propriety.health.maxLife
  }

  const entity = jsonLdFactory<EntityInterface>(ldType, baseEntity) as T

  entity.position = aroundVector(entity.position, true)

  if (isBuildingEntity(entity)) {
    entity.state = metaData?.propriety?.ressourceForConstruction
      ? EntityState.under_construction
      : EntityState.builded
  }

  if (!entity?.faction && (isCharacterEntity(entity) || isBuildingEntity(entity))) {
    entity.faction = EntityFaction.self
  }

  if (isCharacterEntity(entity)) {
    entity.state = EntityState.wait
  }

  if (isGroundEntity(entity)) {
    entity.position.y -= 0.5
  }

  if (metaData?.propriety?.size) {
    entity.size = metaData.propriety.size
  }

  if (metaData?.propriety?.defaultActions) {
    metaData.propriety.defaultActions.forEach((actionType) => {
      const action = getMetaData<ActionMetadataInterface<any>>(actionType).factory({
        entity,
      })
      addAction(entity.actions, action)
    })
  }

  return entity
}
