export default function getNestedProperty<T, R>(
  obj: T,
  path: string,
): R | undefined {
  return path.split(".").reduce((acc: any, part: string) => acc && acc[part], obj)
}

export function isNestedProperty(obj: Record<string, any>, path: string): boolean {
  return (
    path.split(".").reduce((acc, part) => {
      if (acc && typeof acc === "object" && part in acc) {
        return acc[part]
      }
      return undefined
    }, obj) !== undefined
  )
}

export function getDataFromKey<T extends object, R>(
  obj: T,
  key: string,
): R | undefined {
  if (!key || !obj) return undefined
  
  if (isNestedProperty(obj, key)) {
    return getNestedProperty(obj, key)
  }
  if (Object.hasOwn(obj, key)) {
    return (obj as any)[key]
  }

  return undefined
}
