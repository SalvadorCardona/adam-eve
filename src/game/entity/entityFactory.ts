import { jsonLdFactory, JsonLdType } from "@/src/utils/jsonLd/jsonLd"
import { getMetaData } from "@/src/game/game/app/configGame"
import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"
import EntityInterface, {
  EntityState,
  factionState,
  isBuildingEntity,
  isCharacterEntity,
  isGroundEntity,
} from "@/src/game/entity/EntityInterface"

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
    faction: factionState.self,
    workers: [],
    life: 50,
    rotation: {
      x: 0,
      y: 0,
      z: 0,
    },
    connections: {},
    position: {
      x: 0,
      y: 0.01,
      z: 0,
    },
    size: {
      x: 1,
      y: 1,
      z: 1,
    },
    actions: {},
    inventory: {},

    ...(metaData?.defaultEntity ? metaData?.defaultEntity() : {}),
    ...(payload?.entity ?? {}),
  }

  if (!baseEntity.maxLife) {
    baseEntity.maxLife = baseEntity.life
  }

  const entity = jsonLdFactory<EntityInterface>(ldType, baseEntity) as T

  if (isBuildingEntity(entity)) {
    entity.state = EntityState.under_construction
  }

  if (isCharacterEntity(entity)) {
    entity.state = EntityState.wait
  }

  if (isGroundEntity(entity)) {
    entity.position.y -= 0.5
  }

  return entity
}
