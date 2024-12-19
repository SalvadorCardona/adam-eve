import isApiUri from "@/src/utils/id/isApiUri"

export function getIdFromUri(id: string): string {
  if (!isApiUri(id)) return id

  const parts = id.split("/")
  return parts[parts.length - 1] as string
}
