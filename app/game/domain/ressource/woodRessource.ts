import {
  ressourceFactory,
  RessourceMetadataInterface,
} from "@/app/game/domain/ressource/RessourceInterface"

export const woodRessourceMetadata: RessourceMetadataInterface = {
  "@type": "ressource/wood",
  factory: ressourceFactory,
}
