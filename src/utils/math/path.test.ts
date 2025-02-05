import {
  ConsumablePathInterface,
  consumePath,
  createConsumablePath,
  PathInterface,
} from "@/src/utils/math/path"

const inputPath: PathInterface = [
  { x: 0, y: 0 },
  { x: 10, y: 10 },
  { x: 20, y: 20 },
]

describe("Test path createConsumablePath", () => {
  it("Context 1", () => {
    const result = createConsumablePath(inputPath)
    const expected: ConsumablePathInterface = {
      distance: inputPath.length,
      start: inputPath[0],
      end: inputPath[inputPath.length - 1],
      currentPath: 0,
      path: inputPath,
      isFinish: false,
      currentPosition: inputPath[0],
      unreachable: false,
    }

    expect(result).toStrictEqual(expected)
  })

  it("Context consumePath", () => {
    const result = createConsumablePath(inputPath)
    let currentConsumePath = consumePath(result)
    expect(currentConsumePath.currentPosition).toStrictEqual(inputPath[1])
    expect(currentConsumePath.isFinish).toStrictEqual(false)

    currentConsumePath = consumePath(result)

    expect(currentConsumePath.currentPosition).toStrictEqual(inputPath[1])
    expect(currentConsumePath.isFinish).toStrictEqual(true)
  })
})
