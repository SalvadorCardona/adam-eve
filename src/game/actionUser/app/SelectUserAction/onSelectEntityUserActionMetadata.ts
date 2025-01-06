import { ActionUserMetaDataInterface } from "@/src/game/actionUser/ActionUserMetaDataInterface"
import { JsonLdTypeFactory } from "@/src/utils/jsonLd/jsonLd"
import { appLdType } from "@/src/AppLdType"
import { entityQuery } from "@/src/game/entity/useCase/query/entityQuery"
import GameInterface from "@/src/game/game/GameInterface"
import { createBuildingUserActionMetadata } from "@/src/game/actionUser/app/CreateBuildingUserAction/createBuildingUserActionMetadata"
import { removeBuildingUserActionMetadata } from "@/src/game/actionUser/app/RemoveBuildingUserAction/removeBuildingUserActionMetadata"

interface OnClickEntityUserActionMetadataInterface
  extends ActionUserMetaDataInterface {
  onClick: (params: { game: GameInterface }) => void
  onSelectZone: (params: { game: GameInterface }) => void
}

export const onSelectEntityUserActionMetadata: OnClickEntityUserActionMetadataInterface =
  {
    "@type": JsonLdTypeFactory(appLdType.userAction, "on-click-entity"),
    onClick: (params) => {
      const entities = entityQuery({
        game: params.game,
        circleSearch: {
          center: params.game.userControl.mouseState.mousePosition,
          radius: 0.3,
        },
      })

      params.game.userControl.entitiesSelected = entities.map((e) => e["@id"])

      onSelectEntityUserActionMetadata.onApply({ game: params.game })
    },
    onSelectZone: (params) => {
      const entities = entityQuery({
        game: params.game,
        squareSearch: {
          start: params.game.userControl.mouseState.startClickPositon,
          end: params.game.userControl.mouseState.endClickPosition,
        },
      })

      params.game.userControl.entitiesSelected = entities.map((e) => e["@id"])

      onSelectEntityUserActionMetadata.onApply({ game: params.game })
    },
    onApply: (payload) => {
      createBuildingUserActionMetadata.onApply(payload)
      removeBuildingUserActionMetadata.onApply(payload)
    },
  }
