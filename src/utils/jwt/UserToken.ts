import {
  getLocalStorage,
  persistLocalStorage,
} from "@/src/utils/localStorage/localStorage"
import { keyStorageUser } from "@/src/utils/jwt/getTokenDecrypted"
import { LoginReponseInterface } from "@/src/utils/jwt/LoginReponseInterface"

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
