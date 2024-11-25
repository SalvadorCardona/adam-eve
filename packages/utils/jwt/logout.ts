import { removeLocalStorage } from "@/packages/utils/localStorage/localStorage"
import { keyStorageUser } from "@/packages/utils/jwt/getTokenDecrypted"

export function logout(): void {
  removeLocalStorage(keyStorageUser)
}
