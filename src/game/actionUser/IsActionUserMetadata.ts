import { BaseGameMetaDataInterface } from "@/src/game/BaseGameMetaDataInterface"
import { ActionUserMetaDataInterface } from "@/src/game/actionUser/ActionUserMetaDataInterface"

export function isActionUserMetadata(
  metadata: BaseGameMetaDataInterface,
): metadata is ActionUserMetaDataInterface {
  return metadata["@type"].startsWith("user-action/")
}
