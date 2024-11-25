export default function isApiUri(uri: string | unknown): boolean {
  if (typeof uri !== "string") return false

  return uri.startsWith("/api/")
}
