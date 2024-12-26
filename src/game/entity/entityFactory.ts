import { jsonLdFactory, JsonLdType } from "@/src/utils/jsonLd/jsonLd"
import { getMetaData } from "@/src/game/game/app/configGame"
import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"
import EntityInterface, { entityState } from "@/src/game/entity/EntityInterface"

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
    isBuild: !ldType.startsWith("entity/building"),
    state: entityState.wait,
    collisionAble: true,
    worker: {},
    speed: 0.1,
    life: 50,
    rotation: {
      x: 0,
      y: 0,
    },
    position: {
      x: 0,
      y: 0,
    },
    size: {
      x: 1,
      y: 1,
      z: 1,
    },
    actions: {},
    inventory: {},
    scale: {
      x: 1,
      y: 1,
      z: 1,
    },
    ...(metaData?.defaultEntity ? metaData?.defaultEntity() : {}),
    ...(payload?.entity ?? {}),
  }

  if (!baseEntity.maxLife) {
    baseEntity.maxLife = baseEntity.life
  }

  return jsonLdFactory<EntityInterface>(ldType, baseEntity) as T
}
