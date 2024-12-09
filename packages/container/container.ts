import {
  BaseJsonLdInterface,
  JsonLdIri,
  JsonLDItem,
  JsonLdType,
} from "@/packages/utils/jsonLd/jsonLd"

export interface ContainerInterface<T = any> {
  [key: string]: T
}

export interface JsonLdContainerInterface<T = object> {
  [key: JsonLdIri]: JsonLDItem<T>
}

export interface JsonLdTypeContainerInterface<T = object> {
  [key: JsonLdType]: T
}

export function createContainer<T>(): ContainerInterface<T> {
  return {}
}

export function deleteContainerKey<T>(
  container: ContainerInterface<T>,
  key: JsonLdIri,
): void {
  delete container[key]
}

export function hasId<T>(container: ContainerInterface<T>, key: JsonLdIri): boolean {
  return key in container
}

export function updateContainer<T extends BaseJsonLdInterface>(
  container: ContainerInterface<T>,
  item: T,
): void {
  container[item["@id"]] = item
}

export function updateTypeContainer(
  container: JsonLdContainerInterface<object>,
  item: BaseJsonLdInterface,
): void {
  container[item["@type"]] = item
}

export function getByTypeInContainer<T>(
  container: JsonLdContainerInterface<T>,
  type: JsonLdType,
): T[] {
  return Object.values(container).filter((item) => item["@type"] === type)
}

export function getByLdType(
  container: JsonLdContainerInterface | JsonLdTypeContainerInterface,
  jsonLdType: JsonLdType,
): Array<JsonLdTypeContainerInterface | JsonLdContainerInterface> {
  const results = [] as Array<
    JsonLdTypeContainerInterface | JsonLdContainerInterface
  >
  Object.keys(container).map((key) => {
    if (key.startsWith(jsonLdType)) {
      results.push(container[key])
    }
  })
  return results
}
