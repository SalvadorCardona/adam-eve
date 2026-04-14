import GameInterface from "@/packages/game/game/GameInterface"
import { BaseGameMetaDataInterface } from "@/packages/game/BaseGameMetaDataInterface"
import {
  BaseJsonLdItemInterface,
  createJsonLd,
  JsonLdIri,
} from "@/packages/jsonLd/jsonLd"
import {
  getItemsInLocalStorageByPrefix,
  getLocalStorage,
  persistLocalStorage,
  removeLocalStorage,
} from "@/packages/localStorage/localStorage"
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
  "@id": "save-game",
  factory: (payload: {
    game: GameInterface
    saveGame: Partial<SaveGameInterface>
  }): SaveGameInterface => {
    const sameGame = {
      "@type": ldType,
      game: payload.game,
      ...payload.saveGame,
    }

    return createJsonLd(ldType, sameGame)
  },

  getCollection: (): SaveGameInterface[] => {
    return getItemsInLocalStorageByPrefix<SaveGameInterface>(ldType)
  },

  getItem: (iriSaveGame: JsonLdIri): SaveGameInterface | undefined => {
    return getLocalStorage<SaveGameInterface>(iriSaveGame) ?? undefined
  },

  persistItem: (saveGame: SaveGameInterface): void => {
    const iriSaveGame = saveGame["@id"]
    if (iriSaveGame) {
      persistLocalStorage(iriSaveGame, saveGame)
    }
  },

  removeItem: (iriSaveGame: JsonLdIri): void => {
    removeLocalStorage(iriSaveGame)
  },
}
