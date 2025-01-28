import {
  aroundDecimal,
  roundDownToBase,
  roundUpToBase,
} from "@/src/utils/math/around"

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

test("Around Decimal", () => {
  expect(aroundDecimal(1.55555)).toBe(1.56)
  expect(aroundDecimal(9.55555)).toBe(9.56)
  expect(aroundDecimal(10.777998, 3)).toBe(10.778)
})
