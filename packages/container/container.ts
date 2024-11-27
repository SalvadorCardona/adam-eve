import { JsonLdIri } from "@/packages/utils/jsonLd/jsonLd"

export interface ContainerInterface<T> {
  [key: JsonLdIri]: T
}

export function createContainer<T>(): ContainerInterface<T> {
  return {}
}

export function getContainerKeys<T>(container: ContainerInterface<T>): JsonLdIri[] {
  return Object.keys(container) as JsonLdIri[]
}

export function getContainerValues<T>(container: ContainerInterface<T>): T[] {
  return Object.values(container)
}

export function setContainerValue<T>(
  container: ContainerInterface<T>,
  key: JsonLdIri,
  value: T,
): void {
  container[key] = value
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

export function updateContainer<T>(container: ContainerInterface<T>, item: T): void {
  container[item["@id"]] = item
}
