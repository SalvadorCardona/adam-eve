import { decodeJwt } from "@/src/utils/jwt/decodeJwt"
import { getUserToken } from "@/src/utils/jwt/UserToken"

export const keyStorageUser = "jwt-token"

export function getTokenDecrypted() {
  const token = getUserToken()

  if (!token) {
    return undefined
  }

  return decodeJwt(token)
}
