import { ActionUserMetaDataInterface } from "@/src/game/actionUser/ActionUserMetaDataInterface"
import { createJsonLdType } from "@/packages/jsonLd/jsonLd"
import { appLdType } from "@/app/AppLdType"
import {
  entityQuery,
  EntityQueryParams,
} from "@/src/game/game/useCase/query/entityQuery"
import GameInterface from "@/src/game/game/GameInterface"
import { removeBuildingUserActionMetadata } from "@/src/game/actionUser/app/RemoveBuildingUserAction/removeBuildingUserActionMetadata"
import { createEntityUserActionMetadata } from "@/src/game/actionUser/app/CreateEntityUserAction/createEntityUserActionMetadata"
import { updateGame } from "@/src/game/game/updateGame"
import EntityInterface from "@/src/game/entity/EntityInterface"
import { diviseVector2D } from "@/packages/math/diviseVector"
import { vectorRatioDown } from "@/packages/math/ratio"
import {
  createVector2,
  isVector2Equal,
  vectorAddition,
} from "@/packages/math/vector"
import { EntityType } from "@/src/game/entity/EntityResourceInterface"

interface OnClickEntityUserActionMetadataInterface extends ActionUserMetaDataInterface {
  onSelectZone: (params: { game: GameInterface }) => void
}

export const onSelectEntityUserActionMetadata: OnClickEntityUserActionMetadataInterface =
  {
    "@type": createJsonLdType(appLdType.userAction, "on-click-entity"),
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
    baseQuery["@typeIn"] = entityQueryParam
    const entities = entityQuery(game, baseQuery)
    if (entities.length) return entities
  }

  return []
}
