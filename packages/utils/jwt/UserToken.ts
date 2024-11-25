import {
  getLocalStorage,
  persistLocalStorage,
} from "@/packages/utils/localStorage/localStorage"
import { keyStorageUser } from "@/packages/utils/jwt/getTokenDecrypted"
import { LoginReponseInterface } from "@/packages/utils/jwt/LoginReponseInterface"

export function getUserToken(): string | undefined {
  const userPayload = getLocalStorage<LoginReponseInterface>(keyStorageUser)

  if (!userPayload) {
    return undefined
  }

  return userPayload ? userPayload.token : undefined
}

export function setUserToken(loginReponse: LoginReponseInterface): void {
  persistLocalStorage(keyStorageUser, loginReponse)
}
