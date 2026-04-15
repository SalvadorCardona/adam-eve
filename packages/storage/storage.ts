function isBrowser(): boolean {
  return typeof window !== "undefined"
}

const localStorageData = {} as Record<string, unknown>

export function getInStorage<T>(key: string): undefined | T | null {
  if (!isBrowser()) {
    return localStorageData[key] as T
  }

  const item = localStorage.getItem(key)

  if (item === "undefined") {
    return undefined
  }
  if (item === null) {
    return null
  }

  return JSON.parse(item) as T
}

export function setInStorage(key: string, data: unknown): void {
  if (!isBrowser()) {
    localStorageData[key] = data
    return
  }

  localStorage.setItem(key, JSON.stringify(data))
}

export function removeInStorage(key: string): void {
  if (!isBrowser()) {
    delete localStorageData[key]
    return
  }

  localStorage.removeItem(key)
}

export function getItemsInLocalStorageByPrefix<T = any>(prefix: string): T[] {
  if (!isBrowser()) return []

  const items: T[] = []

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key && key.startsWith(prefix)) {
      const item = getInStorage<T>(key)
      if (item) {
        items.push(item)
      }
    }
  }

  return items
}
