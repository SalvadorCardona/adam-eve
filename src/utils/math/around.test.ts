import { roundDownToBase, roundUpToBase } from "@/src/utils/math/around"

test("Around Down", () => {
  expect(roundDownToBase(1, 1)).toBe(1)
  expect(roundDownToBase(2, 10)).toBe(0)
  expect(roundDownToBase(76, 50)).toBe(50)
})

test("Around UP", () => {
  expect(roundUpToBase(1, 1)).toBe(1)
  expect(roundUpToBase(2, 10)).toBe(10)
  expect(roundUpToBase(76, 50)).toBe(100)
})
