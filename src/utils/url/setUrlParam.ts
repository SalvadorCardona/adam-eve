import { isBrowser } from "@/src/utils/browser/isBrowser"

export function setUrlParam(paramKey: string, paramValue: string): void {
  if (!isBrowser()) return

  const url = new URL(window.location.href)
  url.searchParams.set(paramKey, paramValue)
  window.history.replaceState({}, "", url.toString())
}
