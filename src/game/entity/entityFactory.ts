import { jsonLdFactory, JsonLdType } from "@/src/utils/jsonLd/jsonLd"
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
import { getMetaData } from "@/src/game/game/app/getMetaData"

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
    rotation: 0,
    connections: {},
    position: {
      x: 0,
      y: 0,
      z: 0,
    },
    ...(metaData?.defaultEntity ? metaData?.defaultEntity() : {}),
    ...(payload?.entity ?? {}),
  }

  if (metaData?.propriety?.health) {
    baseEntity.life = metaData.propriety.health.maxLife
  }

  const entity = jsonLdFactory<EntityInterface>(ldType, baseEntity) as T

  entity.position = aroundVector(entity.position, 50)

  if (isBuildingEntity(entity)) {
    entity.state = metaData?.propriety?.ressourceForConstruction
      ? EntityState.under_construction
      : EntityState.builded

    entity.workers = []
  }

  if (isCharacterEntity(entity) || isBuildingEntity(entity)) {
    entity.inventory = {}
    entity.actions = {}
    entity.faction = entity?.faction ? entity.faction : EntityFaction.self

    if (metaData?.propriety?.defaultActions) {
      metaData.propriety.defaultActions.forEach((actionType) => {
        const action = getMetaData<ActionMetadataInterface<any>>(actionType).factory(
          {
            entity,
          },
        )
        addAction(entity.actions, action)
      })
    }
  }

  if (isCharacterEntity(entity)) {
    entity.state = EntityState.wait
  }

  if (isGroundEntity(entity)) {
    entity.position.y -= 0.5
  } else {
    entity.position.y += 1
  }

  return entity
}
