import { BaseJsonLdInterface, JsonLdIri } from "@/src/utils/jsonLd/jsonLd"

export interface GroundInterface extends BaseJsonLdInterface {
  position: { x: number; y: number }
  hasBuilding?: JsonLdIri
  connections: {
    top?: JsonLdIri
    bottom?: JsonLdIri
    left?: JsonLdIri
    right?: JsonLdIri
  }
}

export type GroundNetwork = GroundInterface[]
