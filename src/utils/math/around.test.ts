import {
  aroundDecimal,
  roundDownToBase,
  roundUpToBase,
  roundVectorToDown,
} from "@/src/utils/math/roundVectorToDown"
import { createVector3 } from "@/src/utils/math/Vector"

describe("Test Around", () => {
  it("Around Vector Down", () => {
    expect(roundVectorToDown(createVector3(45, 45, 45), 50)).toStrictEqual(
      createVector3(0, 0, 0),
    )
    expect(roundVectorToDown(createVector3(51, 51, 51), 50)).toStrictEqual(
      createVector3(50, 50, 50),
    )
    expect(roundVectorToDown(createVector3(1.7, 1.7, 1.7))).toStrictEqual(
      createVector3(1, 1, 1),
    )
  })

  it("Around Down", () => {
    expect(roundDownToBase(1, 1)).toBe(1)
    expect(roundDownToBase(2, 10)).toBe(0)
    expect(roundDownToBase(76, 50)).toBe(50)
  })

  it("Around UP", () => {
    expect(roundUpToBase(1, 1)).toBe(1)
    expect(roundUpToBase(2, 10)).toBe(10)
    expect(roundUpToBase(76, 50)).toBe(100)
  })

  it("Around Decimal", () => {
    expect(aroundDecimal(1.55555)).toBe(1.56)
    expect(aroundDecimal(9.55555)).toBe(9.56)
    expect(aroundDecimal(10.777998, 3)).toBe(10.778)
  })
})
