import { ActionUserMetaDataInterface } from "@/src/game/actionUser/ActionUserMetaDataInterface"
import { createBuildingUserActionMetadata } from "@/src/game/actionUser/app/CreateBuildingUserAction/CreateBuildingUserActionMetadata"

export const onClickMapUserActionMetadata: ActionUserMetaDataInterface = {
  "@type": "user-action/on-click-entity",
  onCall: ({ game }) => {
    createBuildingUserActionMetadata.onApply &&
      createBuildingUserActionMetadata.onApply({ game })
  },
}
