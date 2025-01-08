import EntityInterface, { EntityState } from "@/src/game/entity/EntityInterface"
import { getMetaData } from "@/src/game/game/app/configGame"
import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"
import { distanceBetweenVector } from "@/src/utils/3Dmath/distanceBetweenVector"

export function entityAttackEntity(
  entitySource: EntityInterface,
  entityTarget: EntityInterface,
): boolean {
  const entityMeta = getMetaData<EntityMetaDataInterface>(entitySource)
  const attack = entityMeta.propriety.attack
  if (!attack) return false

  const canBeAttack = entityCanBeAttackEntity(entitySource, entityTarget)
  if (canBeAttack) {
    entitySource.state = EntityState.attack
    entityTarget.life -= attack.damage
    return true
  }

  return canBeAttack
}

export function entityCanBeAttackEntity(
  entitySource: EntityInterface,
  entityTarget: EntityInterface,
): boolean {
  const entityMeta = getMetaData<EntityMetaDataInterface>(entitySource)
  const attack = entityMeta.propriety.attack
  if (!attack) return false

  const distance = distanceBetweenVector(
    entitySource.position,
    entityTarget.position,
  )

  return distance < attack.attackRange
}
