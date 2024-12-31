import { distanceBetweenVector2 } from "@/src/utils/3Dmath/distanceBetweenVector3"

export const interpolateSteps = ({
  positions,
  stepSize,
}: {
  positions: Vector2Interface[]
  stepSize: number
}): Vector2Interface[] => {
  const interpolated: Vector2Interface[] = []
  for (let i = 0; i < positions.length - 1; i++) {
    const start = positions[i]
    const end = positions[i + 1]
    const distance = distanceBetweenVector2(start, end)
    const steps = Math.ceil(distance / stepSize)

    for (let step = 0; step < steps; step++) {
      const t = step / steps
      interpolated.push({
        x: start.x + t * (end.x - start.x),
        y: start.y + t * (end.y - start.y),
      })
    }
  }

  // Add the final position
  interpolated.push(positions[positions.length - 1])

  return interpolated
}
