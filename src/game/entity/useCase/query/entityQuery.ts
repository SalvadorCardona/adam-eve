import GameInterface from "@/src/game/game/GameInterface"
import { JsonLdIri, JsonLdType } from "@/src/utils/jsonLd/jsonLd"
import { Vector3Interface, vector3ToVector2 } from "@/src/utils/3Dmath/Vector"
import { getByLdType } from "@/src/container/container"
import EntityInterface from "@/src/game/entity/EntityInterface"
import { distanceBetweenVector2 } from "@/src/utils/3Dmath/distanceBetweenVector3"
import { has2dCollisionInZone } from "@/src/utils/3Dmath/has2dCollision"

interface CircleSearch {
  center: Vector3Interface
  radius: number
}

interface SquareSearch {
  start: Vector3Interface
  end: Vector3Interface
}

interface EntityQueryParams {
  game: GameInterface
  "@type"?: JsonLdType | JsonLdType[]
  "@id"?: JsonLdIri | JsonLdIri[]
  circleSearch?: CircleSearch
  squareSearch?: SquareSearch
}

export function entityQuery(params: EntityQueryParams): EntityInterface[] {
  const { game, "@type": type, "@id": id, circleSearch, squareSearch } = params
  let entities: EntityInterface[] = Object.values(game.entities)

  if (type) {
    entities = getByLdType(entities, type)
  }
  if (id) {
    entities = entities.filter((entity) => {
      return Array.isArray(id) ? id.includes(entity["@id"]) : entity["@id"] === id
    })
  }

  if (circleSearch) {
    const { center, radius } = circleSearch
    const center2D = vector3ToVector2(center)
    entities = entities.filter((entity) => {
      return (
        distanceBetweenVector2(vector3ToVector2(entity.position), center2D) <= radius
      )
    })
  }

  if (squareSearch) {
    const start2D = vector3ToVector2(squareSearch.start)
    const end2d = vector3ToVector2(squareSearch.end)
    entities = entities.filter((entity) => {
      return has2dCollisionInZone(
        vector3ToVector2(entity.position),
        vector3ToVector2(entity.size),
        start2D,
        end2d,
      )
    })
  }

  return entities
}
