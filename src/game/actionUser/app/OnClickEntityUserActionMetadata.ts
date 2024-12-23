import { ActionUserMetaDataInterface } from "@/src/game/actionUser/ActionUserMetaDataInterface"
import { removeBuildingUserActionMetadata } from "@/src/game/actionUser/app/RemoveBuildingUserAction/RemoveBuildingUserActionMetadata"
import EntityInterface from "@/src/game/entity/EntityInterface"

interface Data {
  entitySelection: EntityInterface | undefined
}

interface OnClickEntityUserActionMetadataInterface
  extends ActionUserMetaDataInterface {
  data: { entitySelection: EntityInterface | undefined }
}

export const onClickEntityUserActionMetadata: OnClickEntityUserActionMetadataInterface =
  {
    "@type": "user-action/on-click-entity",
    onApply: ({ game, entity }) => {
      onClickEntityUserActionMetadata.data.entitySelection = entity
      game.userControl.entitySelection = entity
      removeBuildingUserActionMetadata.onApply &&
        removeBuildingUserActionMetadata.onApply({ game, entity })
      // onClickEntityUserActionMetadata.onApply &&
      //   onClickEntityUserActionMetadata.onApply({ game, entity })
    },
    data: {
      entitySelection: undefined,
    },
  }
