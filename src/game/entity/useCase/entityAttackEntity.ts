import EntityInterface from "@/src/game/entity/EntityInterface"
import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"
import { distanceBetweenVector } from "@/src/utils/math/distanceBetweenVector"
import { EntityState } from "@/src/game/entity/EntityState"
import { getMetaData } from "@/src/utils/metadata/MetadataInterface"
import GameInterface from "@/src/game/game/GameInterface"

export function entityAttackEntity(
  game: GameInterface,
  entitySource: EntityInterface,
  entityTarget: EntityInterface,
): boolean {
  const entitySourceMeta = getMetaData<EntityMetaDataInterface>(entitySource)
  const entityTargetMeta = getMetaData<EntityMetaDataInterface>(entityTarget)

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
  const entityMeta = getMetaData<EntityMetaDataInterface>(entitySource)
  const attack = entityMeta.propriety.attack
  if (!attack) return false

  const distance = distanceBetweenVector(
    entitySource.position,
    entityTarget.position,
  )

  return distance < attack.attackRange
}
