import { BaseJsonLdInterface, JsonLdIri } from "@/src/utils/jsonLd/jsonLd"

export interface GroundInterface extends BaseJsonLdInterface {
  id: string // Identifiant unique de la route
  position: { x: number; y: number } // Position dans le monde (grille ou absolue)
  connections: {
    top?: JsonLdIri
    bottom?: JsonLdIri
    left?: JsonLdIri
    right?: JsonLdIri
  }
}

export type GroundNetwork = GroundInterface[]
