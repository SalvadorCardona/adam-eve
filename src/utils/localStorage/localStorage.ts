import { isBrowser } from "@/src/utils/browser/isBrowser"

export function getLocalStorage<T>(key: string): null | T {
  if (!isBrowser()) return null

  return JSON.parse(localStorage.getItem(key) as string) as T
}

export function persistLocalStorage(key: string, data: unknown): void {
  if (!isBrowser()) return
  
  localStorage.setItem(key, JSON.stringify(data))
}

export function removeLocalStorage(key: string): void {
  if (!isBrowser()) return

  localStorage.removeItem(key)
}

export function getItemsInLocalStorageByPrefix<T = any>(prefix: string): T[] {
  const items: T[] = []

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key && key.startsWith(prefix)) {
      const item = getLocalStorage<T>(key)
      if (item) {
        items.push(item)
      }
    }
  }

  return items
}
