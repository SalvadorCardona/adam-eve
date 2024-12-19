import { getTokenDecrypted } from "@/src/utils/jwt/getTokenDecrypted"
import { isLogged } from "@/src/utils/jwt/isLogged"

export function hasRole(role: string): boolean {
  if (!isLogged()) return false

  const tokenDecrypted = getTokenDecrypted()

  const roles = tokenDecrypted?.payload.roles
  return !!(roles && roles.includes(role))
}
