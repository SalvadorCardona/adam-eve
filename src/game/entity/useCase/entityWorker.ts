import EntityInterface from "@/src/game/entity/EntityInterface"
import { removeValue } from "@/src/utils/array/array"
import { getLdIri, JsonLdIriAble } from "@/src/utils/jsonLd/jsonLd"

export function addWorkerToEntity(
  source: EntityInterface,
  worker: JsonLdIriAble,
): void {
  if (!source.workers) source.workers = []

  source.workers.push(getLdIri(worker))
}

export function removeWorkerFromEntity(
  source: EntityInterface,
  worker: JsonLdIriAble,
): void {
  if (!source.workers) return

  source.workers = removeValue(source.workers, getLdIri(worker))
}
