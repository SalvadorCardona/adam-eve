export default function mergeObject<T extends object, U extends object>(
  obj1: T,
  obj2: U,
): T & U {
  return { ...obj1, ...obj2 }
}

export function deepMerge<T extends object>(...objects: T[]): T {
  const isObject = (obj: any): obj is object => obj && typeof obj === "object"

  return objects.reduce((prev, obj) => {
    Object.keys(obj).forEach((key) => {
      const prevValue = (prev as any)[key]
      const currValue = (obj as any)[key]

      if (Array.isArray(prevValue) && Array.isArray(currValue)) {
        ;(prev as any)[key] = prevValue.concat(currValue) // Merge arrays
      } else if (isObject(prevValue) && isObject(currValue)) {
        ;(prev as any)[key] = deepMerge(prevValue, currValue) // Merge objects recursively
      } else {
        ;(prev as any)[key] = currValue // Assign value directly
      }
    })

    return prev
  }, {} as T)
}

export function deepCopy<T>(obj: T): T {
  // Vérifie si l'objet est null ou non et si c'est un objet
  if (obj === null || typeof obj !== "object") {
    return obj
  }

  // Gérer les tableaux
  if (Array.isArray(obj)) {
    const copyArray: any[] = []
    for (const item of obj) {
      copyArray.push(deepCopy(item))
    }
    return copyArray as unknown as T
  }

  // Gérer les objets
  const copyObject: { [key: string]: any } = {}
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      copyObject[key] = deepCopy((obj as { [key: string]: any })[key])
    }
  }
  return copyObject as T
}
