import GameInterface from "@/packages/game/game/GameInterface"
import { BaseGameMetaDataInterface } from "@/packages/game/BaseGameMetaDataInterface"
import {
  BaseJsonLdItemInterface,
  createJsonLd,
  JsonLdIri,
} from "@/packages/jsonLd/jsonLd"
import {
  getInStorage,
  getItemsInLocalStorageByPrefix,
  removeInStorage,
  setInStorage,
} from "@/packages/storage/storage"
import { RepositoryInterface } from "@/packages/repository/repository"

interface SaveGameInterface extends BaseJsonLdItemInterface {
  name?: string
  game: GameInterface
  createdAt: Date | string
}

export interface SaveGameMetadataInterface
  extends BaseGameMetaDataInterface, RepositoryInterface<SaveGameInterface> {
  factory: (payload: {
    game: GameInterface
    saveGame: Partial<SaveGameInterface>
  }) => SaveGameInterface
}

export const saveGameMetadata: SaveGameMetadataInterface = {
  "@id": "resource/save-game",
  factory: (payload: {
    game: GameInterface
    saveGame: Partial<SaveGameInterface>
  }): SaveGameInterface => {
    const sameGame = {
      game: payload.game,
      ...payload.saveGame,
    }

    return createJsonLd("save-game", sameGame)
  },

  getCollection: (): SaveGameInterface[] => {
    return getItemsInLocalStorageByPrefix<SaveGameInterface>("save-game")
  },

  getItem: (iriSaveGame: JsonLdIri): SaveGameInterface | undefined => {
    return getInStorage<SaveGameInterface>(iriSaveGame) ?? undefined
  },

  persistItem: (saveGame: SaveGameInterface): void => {
    const iriSaveGame = saveGame["@id"]
    if (iriSaveGame) {
      setInStorage(iriSaveGame, saveGame)
    }
  },

  removeItem: (iriSaveGame: JsonLdIri): void => {
    removeInStorage(iriSaveGame)
  },
}
