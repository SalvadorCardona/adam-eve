import { GameMetaDataInterface } from "@/src/game/GameMetaDataInterface"
import { ActionUserMetaDataInterface } from "@/src/game/actionUser/ActionUserMetaDataInterface"

export function isActionUserMetadata(
  metadata: GameMetaDataInterface
): metadata is ActionUserMetaDataInterface {
  return metadata["@type"].startsWith("user-action/")
}