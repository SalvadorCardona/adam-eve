import EntityInterface from "@/src/game/entity/EntityInterface"
import { EntityResourceInterface } from "@/src/game/entity/EntityResourceInterface"
import { distanceBetweenVector3 } from "@/packages/math/distanceBetweenVector3"
import { EntityState } from "@/src/game/entity/EntityState"
import { getMetaData } from "@/packages/metadata/MetadataInterface"
import GameInterface from "@/src/game/game/GameInterface"

export function entityAttackEntity(
  game: GameInterface,
  entitySource: EntityInterface,
  entityTarget: EntityInterface,
): boolean {
  const entitySourceMeta = getMetaData<EntityResourceInterface>(entitySource)
  const entityTargetMeta = getMetaData<EntityResourceInterface>(entityTarget)

  const attack = entitySourceMeta.propriety.attack
  if (!attack) return false

  const canBeAttack = entityCanBeAttackEntity(entitySource, entityTarget)
  if (canBeAttack) {
    entitySource.state = EntityState.attack
    entityTarget.life -= attack.damage
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
  const entityMeta = getMetaData<EntityResourceInterface>(entitySource)
  const attack = entityMeta.propriety.attack
  if (!attack) return false

  const distance = distanceBetweenVector3(
    entitySource.position,
    entityTarget.position,
  )

  return distance < attack.attackRange
}
