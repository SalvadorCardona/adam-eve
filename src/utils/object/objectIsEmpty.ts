export default function isObjectEmpty(obj: object | undefined): boolean {
  if (!obj) return true
  return Object.keys(obj).length === 0
}
