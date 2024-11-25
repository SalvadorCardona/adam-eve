import { Primitive } from "@/packages/utils/type/Primitive"

export function getIndexByColumn<T>(
  array: T[],
  keyName: keyof T,
  keyValue: Primitive,
): number {
  return array.findIndex((e) => e[keyName] === keyValue)
}

export function getValueByKey<T>(
  array: T[],
  keyName: keyof T,
  keyValue: Primitive,
): T {
  const index = array.findIndex((e) => e[keyName] === keyValue)

  return array[index]
}

export function updateByKey<T>(
  array: T[],
  keyName: keyof T,
  keyValue: Primitive,
  data: T,
): T[] {
  const index = getIndexByColumn(array, keyName, keyValue)
  return updateByIndex(array, index, data)
}

export function updateByIndex<T>(array: T[], index: number, data: T): T[] {
  const newArray = [...array] as T[]
  newArray[index] = data
  return newArray
}

export function removeByIndex<T>(array: T[], index: number): T[] {
  return array.filter((e, i) => i !== index)
}

export function removeByColumn<T>(
  array: T[],
  keyName: keyof T,
  keyValue: Primitive,
): T[] {
  const index = getIndexByColumn(array, keyName, keyValue)

  return removeByIndex(array, index)
}

export function hasValue<T>(array: T[], value: T) {
  return array.includes(value)
}

export function removeValue<T>(array: T[], value: T) {
  return array.filter((e) => e !== value)
}

export function addValue<T>(array: T[], value: T) {
  return [...array, value]
}

export function removeNullValues(array: any[]): string[] {
  return array.filter((e) => e)
}
