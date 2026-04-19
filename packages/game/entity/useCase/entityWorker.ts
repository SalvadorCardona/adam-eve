import EntityInterface from "@/packages/game/entity/EntityInterface"
import { removeValue } from "@/packages/array/array"
import { getLdIri, JsonLdIriAble } from "@/packages/jsonLd/jsonLd"
import { getResource } from "@/packages/resource/ResourceInterface"
import { EntityResourceInterface } from "@/packages/game/entity/EntityResourceInterface"
import GameInterface from "@/packages/game/game/GameInterface"
import { getEntityWorkerNeeded } from "@/packages/game/entity/useCase/query/getEntityWorkerNeeded"
import { addActionToEntity } from "@/packages/game/action/AddActionToEntity"
import { hasAction } from "@/packages/game/action/HasAction"

export function addWorkerToEntity(
  game: GameInterface,
  source: EntityInterface,
  worker: JsonLdIriAble,
): void {
  if (!source.workers) {
    source.workers = []
  }
  const metaData = getResource<EntityResourceInterface>(source)

  if (!metaData.workerAction) {
    return
  }

  if (getEntityWorkerNeeded(source) <= 0) return
  if (hasAction(worker)) return
  if (metaData.canRecruit && !metaData.canRecruit({ entity: source, game })) return

  addActionToEntity(
    worker,
    metaData.workerAction.create({
      item: {
        item: worker,
        game,
        createdBy: source["@id"],
      },
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
