import GameInterface from "@/src/game/game/GameInterface"
import { JsonLdIri, JsonLdType } from "@/src/utils/jsonLd/jsonLd"
import { Vector3Interface, vector3ToVector2 } from "@/src/utils/3Dmath/Vector"
import { getByLdType } from "@/src/container/container"
import EntityInterface, {
  EntityFaction,
  getEntityBaseType,
} from "@/src/game/entity/EntityInterface"
import { distanceBetweenVector2 } from "@/src/utils/3Dmath/distanceBetweenVector"
import { has2dCollisionInZone } from "@/src/utils/3Dmath/has2dCollision"
import { appLdType } from "@/src/AppLdType"
import { EntityState } from "@/src/game/entity/EntityState"
import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"
import { getMetaData } from "@/src/game/game/app/getMetaData"

interface CircleSearch {
  center: Vector3Interface
  radius: number
}

interface SquareSearch {
  start: Vector3Interface
  end: Vector3Interface
}

type Order = "ASC" | "DESC"

interface EntityQueryParams {
  "@type"?: JsonLdType | JsonLdType[]
  "@id"?: JsonLdIri | JsonLdIri[]
  circleSearch?: CircleSearch
  squareSearch?: SquareSearch
  order?: {
    distance?: Order
  }
  state?: EntityState | EntityState[]
  faction?: EntityFaction | EntityFaction[]
}

const orderTypePriority = {
  [appLdType.entityCharacter]: 1,
  [appLdType.entityBuilding]: 2,
  [appLdType.entityGround]: 3,
}

export function entityQueryFindOne(
  game: GameInterface,
  query: EntityQueryParams,
): undefined | EntityInterface {
  const result = entityQuery(game, query)
  return result.length ? result[0] : undefined
}

export function entityQuery<T = EntityInterface>(
  game: GameInterface,
  query: EntityQueryParams,
): T[] {
  const {
    "@type": type,
    "@id": id,
    circleSearch,
    squareSearch,
    state,
    order,
    faction,
  } = query

  if (id && !Array.isArray(id)) {
    const entity = Object.hasOwn(game.entities, id)
      ? (game.entities[id] as T)
      : undefined
    return entity ? [entity] : []
  }

  let entities: EntityInterface[] = type
    ? getByLdType(game.entities, type)
    : Object.values(game.entities)

  if (id) {
    entities = entities.filter((entity) => {
      return id.includes(entity["@id"])
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
    const start2D = vector3ToVector2(squareSearch.start)
    const end2d = vector3ToVector2(squareSearch.end)
    entities = entities.filter((entity) => {
      const entityMetaData = getMetaData(entity) as EntityMetaDataInterface

      return has2dCollisionInZone(
        vector3ToVector2(entity.position),
        vector3ToVector2(entityMetaData.propriety.size as Vector3Interface),
        start2D,
        end2d,
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
    const referencePoint = circleSearch
      ? vector3ToVector2(circleSearch.center)
      : { x: 0, y: 0 }
    entities.sort((a, b) => {
      const distanceA = distanceBetweenVector2(
        vector3ToVector2(a.position),
        referencePoint,
      )
      const distanceB = distanceBetweenVector2(
        vector3ToVector2(b.position),
        referencePoint,
      )
      return order.distance === "ASC" ? distanceA - distanceB : distanceB - distanceA
    })
  }

  return entities as T[]
}
