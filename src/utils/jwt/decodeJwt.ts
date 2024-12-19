interface JwtPayload {
  sub?: string // Subject (souvent l'utilisateur)
  name?: string // Nom de l'utilisateur
  iat?: number // Issued At (timestamp de création)
  exp?: number // Expiration Time (timestamp d'expiration)
  roles?: string[]

  [key: string]: any // On permet d'autres propriétés facultatives
}

interface JwtHeader {
  alg: string // Algorithme utilisé, ex: "HS256"
  typ: string // Type, généralement "JWT"
  [key: string]: any // On permet d'autres propriétés facultatives
}

export interface JwtDecoded {
  header: JwtHeader
  payload: JwtPayload
  signature: string
}

function base64Decode(str: string): string {
  return decodeURIComponent(
    atob(str)
      .split("")
      .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
      .join(""),
  )
}

export function decodeJwt(token: string): JwtDecoded {
  const parts = token.split(".")

  if (parts.length !== 3) {
    throw new Error("JWT invalide")
  }

  const header = JSON.parse(base64Decode(parts[0]))
  const payload = JSON.parse(base64Decode(parts[1]))
  const signature = parts[2]

  return {
    header,
    payload,
    signature,
  }
}
