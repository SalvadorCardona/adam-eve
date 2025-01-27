import { createVector2 } from "@/src/utils/math/Vector"
import { diviseVector2D } from "@/src/utils/math/diviseVector"

test("Divise Vector", () => {
  const startVector = createVector2(0, 0)
  const endVector = createVector2(2, 2)
  const results = diviseVector2D(startVector, endVector)
  expect(results.length).toBe(9)
})
