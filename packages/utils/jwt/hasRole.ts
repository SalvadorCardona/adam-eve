import { getTokenDecrypted } from "@/packages/utils/jwt/getTokenDecrypted"
import { isLogged } from "@/packages/utils/jwt/isLogged"

export function hasRole(role: string): boolean {
  if (!isLogged()) return false

  const tokenDecrypted = getTokenDecrypted()

  const roles = tokenDecrypted?.payload.roles
  return !!(roles && roles.includes(role))
}
