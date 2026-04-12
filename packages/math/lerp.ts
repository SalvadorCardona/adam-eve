import { aroundDecimal } from "@/packages/math/round"

export function lerp(a: number, b: number, t: number): number {
  return aroundDecimal(a + (b - a) * t)
}
