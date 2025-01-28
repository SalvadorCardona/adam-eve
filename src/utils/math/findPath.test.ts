import { findPathAStar } from "./findPath"

const grid = [
  [0, 0, 0, 0, 1],
  [0, 1, 1, 0, 0],
  [0, 0, 0, 1, 0],
  [1, 1, 0, 0, 0],
  [0, 0, 0, 0, 0],
]

const start = { x: 0, y: 0 }
const end = { x: 4, y: 4 }

describe("A* Pathfinding Algorithm", () => {
  it("should find the shortest path in a basic grid", () => {
    const expectedPath = [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: 2 },
      { x: 1, y: 2 },
      { x: 2, y: 2 },
      { x: 2, y: 3 },
      { x: 2, y: 4 },
      { x: 3, y: 4 },
      { x: 4, y: 4 },
    ]
    const result = findPathAStar(grid, start, end)
    expect(result).toEqual(expectedPath)
  })

  it("should return null if no path exists", () => {
    const blockedGrid = [
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
    const simpleGrid = [
      [0, 0],
      [0, 0],
    ]
    const simpleStart = { x: 0, y: 0 }
    const simpleEnd = { x: 1, y: 1 }
    const expectedPath = [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
    ]
    const result = findPathAStar(simpleGrid, simpleStart, simpleEnd)
    expect(result).toEqual(expectedPath)
  })
})
