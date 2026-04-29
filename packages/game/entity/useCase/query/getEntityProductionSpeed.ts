import EntityInterface from "@/packages/game/entity/EntityInterface"
import { getResource } from "@/packages/resource/ResourceInterface"
import { EntityResourceInterface } from "@/packages/game/entity/EntityResourceInterface"

export function getEntityProductionSpeed(entity: EntityInterface): number {
  const resource = getResource<EntityResourceInterface>(entity)
  const baseSpeed = resource.propriety.work?.speedOfProduction
  if (!baseSpeed) return 0
  const workerCount = entity.workers?.length ?? 0
  if (workerCount === 0) return 0
  return Math.max(1, Math.round(baseSpeed / workerCount))
}
