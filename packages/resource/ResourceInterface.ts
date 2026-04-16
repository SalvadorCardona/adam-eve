import {
  BaseJsonLdItemInterface,
  getLdIri,
  JsonLdIriAble,
  JsonLdIriContainerInterface,
} from "@/packages/jsonLd/jsonLd"
import createUniqId from "@/packages/id/createUniqId"

export const resourceRegistered: JsonLdIriContainerInterface<BaseJsonLdItemInterface> =
  {}

const addResource = (metaData: BaseJsonLdItemInterface) => {
  resourceRegistered[metaData["@id"]] = metaData
}

export function getResource<T = BaseJsonLdItemInterface>(
  metaType: JsonLdIriAble,
): T | undefined {
  const id = getLdIri(metaType)
  if (id && resourceRegistered[id]) return resourceRegistered[id] as T

  return undefined
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
