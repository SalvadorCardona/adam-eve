export default function getIdFromObject(
  object: Record<string, any>,
): string | undefined {
  if (object["@id"]) {
    return object["@id"]
  }

  return object["id"] ?? undefined
}
