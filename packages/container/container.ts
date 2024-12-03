import {
  BaseJsonLdInterface,
  JsonLdIri,
  JsonLDItem,
  JsonLdType,
} from "@/packages/utils/jsonLd/jsonLd"

export interface ContainerInterface<T> {
  [key: JsonLdIri]: T
}

export interface JsonLdContainerInterface<T> {
  [key: JsonLdIri]: JsonLDItem<T>
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

export function getByTypeInContainer<T>(
  container: JsonLdContainerInterface<T>,
  type: JsonLdType,
): T[] {
  return Object.values(container).filter((item) => item["@type"] === type)
}
