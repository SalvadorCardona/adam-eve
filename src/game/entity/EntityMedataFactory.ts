import { entityFactory } from "@/src/game/entity/entityFactory"
import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"
import {
  hasCollisionInGame,
  hasCollisionWithGround,
} from "@/src/game/entity/useCase/entityHasCollision"
import { metaDataFactory } from "@/src/utils/metadata/MetadataInterface"

export function entityMedataFactory<
  T extends EntityMetaDataInterface = EntityMetaDataInterface,
>(entityMetaData: Partial<T>): T {
  const meta = {
    canBeBuild: (payload) => {
      return (
        !hasCollisionInGame(payload.game, payload.entity) &&
        hasCollisionWithGround(payload.game, payload.entity)
      )
    },
    "@type": "undefined",
    factory: entityFactory,
    ...entityMetaData,
  } as T

  return metaDataFactory(meta) as T
}
