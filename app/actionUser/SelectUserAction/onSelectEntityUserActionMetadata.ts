import { ActionUserResource } from "@/packages/game/actionUser/ActionUserResource"
import {
  entityQuery,
  EntityQueryParams,
} from "@/packages/game/game/useCase/query/entityQuery"
import GameInterface from "@/packages/game/game/GameInterface"
import { removeBuildingUserActionMetadata } from "@/app/actionUser/RemoveBuildingUserAction/removeBuildingUserActionMetadata"
import { createEntityUserActionMetadata } from "@/app/actionUser/CreateEntityUserAction/createEntityUserActionMetadata"
import { updateGame } from "@/packages/game/game/updateGame"
import EntityInterface from "@/packages/game/entity/EntityInterface"
import { diviseVector2D } from "@/packages/math/diviseVector"
import { vectorRatioDown } from "@/packages/math/ratio"
import {
  createVector2,
  isVector2Equal,
  vectorAddition,
} from "@/packages/math/vector"
import { EntityType } from "@/packages/game/entity/EntityResourceInterface"

interface OnClickEntityUserActionMetadataInterface extends ActionUserResource {
  onSelectZone: (params: { game: GameInterface }) => void
}

export const onSelectEntityUserActionMetadata: OnClickEntityUserActionMetadataInterface =
  {
    "@id": "on-click-entity",
    "@type": "action-user",
    onSelectZone: ({ game }) => {
      const entities = entitiesFinder(game)
      game.userControl.entitiesSelected = entities.map((e) => e["@id"])
      updateGame(game, game.userControl)

      onSelectEntityUserActionMetadata.onApply({ game: game })
    },
    onApply: (payload) => {
      createEntityUserActionMetadata.onApply(payload)
      removeBuildingUserActionMetadata.onApply(payload)
    },
  }

function entitiesFinder(game: GameInterface): EntityInterface[] {
  const startPosition = vectorRatioDown(
    game.mouseState.startPosition,
    game.camera.zoom,
  )
  let endPositionPosition = vectorRatioDown(
    game.mouseState.endPosition,
    game.camera.zoom,
  )

  if (isVector2Equal(startPosition, endPositionPosition)) {
    endPositionPosition = vectorAddition(endPositionPosition, createVector2(1, 1))
  }

  const positions = diviseVector2D(startPosition, endPositionPosition)

  if (positions.length === 0) return []

  const [start] = [...positions]
  const [end] = [...positions].slice(-1)

  const baseQuery: EntityQueryParams = {
    squareSearch: {
      start,
      end,
    },
  }

  for (const entityQueryParam of [
    EntityType.character,
    EntityType.building,
    EntityType.resource,
    EntityType.ground,
  ]) {
    baseQuery.entityType = entityQueryParam
    const entities = entityQuery(game, baseQuery)
    if (entities.length) return entities
  }

  return []
}
