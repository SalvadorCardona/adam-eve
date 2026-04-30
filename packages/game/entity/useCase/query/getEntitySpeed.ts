import EntityInterface from "@/packages/game/entity/EntityInterface"
import { EntityResourceInterface } from "@/packages/game/entity/EntityResourceInterface"
import { getResource } from "@/packages/resource/ResourceInterface"
import GameInterface from "@/packages/game/game/GameInterface"

const WORKER_ENTITY_TYPE = "resource/worker"

export function getEntitySpeed(
  entity: EntityInterface,
  game?: GameInterface,
): number {
  const entityMetaData = getResource(entity) as EntityResourceInterface
  const baseSpeed = entityMetaData.propriety?.speed ?? 0.1
  if (!game) return baseSpeed
  if (entity["@type"] === WORKER_ENTITY_TYPE) {
    return baseSpeed * (game.modifiers?.workerSpeedMultiplier ?? 1)
  }
  return baseSpeed
}
