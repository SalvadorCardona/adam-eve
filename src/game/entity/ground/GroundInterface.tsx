export type GroundInterface = {
  id: string // Identifiant unique de la route
  position: { x: number; y: number } // Position dans le monde (grille ou absolue)
  type: string
  connections: {
    top?: boolean
    bottom?: boolean
    left?: boolean
    right?: boolean
  } // Connexions possibles
}

export type GroundNetwork = GroundInterface[]
