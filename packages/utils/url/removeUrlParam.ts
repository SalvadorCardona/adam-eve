import { isBrowser } from "@/packages/utils/browser/isBrowser"

export function removeUrlParam(paramKey: string): void {
  if (!isBrowser()) return

  const url = new URL(window.location.href)
  url.searchParams.delete(paramKey)
  window.history.replaceState({}, "", url.toString())
}
