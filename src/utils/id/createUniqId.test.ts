import createUniqId from "./createUniqId"

test("Test Create Id", () => {
  const id = createUniqId()
  expect(typeof id).toBe("string")
  expect(id).toBeTruthy()
})
