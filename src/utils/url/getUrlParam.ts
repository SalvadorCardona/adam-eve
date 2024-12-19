import { isBrowser } from "@/src/utils/browser/isBrowser"

export default function getUrlParam(paramKey: string): string | null {
  if (!isBrowser()) return null

  return new URLSearchParams(window.location.search).get(paramKey)
}
