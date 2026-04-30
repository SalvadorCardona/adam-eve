import GameInterface from "@/packages/game/game/GameInterface"
import { entityQuery } from "@/packages/game/game/useCase/query/entityQuery"
import { EntityType } from "@/packages/game/entity/EntityResourceInterface"
import { EntityFaction } from "@/packages/game/entity/EntityInterface"
import { EntityState } from "@/packages/game/entity/EntityState"
import { getResource } from "@/packages/resource/ResourceInterface"
import { EntityResourceInterface } from "@/packages/game/entity/EntityResourceInterface"
import { workerEntityResource } from "@/app/entity/character/worker/workerEntityResource"

export function computeHousingCapacity(game: GameInterface): number {
  const buildings = entityQuery(game, {
    entityType: EntityType.building,
    faction: EntityFaction.self,
    state: EntityState.builded,
  })

  let total = 0
  for (const building of buildings) {
    const resource = getResource<EntityResourceInterface>(building)
    const capacity = resource?.propriety?.housingCapacity
    if (capacity) total += capacity
  }
  return total
}

export function countWorkers(game: GameInterface): number {
  return entityQuery(game, {
    "@type": workerEntityResource["@id"],
    faction: EntityFaction.self,
  }).length
}
