import GameInterface from "@/src/game/game/GameInterface"
import { getByLdType, JsonLdTypeContainerInterface } from "@/src/container/container"
import { appLdType } from "@/src/AppLdType"
import { jsonLdFactory, JsonLDItem, JsonLdType } from "@/src/utils/jsonLd/jsonLd"
import EntityInterface, {
  getEntityBaseType,
} from "@/src/game/entity/EntityInterface"

interface HashInterface {
  hash: string
  count: number
  items: EntityInterface[]
}

export interface GameCalculatedInterface
  extends JsonLdTypeContainerInterface<HashInterface> {
  global: JsonLDItem<HashInterface>
}

export function createGameCalculated(game: GameInterface): GameCalculatedInterface {
  return {
    [appLdType.entityBuilding]: hashFactory(game, appLdType.entityBuilding),
    [appLdType.entityCharacter]: hashFactory(game, appLdType.entityCharacter),
    [appLdType.entityGround]: hashFactory(game, appLdType.entityGround),
    global: jsonLdFactory<HashInterface>("global", {
      count: Object.values(game.entities).length,
    }),
  }
}

function hashFactory(game: GameInterface, jsonLdType: JsonLdType) {
  const items = getByLdType<EntityInterface>(game.entities, jsonLdType)
  return jsonLdFactory<HashInterface>(jsonLdType, {
    count: items.length,
    items,
  })
}

export function updateGameCalculated(
  game: GameInterface,
  entityInterface: EntityInterface,
) {
  const type = getEntityBaseType(entityInterface)

  if (!type) return

  game.gameCalculated[type] = hashFactory(game, type)
  game.gameCalculated["global"] = jsonLdFactory<HashInterface>("global", {
    count: Object.values(game.entities).length,
  })
}
