import { ActionUserResource } from "@/packages/game/actionUser/ActionUserResource"
import { EntityResourceInterface } from "@/packages/game/entity/EntityResourceInterface"
import { mouseIcon } from "@/packages/ui/MouseCursor/MouseIcon"

interface PlayerBuildUserActionInterface extends ActionUserResource {
  data: { entityMetaData: EntityResourceInterface | undefined }
}

export const playerBuildUserActionMetadata: PlayerBuildUserActionInterface = {
  mouseIcon: mouseIcon.build,
  "@id": "player-build",
  "@type": "action-user",
  onCall: ({ game, metaData }) => {
    playerBuildUserActionMetadata.data.entityMetaData =
      metaData as EntityResourceInterface
    game.userControl.currentAction = playerBuildUserActionMetadata
  },
  onApply: () => {},
  data: {
    entityMetaData: undefined,
  },
}
