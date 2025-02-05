import { BaseGameMetaDataInterface } from "@/src/game/BaseGameMetaDataInterface"
import { getLdType, JsonLdType } from "@/src/utils/jsonLd/jsonLd"
import configGame from "@/src/game/game/app/configGame"

export function getMetaData<T = BaseGameMetaDataInterface>(
  metaType: JsonLdType | BaseGameMetaDataInterface,
): T {
  const type = getLdType(metaType)

  if (configGame[type]) return configGame[type] as T

  throw new Error("Meta Data Not found: " + JSON.stringify(metaType))
}
