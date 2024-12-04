import EntityInterface from "@/app/domain/entity/EntityInterface"
import { jsonLdFactory } from "@/packages/utils/jsonLd/jsonLd"

export function entityFactory(payload: {
  entity: Partial<EntityInterface>
}): EntityInterface {
  // @ts-ignore
  const type: string = this["@type"] ? this["@type"] : "unkwon"

  const baseEntity: Partial<EntityInterface> = {
    speed: 0.1,
    life: 50,
    rotation: {
      x: 0,
      y: 0,
      z: 0,
    },
    position: {
      x: 4,
      y: 0,
      z: 4,
    },
    size: {
      x: 2,
      y: 2,
      z: 2,
    },
    actions: {},
    inventory: {},
  }

  return jsonLdFactory<EntityInterface>(type, { ...baseEntity, ...payload.entity })
}
