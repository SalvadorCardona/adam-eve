import { createEntity } from "@/packages/game/entity/createEntity"
import { EntityResourceInterface } from "@/packages/game/entity/EntityResourceInterface"
import {
  hasCollisionInGame,
  hasCollisionWithGround,
} from "@/packages/game/entity/useCase/entityHasCollision"
import {
  BaseGameResource,
  createResourceGame,
} from "@/packages/game/BaseGameResource"

export function createEntityResource<
  T extends EntityResourceInterface = EntityResourceInterface,
>(resource: Partial<BaseGameResource> & Partial<T>): T {
  const meta = {
    canBeBuild: (payload) => {
      return (
        !hasCollisionInGame(payload.game, payload.entity) &&
        hasCollisionWithGround(payload.game, payload.entity)
      )
    },
    "@type": "entity",
    create: createEntity,
  } as Partial<EntityResourceInterface>

  return createResourceGame({ ...meta, ...resource }) as T
}
