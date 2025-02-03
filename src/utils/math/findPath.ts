import {
  createMatrix2D,
  getInMatrix,
  Matrix2DInterface,
  matrixDirection,
  setMatrix,
} from "@/src/utils/math/matrix"
import { createVector2, heuristic, Vector2Interface } from "@/src/utils/math/vector"
import { PathInterface } from "@/src/utils/math/path"

type CurrentNode = {
  x: number
  y: number
  g: number // Coût depuis le point de départ
  h: number // Heuristique (distance estimée au point d'arrivée)
  f: number // Somme de g et h
  parent?: CurrentNode // Parent pour reconstruire le chemin
}

const matrixDirections = Object.values(matrixDirection)

export const findPathAStar = (
  grid: Matrix2DInterface, // La grille (0 = passable, 1 = obstacle)
  start: Vector2Interface,
  end: Vector2Interface,
): PathInterface | null => {
  const rows = grid.length
  const cols = grid[0].length

  const openList: CurrentNode[] = []
  const closedList = createMatrix2D(rows, cols)

  openList.push({
    x: start.x,
    y: start.y,
    g: 0,
    h: heuristic(start, end),
    f: heuristic(start, end),
  })

  // Directions de déplacement (haut, bas, gauche, droite)

  while (openList.length > 0) {
    // Trier la liste ouverte par le coût total (f)
    openList.sort((a, b) => a.f - b.f)

    // Extraire le node avec le plus petit f
    const current = openList.shift()!

    // Si on atteint le point final, reconstruire le chemin
    if (current.x === end.x && current.y === end.y) {
      const path: Vector2Interface[] = []
      let node: CurrentNode | undefined = current
      while (node) {
        path.unshift({ x: node.x, y: node.y })
        node = node.parent
      }
      return path
    }

    // Marquer le node actuel comme visité
    setMatrix(closedList, current, 1)

    // Vérifier les voisins
    for (const dir of matrixDirections) {
      const neighbor = createVector2(current.x + dir.x, current.y + dir.y)

      if (!getInMatrix(grid, neighbor) || getInMatrix(closedList, neighbor)) {
        continue // Ignorer les cases non valides ou déjà visitées
      }

      const g = current.g + 1 // Coût pour se déplacer vers ce voisin
      const h = heuristic(neighbor, end)
      const f = g + h

      // Vérifier si le voisin est déjà dans la liste ouverte
      const existingNode = openList.find(
        (node) => node.x === neighbor.x && node.y === neighbor.y,
      )

      if (existingNode) {
        if (g < existingNode.g) {
          // Mettre à jour le coût si un chemin plus court est trouvé
          existingNode.g = g
          existingNode.f = f
          existingNode.parent = current
        }
      } else {
        // Ajouter le voisin à la liste ouverte
        openList.push({
          x: neighbor.x,
          y: neighbor.y,
          g,
          h,
          f,
          parent: current,
        })
      }
    }
  }

  return null
}
