import { createVector2 } from "@/src/utils/math/Vector"
import { diviseVector2D } from "@/src/utils/math/diviseVector"

describe("Test Vector division", () => {
  it("Divise Vector With number 1", () => {
    const startVector = createVector2(0, 0)
    const endVector = createVector2(2, 2)
    const results = diviseVector2D(startVector, endVector)
    expect(results.length).toBe(9)
  })

  it("Divise Vector With number 50", () => {
    const startVector = createVector2(100, 100)
    const endVector = createVector2(250, 250)
    const results = diviseVector2D(startVector, endVector, 50)
    expect(results.length).toBe(16)
  })

  it("Divise Vector With negatif", () => {
    const startVector = createVector2(-100, -100)
    const endVector = createVector2(-250, -250)
    const results = diviseVector2D(startVector, endVector, 50)
    expect(results.length).toBe(16)
  })
})
