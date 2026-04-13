import GameInterface, { gameFactory } from "@/src/game/game/GameInterface"
import { BaseGameMetaDataInterface } from "@/src/game/BaseGameMetaDataInterface"
import { JsonLdIri } from "@/packages/jsonLd/jsonLd"
import {
  getItemsInLocalStorageByPrefix,
  getLocalStorage,
  persistLocalStorage,
  removeLocalStorage,
} from "@/packages/localStorage/localStorage"
import { metaDataFactory } from "@/packages/metadata/MetadataInterface"
import { RepositoryInterface } from "@/packages/repository/repository"

export interface GameMetadataInterface
  extends BaseGameMetaDataInterface, RepositoryInterface<GameInterface> {
  factory: (game?: GameInterface) => GameInterface
}

export const gameResource = metaDataFactory<GameMetadataInterface>({
  "@id": "resource/game",
  factory: gameFactory,
  getCollection: (): GameInterface[] => {
    return getItemsInLocalStorageByPrefix<GameInterface>("game")
  },

  getItem: (iriSaveGame: JsonLdIri): GameInterface | undefined => {
    return getLocalStorage<GameInterface>(iriSaveGame) ?? undefined
  },

  persistItem: (game: GameInterface): void => {
    const iriSaveGame = game["@id"]
    if (iriSaveGame) {
      persistLocalStorage(iriSaveGame, game)
    }
  },

  removeItem: (iriSaveGame: JsonLdIri): void => {
    removeLocalStorage(iriSaveGame)
  },
})
