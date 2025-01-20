import { Vector3Interface } from "@/src/utils/3Dmath/Vector"

export function aroundVector(
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
// console.log(roundDownToBase(80, 50)); // Résultat : 50
// console.log(roundDownToBase(120, 50)); // Résultat : 100
// console.log(roundDownToBase(45, 20)); // Résultat : 40
// console.log(roundDownToBase(150, 25)); // Résultat : 150
export function roundDownToBase(number: number, base: number) {
  return Math.floor(number / base) * base
}

//
// console.log(roundUpToBase(55, 50)); // Résultat : 100
// console.log(roundUpToBase(120, 50)); // Résultat : 150
// console.log(roundUpToBase(45, 20)); // Résultat : 60
// console.log(roundUpToBase(150, 25)); // Résultat : 175
export function roundUpToBase(number: number, base: number) {
  return Math.ceil(number / base) * base
}
