import EntityInterface from "@/src/game/entity/EntityInterface"
import { getMetaData } from "@/packages/metadata/MetadataInterface"
import { EntityResourceInterface } from "@/src/game/entity/EntityResourceInterface"
import { EntityState } from "@/src/game/entity/EntityState"

export function getEntityWorkerNeeded(entity: EntityInterface): number {
  const metaData = getMetaData<EntityResourceInterface>(entity)
  const workMeta = metaData.propriety.work

  if (!workMeta) return 0

  const numberOfWorker = workMeta.numberOfWorker

  if (!numberOfWorker) return 0

  if (entity.state === EntityState.under_construction) return 0

  if (!entity?.workers) return workMeta.numberOfWorker

  const numberOfWorkerInBuilding = entity.workers.length

  return numberOfWorker - numberOfWorkerInBuilding
}
