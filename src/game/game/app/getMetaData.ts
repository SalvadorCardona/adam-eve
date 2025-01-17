import { BaseGameMetaDataInterface } from "@/src/game/BaseGameMetaDataInterface"
import { JsonLdType } from "@/src/utils/jsonLd/jsonLd"
import configGame from "@/src/game/game/app/configGame"

export function getMetaData<T = BaseGameMetaDataInterface>(
  metaType: JsonLdType | BaseGameMetaDataInterface,
): T {
  if (typeof metaType === "string") return configGame[metaType] as T

  if (configGame[metaType["@type"]]) return configGame[metaType["@type"]] as T

  throw new Error("Meta Data Not found: " + JSON.stringify(metaType))
}
