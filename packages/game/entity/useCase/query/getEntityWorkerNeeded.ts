import EntityInterface from "@/packages/game/entity/EntityInterface"
import { getResource } from "@/packages/resource/ResourceInterface"
import { EntityResourceInterface } from "@/packages/game/entity/EntityResourceInterface"
import { EntityState } from "@/packages/game/entity/EntityState"

export function getEntityWorkerNeeded(entity: EntityInterface): number {
  const metaData = getResource<EntityResourceInterface>(entity)
  const workMeta = metaData.propriety.work

  if (!workMeta) return 0

  const numberOfWorker = workMeta.numberOfWorker

  if (!numberOfWorker) return 0

  if (entity.state === EntityState.under_construction) return 0

  if (!entity?.workers) return workMeta.numberOfWorker

  const numberOfWorkerInBuilding = entity.workers.length

  return numberOfWorker - numberOfWorkerInBuilding
}
