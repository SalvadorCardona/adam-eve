import { ActionUserMetaDataInterface } from "@/src/game/actionUser/ActionUserMetaDataInterface"
import { createBuildingUserActionMetadata } from "@/src/game/actionUser/app/CreateBuildingUserAction/CreateBuildingUserActionMetadata"
import { JsonLdTypeFactory } from "@/src/utils/jsonLd/jsonLd"
import { appLdType } from "@/src/AppLdType"

export const onClickMapUserActionMetadata: ActionUserMetaDataInterface = {
  "@type": JsonLdTypeFactory(appLdType.userAction, "on-click-entity"),
  onCall: ({ game }) => {
    createBuildingUserActionMetadata.onApply &&
      createBuildingUserActionMetadata.onApply({ game })
  },
}
