import { ActionUserMetaDataInterface } from "@/src/game/actionUser/ActionUserMetaDataInterface"
import { createJsonLdType } from "@/src/utils/jsonLd/jsonLd"
import { appLdType, appLdTypeEntity } from "@/src/AppLdType"
import {
  entityQuery,
  EntityQueryParams,
} from "@/src/game/game/useCase/query/entityQuery"
import GameInterface from "@/src/game/game/GameInterface"
import { removeBuildingUserActionMetadata } from "@/src/game/actionUser/app/RemoveBuildingUserAction/removeBuildingUserActionMetadata"
import { createEntityUserActionMetadata } from "@/src/game/actionUser/app/CreateEntityUserAction/createEntityUserActionMetadata"
import { updateGame } from "@/src/game/game/updateGame"
import EntityInterface from "@/src/game/entity/EntityInterface"
import { diviseVector2D } from "@/src/utils/math/diviseVector"
import { vectorRatioDown } from "@/src/utils/math/ratio"
import {
  createVector2,
  isVector2Equal,
  vectorAddition,
} from "@/src/utils/math/vector"

interface OnClickEntityUserActionMetadataInterface
  extends ActionUserMetaDataInterface {
  onSelectZone: (params: { game: GameInterface }) => void
}

export const onSelectEntityUserActionMetadata: OnClickEntityUserActionMetadataInterface =
  {
    "@type": createJsonLdType(appLdType.userAction, "on-click-entity"),
    onSelectZone: ({ game }) => {
      const entities = entitiesFinder(game)
      console.log("selct", entities)
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

  for (const entityQueryParam of appLdTypeEntity) {
    baseQuery["@typeIn"] = entityQueryParam
    const entities = entityQuery(game, baseQuery)
    if (entities.length) return entities
  }

  return []
}
