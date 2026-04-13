import { entityFactory } from "@/src/game/entity/entityFactory"
import { EntityResourceInterface } from "@/src/game/entity/EntityResourceInterface"
import {
  hasCollisionInGame,
  hasCollisionWithGround,
} from "@/src/game/entity/useCase/entityHasCollision"
import { metaDataFactory } from "@/packages/metadata/MetadataInterface"

export function entityResourceFactory<
  T extends EntityResourceInterface = EntityResourceInterface,
>(entityMetaData: { "@id": string } & Partial<T>): T {
  const meta = {
    canBeBuild: (payload) => {
      return (
        !hasCollisionInGame(payload.game, payload.entity) &&
        hasCollisionWithGround(payload.game, payload.entity)
      )
    },
    "@type": "resource/entity",
    factory: entityFactory,
  } as Partial<EntityResourceInterface>

  return metaDataFactory({ ...meta, ...entityMetaData }) as T
}
