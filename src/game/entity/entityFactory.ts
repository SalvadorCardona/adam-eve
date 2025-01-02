import { jsonLdFactory, JsonLdType } from "@/src/utils/jsonLd/jsonLd"
import { getMetaData } from "@/src/game/game/app/configGame"
import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"
import EntityInterface, {
  entityState,
  factionState,
} from "@/src/game/entity/EntityInterface"

export function entityFactory<T extends EntityInterface = EntityInterface>(
  payload:
    | {
        entity?: Partial<T>
      }
    | undefined,
): T {
  let ldType: JsonLdType = "undefined"

  if (payload?.entity?.["@type"]) ldType = payload.entity["@type"]
  // @ts-ignore
  if (this && this["@type"]) ldType = this["@type"]
  if (ldType === "undefined") console.warn("Has not Type", payload?.entity)

  const metaData = getMetaData<EntityMetaDataInterface>(ldType)
  const baseEntity: Partial<EntityInterface> = {
    state: ldType.startsWith("entity/building")
      ? entityState.under_construction
      : entityState.wait,
    faction: factionState.self,
    collisionAble: true,
    worker: {},
    life: 50,
    rotation: {
      x: 0,
      y: 0,
      z: 0,
    },
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
  return jsonLdFactory<EntityInterface>(ldType, baseEntity) as T
}
