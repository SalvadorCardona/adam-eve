import { ActionUserMetaDataInterface } from "@/src/game/actionUser/ActionUserMetaDataInterface"
import { JsonLdTypeFactory } from "@/src/utils/jsonLd/jsonLd"
import { appLdType } from "@/src/AppLdType"
import { entityQuery } from "@/src/game/entity/useCase/query/entityQuery"
import GameInterface from "@/src/game/game/GameInterface"
import { removeBuildingUserActionMetadata } from "@/src/game/actionUser/app/RemoveBuildingUserAction/removeBuildingUserActionMetadata"
import { bounding2DSize, boundingBoxObbToAabb } from "@/src/utils/3Dmath/boudingBox"
import { createBuildingUserActionMetadata } from "@/src/game/actionUser/app/CreateEntityUserAction/createBuildingUserActionMetadata"

interface OnClickEntityUserActionMetadataInterface
  extends ActionUserMetaDataInterface {
  // onClick: (params: { game: GameInterface }) => void
  onSelectZone: (params: { game: GameInterface }) => void
}

export const onSelectEntityUserActionMetadata: OnClickEntityUserActionMetadataInterface =
  {
    "@type": JsonLdTypeFactory(appLdType.userAction, "on-click-entity"),
    // onClick: (params) => {
    //   const entities = entityQuery(game, {
    //     circleSearch: {
    //       center: game.userControl.mouseState.bounding3D.position,
    //       radius: 0.3,
    //     },
    //   })
    //   game.userControl.entitiesSelected = entities.map((e) => e["@id"])
    //
    //   onSelectEntityUserActionMetadata.onApply({ game: game })
    // },
    onSelectZone: ({ game }) => {
      const bounding = boundingBoxObbToAabb(game.userControl.mouseState.bounding3D)
      const isClick = bounding2DSize(game.userControl.mouseState.bounding3D) < 0.3
      const entities = isClick
        ? entityQuery(game, {
            circleSearch: {
              center: game.userControl.mouseState.bounding3D.position,
              radius: 1,
            },
          })
        : entityQuery(game, {
            squareSearch: {
              start: bounding.min,
              end: bounding.max,
            },
          })

      // console.log("selected", entities[0])
      game.userControl.entitiesSelected = entities.map((e) => e["@id"])

      onSelectEntityUserActionMetadata.onApply({ game: game })
    },
    onApply: (payload) => {
      createBuildingUserActionMetadata.onApply(payload)
      removeBuildingUserActionMetadata.onApply(payload)
    },
  }
