import {
  getLdType,
  JsonLdType,
  JsonLdTypeContainerInterface,
  JsonTypedLdInterface,
} from "@/src/utils/jsonLd/jsonLd"
import { BaseGameMetaDataInterface } from "@/src/game/BaseGameMetaDataInterface"

export interface MetadataInterface extends JsonTypedLdInterface {}

const metaDataRegistered: JsonLdTypeContainerInterface<MetadataInterface> = {}

const addMetaData = (metaData: MetadataInterface) => {
  metaDataRegistered[metaData["@type"]] = metaData
  console.log(metaDataRegistered)
}

export function getMetaData<T = BaseGameMetaDataInterface>(
  metaType: JsonLdType | BaseGameMetaDataInterface,
): T {
  const type = getLdType(metaType)

  if (metaDataRegistered[type]) return metaDataRegistered[type] as T

  throw new Error("Meta Data Not found: " + type)
}

export function metaDataFactory(metaData: MetadataInterface) {
  if (!metaData["@type"]) {
    throw new Error("Type is not defined, is recommended to use factory")
  }

  addMetaData(metaData)

  return metaData
}
