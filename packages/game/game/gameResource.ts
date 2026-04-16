import GameInterface, { gameFactory } from "@/packages/game/game/GameInterface"
import { BaseGameResource } from "@/packages/game/BaseGameResource"
import { JsonLdIri } from "@/packages/jsonLd/jsonLd"
import {
  getInStorage,
  getItemsInLocalStorageByPrefix,
  removeInStorage,
  setInStorage,
} from "@/packages/storage/storage"
import { createResource } from "@/packages/resource/ResourceInterface"
import { RepositoryInterface } from "@/packages/repository/repository"

export interface GameMetadataInterface
  extends BaseGameResource, RepositoryInterface<GameInterface> {
  factory: (game?: GameInterface) => GameInterface
}

export const gameResource = createResource<GameMetadataInterface>({
  "@id": "resource/game",
  factory: gameFactory,
  getCollection: (): GameInterface[] => {
    return getItemsInLocalStorageByPrefix<GameInterface>("game")
  },

  getItem: (iriSaveGame: JsonLdIri): GameInterface | undefined => {
    return getInStorage<GameInterface>(iriSaveGame) ?? undefined
  },

  persistItem: (game: GameInterface): void => {
    const iriSaveGame = game["@id"]
    if (iriSaveGame) {
      setInStorage(iriSaveGame, game)
    }
  },

  removeItem: (iriSaveGame: JsonLdIri): void => {
    removeInStorage(iriSaveGame)
  },
})
