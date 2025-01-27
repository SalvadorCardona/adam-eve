import { Vector3Interface } from "@/src/utils/math/Vector"

export function around(
  vector: Vector3Interface,
  roundToMultiple: number = 0,
): Vector3Interface {
  return {
    z: roundDownToBase(vector.z, roundToMultiple),
    y: roundDownToBase(vector.y, roundToMultiple),
    x: roundDownToBase(vector.x, roundToMultiple),
  }
}

//
// (roundDownToBase(80, 50)); // Résultat : 50
// (roundDownToBase(120, 50)); // Résultat : 100
// (roundDownToBase(45, 20)); // Résultat : 40
// (roundDownToBase(150, 25)); // Résultat : 150
export function roundDownToBase(number: number, base: number) {
  return Math.floor(number / base) * base
}

//
// (roundUpToBase(55, 50)); // Résultat : 100
// (roundUpToBase(120, 50)); // Résultat : 150
// (roundUpToBase(45, 20)); // Résultat : 60
// (roundUpToBase(150, 25)); // Résultat : 175
export function roundUpToBase(number: number, base: number) {
  return Math.ceil(number / base) * base
}
