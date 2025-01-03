import { JsonLdIri } from "@/src/utils/jsonLd/jsonLd"
import EntityInterface from "@/src/game/entity/EntityInterface"
import GameInterface from "@/src/game/game/GameInterface"

export function getEntityInGameByIri(
  game: GameInterface,
  iri: JsonLdIri,
): EntityInterface | undefined {
  return Object.hasOwn(game.entities, iri) ? game.entities[iri] : undefined
}
