import { entityFactory } from "@/packages/game/entity/entityFactory"
import { EntityResourceInterface } from "@/packages/game/entity/EntityResourceInterface"
import {
  hasCollisionInGame,
  hasCollisionWithGround,
} from "@/packages/game/entity/useCase/entityHasCollision"
import { createResource } from "@/packages/resource/ResourceInterface"

export function createEntityResource<
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

  return createResource({ ...meta, ...entityMetaData }) as T
}
