import { createMatrix, getMatrix, Matrix } from "@/src/utils/math/matrix"
import { Vector2Interface } from "@/src/utils/math/Vector"

type CurrentNode = {
  x: number
  y: number
  g: number // Coût depuis le point de départ
  h: number // Heuristique (distance estimée au point d'arrivée)
  f: number // Somme de g et h
  parent?: CurrentNode // Parent pour reconstruire le chemin
}

const heuristic = (x1: number, y1: number, x2: number, y2: number) =>
  Math.abs(x1 - x2) + Math.abs(y1 - y2)

export const findPathAStar = (
  grid: Matrix, // La grille (0 = passable, 1 = obstacle)
  start: Vector2Interface,
  end: Vector2Interface,
): { x: number; y: number }[] | null => {
  const rows = grid.length
  const cols = grid[0].length
  // Calcul de la distance de Manhattan (heuristique)

  const openList: CurrentNode[] = []
  const closedList = createMatrix(rows, cols)

  // Ajouter le point de départ à la liste ouverte
  openList.push({
    x: start.x,
    y: start.y,
    g: 0,
    h: heuristic(start.x, start.y, end.x, end.y),
    f: heuristic(start.x, start.y, end.x, end.y),
  })

  // Directions de déplacement (haut, bas, gauche, droite)
  const directions = [
    { x: 0, y: -1 },
    { x: 0, y: 1 },
    { x: -1, y: 0 },
    { x: 1, y: 0 },
  ]

  while (openList.length > 0) {
    // Trier la liste ouverte par le coût total (f)
    openList.sort((a, b) => a.f - b.f)

    // Extraire le noeud avec le plus petit f
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

    // Marquer le noeud actuel comme visité
    closedList[current.y][current.x] = 1

    // Vérifier les voisins
    for (const dir of directions) {
      const neighborX = current.x + dir.x
      const neighborY = current.y + dir.y

      if (
        !getMatrix(grid, neighborX, neighborY) ||
        getMatrix(closedList, neighborX, neighborY)
      ) {
        continue // Ignorer les cases non valides ou déjà visitées
      }

      const g = current.g + 1 // Coût pour se déplacer vers ce voisin
      const h = heuristic(neighborX, neighborY, end.x, end.y)
      const f = g + h

      // Vérifier si le voisin est déjà dans la liste ouverte
      const existingNode = openList.find(
        (node) => node.x === neighborX && node.y === neighborY,
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
          x: neighborX,
          y: neighborY,
          g,
          h,
          f,
          parent: current,
        })
      }
    }
  }

  // Aucun chemin trouvé
  return null
}
