import EntityInterface from "@/packages/game/entity/EntityInterface"
import { EntityResourceInterface } from "@/packages/game/entity/EntityResourceInterface"
import { distanceBetweenVector3 } from "@/packages/math/distanceBetweenVector3"
import { EntityState } from "@/packages/game/entity/EntityState"
import { getResource } from "@/packages/resource/ResourceInterface"
import GameInterface from "@/packages/game/game/GameInterface"
import { applyDamageToEntity } from "@/packages/game/entity/useCase/applyDamageToEntity"

export function entityAttackEntity(
  game: GameInterface,
  entitySource: EntityInterface,
  entityTarget: EntityInterface,
): boolean {
  const entitySourceMeta = getResource<EntityResourceInterface>(entitySource)
  const entityTargetMeta = getResource<EntityResourceInterface>(entityTarget)

  if (!entitySourceMeta || !entityTargetMeta) return false

  const attack = entitySourceMeta.propriety.attack
  if (!attack) return false

  const canBeAttack = entityCanBeAttackEntity(entitySource, entityTarget)
  if (canBeAttack) {
    entitySource.state = EntityState.attack
    applyDamageToEntity(game, entityTarget, attack.damage)

    if (entityTargetMeta.onHit) {
      entityTargetMeta.onHit({ game, entity: entityTarget })
    }

    return true
  }

  entitySource.state = EntityState.wait
  return canBeAttack
}

export function entityCanBeAttackEntity(
  entitySource: EntityInterface,
  entityTarget: EntityInterface,
): boolean {
  const entityMeta = getResource<EntityResourceInterface>(entitySource)
  if (!entityMeta) return false

  const attack = entityMeta.propriety.attack
  if (!attack) return false

  const distance = distanceBetweenVector3(
    entitySource.position,
    entityTarget.position,
  )

  return distance < attack.attackRange
}
