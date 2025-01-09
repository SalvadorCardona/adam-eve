import GameInterface from "@/src/game/game/GameInterface"
import createUniqId from "@/src/utils/id/createUniqId"
import { getByLdType, JsonLdTypeContainerInterface } from "@/src/container/container"
import { appLdType } from "@/src/AppLdType"
import { jsonLdFactory, JsonLdType } from "@/src/utils/jsonLd/jsonLd"
import EntityInterface, {
  getEntityBaseType,
} from "@/src/game/entity/EntityInterface"

interface HashInterface {
  hash: string
  count: number
}

export interface GameCalculatedInterface
  extends JsonLdTypeContainerInterface<HashInterface> {}

export function createGameCalculated(game: GameInterface): GameCalculatedInterface {
  return {
    [appLdType.entityBuilding]: hashFactory(game, appLdType.entityBuilding),
    [appLdType.entityCharacter]: hashFactory(game, appLdType.entityCharacter),
    [appLdType.entityGround]: hashFactory(game, appLdType.entityGround),
  }
}

function hashFactory(game: GameInterface, jsonLdType: JsonLdType) {
  return jsonLdFactory<HashInterface>(jsonLdType, {
    hash: createUniqId(),
    count: getByLdType(game.entities, jsonLdType).length,
  })
}

export function updateGameCalculated(
  game: GameInterface,
  entityInterface: EntityInterface,
) {
  const type = getEntityBaseType(entityInterface)

  if (!type) return

  game.gameCalculated[type] = hashFactory(game, type)
}
