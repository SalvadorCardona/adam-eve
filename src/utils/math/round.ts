import {
  Vector2Interface,
  Vector3Interface,
  vectorTransformer,
} from "@/src/utils/math/vector"

export function roundVectorToDown<T extends Vector2Interface | Vector3Interface>(
  vector: T,
  roundToMultiple: number = 1,
): T {
  return vectorTransformer<T>(vector, (e) => roundDownToBase(e, roundToMultiple))
}

export function roundVector<T extends Vector2Interface | Vector3Interface>(
  vector: T,
  roundToMultiple: number = 1,
): T {
  return vectorTransformer<T>(vector, (e) => round(e, roundToMultiple))
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

export function aroundDecimal(source: number, afterDecimal: number = 2): number {
  return parseFloat(source.toFixed(afterDecimal))
}

export function round(number: number, base: number = 1) {
  return Math.round(number / base) * base
}
