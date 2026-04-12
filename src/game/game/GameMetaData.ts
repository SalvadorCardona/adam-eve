import GameInterface, { gameFactory } from "@/src/game/game/GameInterface"
import { BaseGameMetaDataInterface } from "@/src/game/BaseGameMetaDataInterface"
import { createJsonLdType, JsonLdIri } from "@/packages/jsonLd/jsonLd"
import {
  getItemsInLocalStorageByPrefix,
  getLocalStorage,
  persistLocalStorage,
  removeLocalStorage,
} from "@/packages/localStorage/localStorage"
import { appLdType } from "@/app/AppLdType"
import { metaDataFactory } from "@/packages/metadata/MetadataInterface"
import { RepositoryInterface } from "@/packages/repository/repository"

export interface GameMetadataInterface
  extends BaseGameMetaDataInterface,
    RepositoryInterface<GameInterface> {
  factory: (game?: GameInterface) => GameInterface
}

const ldType = createJsonLdType(appLdType.game)

export const gameMetadata = metaDataFactory<GameMetadataInterface>({
  "@type": appLdType.game,
  factory: gameFactory,
  getCollection: (): GameInterface[] => {
    return getItemsInLocalStorageByPrefix<GameInterface>(ldType)
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
