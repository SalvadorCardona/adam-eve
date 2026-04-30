export interface GameModifiers {
  workerSpeedMultiplier: number
}

export function createDefaultGameModifiers(): GameModifiers {
  return {
    workerSpeedMultiplier: 1,
  }
}
