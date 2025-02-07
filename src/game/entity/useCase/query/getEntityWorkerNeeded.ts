import EntityInterface from "@/src/game/entity/EntityInterface"
import { getMetaData } from "@/src/utils/metadata/MetadataInterface"
import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"
import { EntityState } from "@/src/game/entity/EntityState"

export function getEntityWorkerNeeded(entity: EntityInterface): number {
  const metaData = getMetaData<EntityMetaDataInterface>(entity)
  const workMeta = metaData.propriety.work

  if (!workMeta) return 0

  const numberOfWorker = workMeta.numberOfWorker

  if (!numberOfWorker) return 0

  if (entity.state === EntityState.under_construction) return 0

  if (!entity?.workers) return workMeta.numberOfWorker

  const numberOfWorkerInBuilding = entity.workers.length

  return numberOfWorker - numberOfWorkerInBuilding
}
