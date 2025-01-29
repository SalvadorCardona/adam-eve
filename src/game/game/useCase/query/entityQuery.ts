import GameInterface from "@/src/game/game/GameInterface"
import {
  getByLdType,
  getByLdTypeIn,
  JsonLdIri,
  JsonLdType,
} from "@/src/utils/jsonLd/jsonLd"
import { Vector2Interface, vector3ToVector2 } from "@/src/utils/math/Vector"
import EntityInterface, {
  EntityFaction,
  getEntityBaseType,
} from "@/src/game/entity/EntityInterface"
import { distanceBetweenVector2 } from "@/src/utils/math/distanceBetweenVector"
import { boundingCollision } from "@/src/utils/math/boundingCollision"
import { appLdType } from "@/src/AppLdType"
import { EntityState } from "@/src/game/entity/EntityState"
import { entityToBoundingBox } from "@/src/game/entity/entityToBoundingBox"
import { createBoundingFromZone } from "@/src/utils/math/boudingBox"

interface CircleSearch {
  center: Vector2Interface
  radius: number
}

interface SquareSearch {
  start: Vector2Interface
  end: Vector2Interface
}

type Order = "ASC" | "DESC"

export interface EntityQueryParams {
  "@type"?: JsonLdType | JsonLdType[]
  "@typeIn"?: JsonLdType | JsonLdType[]
  "@id"?: JsonLdIri | JsonLdIri[]
  "@idIsNot"?: JsonLdIri | JsonLdIri[]
  circleSearch?: CircleSearch
  squareSearch?: SquareSearch
  order?: {
    distance?: Order
  }
  state?: EntityState | EntityState[]
  faction?: EntityFaction | EntityFaction[]
  strict?: boolean
}

const orderTypePriority = {
  [appLdType.entityCharacter]: 1,
  [appLdType.entityBuilding]: 2,
  [appLdType.entityGround]: 3,
}

export function entityQueryFindOne<T = EntityInterface>(
  game: GameInterface,
  query: EntityQueryParams,
): undefined | T {
  const result = entityQuery<T>(game, query)
  return result.length ? result[0] : undefined
}

export function entityQuery<T = EntityInterface>(
  game: GameInterface,
  query: EntityQueryParams,
): T[] {
  const {
    "@type": type,
    "@typeIn": typeIn,
    "@id": id,
    circleSearch,
    squareSearch,
    state,
    order,
    faction,
    "@idIsNot": idIsNot,
  } = query

  if (id && !Array.isArray(id)) {
    const entity = Object.hasOwn(game.entities, id)
      ? (game.entities[id] as T)
      : undefined
    return entity ? [entity] : []
  }

  let entities: EntityInterface[] = Object.values(game.entities)

  if (type) {
    entities = getByLdType(game.entities, type)
  }

  if (typeIn) {
    entities = getByLdTypeIn(game.entities, typeIn)
  }

  if (id) {
    entities = entities.filter((entity) => {
      return id.includes(entity["@id"])
    })
  }

  if (idIsNot) {
    const idIsNotList = Array.isArray(idIsNot) ? idIsNot : [idIsNot]
    entities = entities.filter((entity) => {
      return !idIsNotList.includes(entity["@id"])
    })
  }

  if (circleSearch) {
    const { center, radius } = circleSearch
    const center2D = center
    entities = entities.filter((entity) => {
      return (
        distanceBetweenVector2(vector3ToVector2(entity.position), center2D) <= radius
      )
    })
  }

  if (state) {
    entities = entities.filter((entity) => {
      return entity.state && Array.isArray(state)
        ? state.includes(entity.state)
        : entity.state === state
    })
  }

  if (faction) {
    entities = entities.filter((entity) => {
      return entity.faction && Array.isArray(faction)
        ? faction.includes(entity.faction)
        : entity.faction === faction
    })
  }

  if (squareSearch) {
    const start2D = squareSearch.start
    const end2d = squareSearch.end
    entities = entities.filter((entity) => {
      return boundingCollision(
        entityToBoundingBox(entity),
        createBoundingFromZone(start2D, end2d),
      )
    })
  }

  entities.sort((a, b) => {
    const aType = getEntityBaseType(a)
    const bType = getEntityBaseType(b)
    if (!bType || !aType) return 0

    const priorityA = orderTypePriority[aType] || Infinity
    const priorityB = orderTypePriority[bType] || Infinity

    return priorityA - priorityB
  })

  if (order?.distance) {
    const referencePoint = circleSearch ? circleSearch.center : { x: 0, y: 0 }
    entities.sort((a, b) => {
      const distanceA = distanceBetweenVector2(
        vector3ToVector2(a.position),
        referencePoint,
      )
      const distanceB = distanceBetweenVector2(
        vector3ToVector2(b.position),
        referencePoint,
      )
      return order.distance === "ASC" ? distanceB - distanceA : distanceA - distanceB
    })
  }

  return entities as T[]
}
