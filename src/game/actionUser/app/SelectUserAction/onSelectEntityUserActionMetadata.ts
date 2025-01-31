import { ActionUserMetaDataInterface } from "@/src/game/actionUser/ActionUserMetaDataInterface"
import { JsonLdTypeFactory } from "@/src/utils/jsonLd/jsonLd"
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

interface OnClickEntityUserActionMetadataInterface
  extends ActionUserMetaDataInterface {
  onSelectZone: (params: { game: GameInterface }) => void
}

export const onSelectEntityUserActionMetadata: OnClickEntityUserActionMetadataInterface =
  {
    "@type": JsonLdTypeFactory(appLdType.userAction, "on-click-entity"),
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
  const positions = diviseVector2D(
    vectorRatioDown(game.mouseState.startPosition, game.camera.zoom),
    vectorRatioDown(game.mouseState.endPosition, game.camera.zoom),
  )

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
