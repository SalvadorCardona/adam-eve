import { getIdFromUri } from "@/packages/utils/id/getIdFromUri"

interface IdentifierInterface {
  id?: string
  uri?: string
}

export default function getIdentifier(
  object: Record<string, any>,
): IdentifierInterface | undefined {
  if (object["@id"]) {
    return {
      uri: object["@id"],
      id: getIdFromUri(object["@id"]),
    }
  }

  if (object["id"]) {
    return { id: object["id"] }
  }

  return undefined
}
