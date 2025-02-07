import GameInterface, { gameFactory } from "@/src/game/game/GameInterface"
import { BaseGameMetaDataInterface } from "@/src/game/BaseGameMetaDataInterface"
import { createJsonLdType, JsonLdIri } from "@/src/utils/jsonLd/jsonLd"
import {
  getItemsInLocalStorageByPrefix,
  getLocalStorage,
  persistLocalStorage,
  removeLocalStorage,
} from "@/src/utils/localStorage/localStorage"
import { appLdType } from "@/src/AppLdType"
import { metaDataFactory } from "@/src/utils/metadata/MetadataInterface"
import { RepositoryInterface } from "@/src/utils/repository/repository"

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
