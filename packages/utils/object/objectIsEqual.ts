export default function objectIsEqual(obj1: any, obj2: any): boolean {
  if (obj1 === obj2) {
    return true // Same object reference or primitive value
  }

  if (
    typeof obj1 !== "object" ||
    obj1 === null ||
    typeof obj2 !== "object" ||
    obj2 === null
  ) {
    return false // One is null, or they are different types
  }

  const keys1 = Object.keys(obj1)
  const keys2 = Object.keys(obj2)

  if (keys1.length !== keys2.length) {
    return false // Different number of properties
  }

  for (const key of keys1) {
    if (!keys2.includes(key) || !objectIsEqual(obj1[key], obj2[key])) {
      return false // Different property found
    }
  }

  return true
}
