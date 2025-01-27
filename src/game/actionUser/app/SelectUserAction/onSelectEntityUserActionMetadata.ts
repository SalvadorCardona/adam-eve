import { ActionUserMetaDataInterface } from "@/src/game/actionUser/ActionUserMetaDataInterface"
import { JsonLdTypeFactory } from "@/src/utils/jsonLd/jsonLd"
import { appLdType } from "@/src/AppLdType"
import { entityQuery } from "@/src/game/entity/useCase/query/entityQuery"
import GameInterface from "@/src/game/game/GameInterface"
import { removeBuildingUserActionMetadata } from "@/src/game/actionUser/app/RemoveBuildingUserAction/removeBuildingUserActionMetadata"
import { bounding2DSize, boundingBox2DObbToAabb } from "@/src/utils/math/boudingBox"
import { createEntityUserActionMetadata } from "@/src/game/actionUser/app/CreateEntityUserAction/createEntityUserActionMetadata"
import { updateGame } from "@/src/game/game/updateGame"

interface OnClickEntityUserActionMetadataInterface
  extends ActionUserMetaDataInterface {
  // onClick: (params: { game: GameInterface }) => void
  onSelectZone: (params: { game: GameInterface }) => void
}

export const onSelectEntityUserActionMetadata: OnClickEntityUserActionMetadataInterface =
  {
    "@type": JsonLdTypeFactory(appLdType.userAction, "on-click-entity"),
    onSelectZone: ({ game }) => {
      const bounding = boundingBox2DObbToAabb(game.mouseState.bounding2d)
      const isClick = bounding2DSize(game.mouseState.bounding2d) < 0.3

      const entities = isClick
        ? entityQuery(game, {
            circleSearch: {
              center: game.mouseState.position,
              radius: 50,
            },
          })
        : entityQuery(game, {
            squareSearch: {
              start: bounding.min,
              end: bounding.max,
            },
          })

      game.userControl.entitiesSelected = entities.map((e) => e["@id"])
      updateGame(game, game.userControl)

      onSelectEntityUserActionMetadata.onApply({ game: game })
    },
    onApply: (payload) => {
      createEntityUserActionMetadata.onApply(payload)
      removeBuildingUserActionMetadata.onApply(payload)
    },
  }
