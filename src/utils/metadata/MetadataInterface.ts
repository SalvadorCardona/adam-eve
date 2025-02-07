import {
  getLdType,
  JsonLdType,
  JsonLdTypeContainerInterface,
  JsonTypedLdInterface,
} from "@/src/utils/jsonLd/jsonLd"
import { BaseGameMetaDataInterface } from "@/src/game/BaseGameMetaDataInterface"

export interface MetadataInterface extends JsonTypedLdInterface {}

export const metaDataRegistered: JsonLdTypeContainerInterface<MetadataInterface> = {}

const addMetaData = (metaData: MetadataInterface) => {
  metaDataRegistered[metaData["@type"]] = metaData
}

export function getMetaData<T = MetadataInterface>(
  metaType: JsonLdType | BaseGameMetaDataInterface,
): T {
  const type = getLdType(metaType)

  if (metaDataRegistered[type]) return metaDataRegistered[type] as T

  throw new Error("Meta Data Not found: " + type)
}

export function metaDataFactory<T extends MetadataInterface = MetadataInterface>(
  metaData: T,
): T {
  if (!metaData["@type"]) {
    throw new Error("Type is not defined, is recommended to use factory")
  }

  addMetaData(metaData)

  return metaData
}
