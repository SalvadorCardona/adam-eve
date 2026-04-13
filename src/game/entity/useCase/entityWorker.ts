import EntityInterface from "@/src/game/entity/EntityInterface"
import { removeValue } from "@/packages/array/array"
import { getLdIri, JsonLdIriAble } from "@/packages/jsonLd/jsonLd"
import { addActionToEntity, hasAction } from "@/src/game/action/ActionInterface"
import { getMetaData } from "@/packages/metadata/MetadataInterface"
import { EntityResourceInterface } from "@/src/game/entity/EntityResourceInterface"
import GameInterface from "@/src/game/game/GameInterface"
import { getEntityWorkerNeeded } from "@/src/game/entity/useCase/query/getEntityWorkerNeeded"

export function addWorkerToEntity(
  game: GameInterface,
  source: EntityInterface,
  worker: JsonLdIriAble,
): void {
  if (!source.workers) {
    source.workers = []
  }
  const metaData = getMetaData<EntityResourceInterface>(source)
  if (!metaData.workerAction) {
    return
  }

  if (getEntityWorkerNeeded(source) <= 0) return
  if (hasAction(worker)) return

  addActionToEntity(
    worker,
    metaData.workerAction.factory({
      entity: worker,
      game,
      createdBy: source["@id"],
    }),
  )

  source.workers.push(getLdIri(worker))
}

export function removeWorkerFromEntity(
  source: EntityInterface,
  worker: JsonLdIriAble,
): void {
  if (!source.workers) return

  source.workers = removeValue(source.workers, getLdIri(worker))
}
