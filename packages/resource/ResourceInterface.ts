import {
  BaseJsonLdItemInterface,
  JsonLdIriAble,
  JsonLdIriContainerInterface,
} from "@/packages/jsonLd/jsonLd"
import createUniqId from "@/packages/id/createUniqId"

export const resourceRegistered: JsonLdIriContainerInterface<BaseJsonLdItemInterface> =
  {}

export const metaDataRegistered = resourceRegistered

export interface MetadataInterface {
  "@id": string
  [key: string]: any
}

const addResource = (metaData: BaseJsonLdItemInterface) => {
  resourceRegistered[metaData["@id"]] = metaData
  if (metaData["@type"] && !resourceRegistered[metaData["@type"]]) {
    resourceRegistered[metaData["@type"]] = metaData
  }
}

export function getResource<T = BaseJsonLdItemInterface>(
  metaType: JsonLdIriAble,
): T {
  if (typeof metaType === "string") {
    if (resourceRegistered[metaType]) return resourceRegistered[metaType] as T
  } else if (metaType) {
    const resource = metaType["@resource"]
    if (resource && resourceRegistered[resource])
      return resourceRegistered[resource] as T
    const id = metaType["@id"]
    if (id && resourceRegistered[id]) return resourceRegistered[id] as T
    const type = metaType["@type"]
    if (type && resourceRegistered[type]) return resourceRegistered[type] as T
  }

  return undefined as unknown as T
}

export function createResource<
  T extends BaseJsonLdItemInterface = BaseJsonLdItemInterface,
>(resource: T): T {
  if (!resource["@id"]) {
    resource["@id"] = createUniqId()
  }

  addResource(resource)

  return resource
}
