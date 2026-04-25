import EntityInterface from "@/packages/game/entity/EntityInterface"
import { getResource } from "@/packages/resource/ResourceInterface"
import { EntityResourceInterface } from "@/packages/game/entity/EntityResourceInterface"
import { EntityState } from "@/packages/game/entity/EntityState"

export function getEntityWorkerNeeded(entity: EntityInterface): number {
  const resource = getResource<EntityResourceInterface>(entity)
  const workData = resource.propriety.work

  if (!workData) return 0

  const numberOfWorker = workData.numberOfWorker

  if (!numberOfWorker) return 0

  if (entity.state === EntityState.under_construction) return 0

  if (!entity?.workers) return workData.numberOfWorker

  const numberOfWorkerInBuilding = entity.workers.length

  return numberOfWorker - numberOfWorkerInBuilding
}
