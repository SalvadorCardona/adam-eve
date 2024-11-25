export default function extractNumberToString(input: string): number | null {
  const match = input.match(/\d+/)
  return match ? parseInt(match[0], 10) : null
}
