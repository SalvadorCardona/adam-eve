import { findPathAStar } from "./findPath"
import { Matrix2DInterface } from "@/src/utils/math/matrix"

const grid: Matrix2DInterface = [
  [1, 1, 1, 1, 0],
  [1, "A", "A", "A", 1],
  [1, 0, 0, "A", 0],
  [1, 1, 1, 1, 0],
  [0, 0, 1, 1, 1],
]

const start = { x: 1, y: 1 }
const end = { x: 4, y: 4 }

describe("A* Pathfinding Algorithm", () => {
  it("should find the shortest path in a basic grid", () => {
    const expectedPath = [
      { x: 1, y: 1 },
      { x: 2, y: 1 },
      { x: 3, y: 2 },
      { x: 3, y: 3 },
      { x: 4, y: 4 },
    ]
    const result = findPathAStar(grid, start, end)
    expect(result).toEqual(expectedPath)
  })

  it("should return null if no path exists", () => {
    const blockedGrid: Matrix2DInterface = [
      [0, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 0],
    ]
    const result = findPathAStar(blockedGrid, start, end)
    expect(result).toBeNull()
  })

  it("should handle small grids with a clear path", () => {
    const simpleGrid: Matrix2DInterface = [
      [1, 1],
      [1, 1],
    ]
    const simpleStart = { x: 0, y: 0 }
    const simpleEnd = { x: 1, y: 1 }

    const expectedPath = [
      { x: 0, y: 0 },
      { x: 1, y: 1 },
    ]
    const result = findPathAStar(simpleGrid, simpleStart, simpleEnd)
    expect(result).toEqual(expectedPath)
  })
})
