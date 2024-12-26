import { ActionUserMetaDataInterface } from "@/src/game/actionUser/ActionUserMetaDataInterface"
import { removeBuildingUserActionMetadata } from "@/src/game/actionUser/app/RemoveBuildingUserAction/RemoveBuildingUserActionMetadata"
import EntityInterface from "@/src/game/entity/EntityInterface"

interface OnClickEntityUserActionMetadataInterface
  extends ActionUserMetaDataInterface {
  data: { entitySelection: EntityInterface | undefined }
}

export const onSelectEntityUserActionMetadata: OnClickEntityUserActionMetadataInterface =
  {
    "@type": "user-action/on-click-entity",
    onApply: ({ game, entity }) => {
      onSelectEntityUserActionMetadata.data.entitySelection = entity
      if (!game.userControl.currentAction) {
        game.userControl.currentAction = onSelectEntityUserActionMetadata
      }
      removeBuildingUserActionMetadata.onApply &&
        removeBuildingUserActionMetadata.onApply({ game, entity })
    },
    data: {
      entitySelection: undefined,
    },
  }
