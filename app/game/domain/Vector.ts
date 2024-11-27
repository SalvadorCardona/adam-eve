export default interface VectorInterface {
  x: number
  y: number
  z: number
}

export function VectorFactory(vector: Partial<VectorInterface>): VectorInterface {
  return {
    x: 0,
    y: 0,
    z: 0,
    ...vector,
  }
}

export function vectorToArray(vector: VectorInterface): [number, number, number] {
  return [vector.x, vector.y, vector.z]
}
