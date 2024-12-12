import EntityInterface from "@/src/domain/entity/EntityInterface"
import GameInterfaceInterface from "@/src/domain/game/GameInterface"
import { getByTypeInContainer } from "@/packages/container/container"
import { JsonLdType } from "@/packages/utils/jsonLd/jsonLd"

/**
 * Make search and return earnest entity
 */
export const findClosest = (
  entity: EntityInterface,
  targetsEntities: JsonLdType,
  game: GameInterfaceInterface,
): EntityInterface | undefined => {
  const character = entity

  if (!character) {
    console.error("Character not found")
    return undefined
  }

  let closestTree: EntityInterface | null = null
  let minDistance = Infinity
  const targets = getByTypeInContainer(game.entities, targetsEntities)
  targets.forEach((entity) => {
    const distance = Math.sqrt(
      Math.pow(entity.position.x - character.position.x, 2) +
        Math.pow(entity.position.y - character.position.y, 2) +
        Math.pow(entity.position.z - character.position.z, 2),
    )

    if (distance < minDistance) {
      minDistance = distance
      closestTree = entity
    }
  })

  return closestTree
}
