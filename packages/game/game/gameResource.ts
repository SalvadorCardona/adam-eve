import GameInterface, { gameFactory } from "@/packages/game/game/GameInterface"
import { BaseGameMetaDataInterface } from "@/packages/game/BaseGameMetaDataInterface"
import { JsonLdIri } from "@/packages/jsonLd/jsonLd"
import {
  getInStorage,
  getItemsInLocalStorageByPrefix,
  removeInStorage,
  setInStorage,
} from "@/packages/storage/storage"
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
