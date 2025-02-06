import { BaseGameMetaDataInterface } from "@/src/game/BaseGameMetaDataInterface"
import { JsonLdType } from "@/src/utils/jsonLd/jsonLd"
import { getMetaData as base } from "@/src/utils/metadata/MetadataInterface"

export function getMetaData<T = BaseGameMetaDataInterface>(
  metaType: JsonLdType | BaseGameMetaDataInterface,
): T {
  return base(metaType)
}
