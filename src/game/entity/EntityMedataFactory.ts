import { entityFactory } from "@/src/game/entity/entityFactory"
import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"
import { hasCollisionInGame } from "@/src/game/entity/useCase/entityHasCollision"

export function entityMedataFactory<
  T extends EntityMetaDataInterface = EntityMetaDataInterface,
>(entityMetaData: Partial<T>): T {
  if (!entityMetaData["@type"]) {
    throw new Error("Type is not defined, is recommended to use factory")
  }

  return {
    canBeBuild: (payload) => {
      return !hasCollisionInGame(payload.game, payload.entity)
    },
    "@type": "union",
    factory: entityFactory,
    ...entityMetaData,
  } as T
}
