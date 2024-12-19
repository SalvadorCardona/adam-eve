import { removeLocalStorage } from "@/src/utils/localStorage/localStorage"
import { keyStorageUser } from "@/src/utils/jwt/getTokenDecrypted"

export function logout(): void {
  removeLocalStorage(keyStorageUser)
}
