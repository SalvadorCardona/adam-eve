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

export interface PlayerInterface extends BaseJsonLdItemInterface {
  name?: string
}

export interface PlayerMetadataInterface
  extends BaseGameMetaDataInterface, RepositoryInterface<PlayerInterface> {
  factory: (payload: { player: Partial<PlayerInterface> }) => PlayerInterface
  getPlayer: () => PlayerInterface
}

export const playerMetadata: PlayerMetadataInterface = {
  "@id": "resource/player",
  factory: (payload: { player: Partial<PlayerInterface> }): PlayerInterface => {
    const sameGame = {
      name: "Unknown",
      ...payload.player,
    }

    return createJsonLd<PlayerInterface>("player", sameGame)
  },

  getPlayer: () => {
    const players = playerMetadata.getCollection()
    if (players.length) return players[0]

    const player = playerMetadata.factory({ player: {} })

    playerMetadata.persistItem(player)

    return player
  },

  getCollection: (): PlayerInterface[] => {
    return getItemsInLocalStorageByPrefix<PlayerInterface>("player")
  },

  getItem: (iriPlayer: JsonLdIri): PlayerInterface | undefined => {
    return getInStorage<PlayerInterface>(iriPlayer) ?? undefined
  },

  persistItem: (player: PlayerInterface): void => {
    const iriPlayer = player["@id"]
    if (iriPlayer) {
      setInStorage(iriPlayer, player)
    }
  },

  removeItem: (iriPlayer: JsonLdIri): void => {
    removeInStorage(iriPlayer)
  },
}
