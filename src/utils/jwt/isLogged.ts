import { isBrowser } from "@/src/utils/browser/isBrowser"
import { getTokenDecrypted } from "@/src/utils/jwt/getTokenDecrypted"

export function isLogged(): boolean {
  if (!isBrowser()) return false

  const tokenDecrypted = getTokenDecrypted()

  if (!tokenDecrypted) return false

  if (!tokenDecrypted.payload.exp) return false

  return Date.now() <= tokenDecrypted.payload.exp * 1000
}
