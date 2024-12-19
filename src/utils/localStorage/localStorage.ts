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
