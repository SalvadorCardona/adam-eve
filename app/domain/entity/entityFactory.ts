import EntityInterface from "@/app/domain/entity/EntityInterface"
import { jsonLdFactory, JsonLdType } from "@/packages/utils/jsonLd/jsonLd"
import { getMetaData } from "@/app/game/configGame"
import { EntityMetaDataInterface } from "@/app/domain/entity/EntityMetaDataInterface"

export function entityFactory(payload: {
  entity: Partial<EntityInterface>
}): EntityInterface {
  // @ts-ignore
  const ldType: JsonLdType = this["@type"] ? this["@type"] : "unkwon"

  const metaData = getMetaData<EntityMetaDataInterface>(ldType)

  const baseEntity: Partial<EntityInterface> = {
    speed: 0.1,
    life: 50,
    rotation: {
      x: 0,
      y: 0,
      z: 0,
    },
    position: {
      x: 0,
      y: 0.4,
      z: 0,
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
    ...payload.entity,
  }

  return jsonLdFactory<EntityInterface>(ldType, baseEntity)
}
