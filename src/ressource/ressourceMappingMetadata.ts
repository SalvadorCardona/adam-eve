import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"
import { InventoryItemMetadataInterface } from "@/src/game/inventory/InventoryItemInterface"
import {
  JsonLdIri,
  JsonLdType,
  JsonLdTypeContainerInterface,
} from "@/src/utils/jsonLd/jsonLd"
import { timberHouseEntityMetaData } from "@/src/game/entity/app/building/timberHouse/TimberHouseEntity"
import { treeEntityMetaData } from "@/src/game/entity/app/ressource/tree/TreeEntity"
import { woodRessourceMetadata } from "@/src/game/entity/app/ressource/tree/woodRessource"
import {
  goldMineBuildMetaDataEntity,
  goldMineRessourceMetaDataEntity,
} from "@/src/game/entity/app/ressource/gold/GoldMineBuildMetaDataEntity"
import { goldRessourceMetadata } from "@/src/game/entity/app/ressource/gold/goldRessource"
import { RepositoryInterface } from "@/src/utils/repository/repository"
import {
  metaDataFactory,
  MetadataInterface,
} from "@/src/utils/metadata/MetadataInterface"

interface RessourceMapping {
  entityMetaDataRessource: EntityMetaDataInterface
  entityMetaDataBuilding: EntityMetaDataInterface
  ressource: InventoryItemMetadataInterface
}

const ressourceMappingList: JsonLdTypeContainerInterface<RessourceMapping> = {
  [timberHouseEntityMetaData["@type"]]: {
    entityMetaDataRessource: treeEntityMetaData,
    entityMetaDataBuilding: timberHouseEntityMetaData,
    ressource: woodRessourceMetadata,
  },
  [goldMineBuildMetaDataEntity["@type"]]: {
    entityMetaDataRessource: goldMineRessourceMetaDataEntity,
    entityMetaDataBuilding: goldMineBuildMetaDataEntity,
    ressource: goldRessourceMetadata,
  },
}

export interface RessourceMappingMetadataInterface
  extends RepositoryInterface<RessourceMapping>,
    MetadataInterface {}

export const ressourceMappingMetaData =
  metaDataFactory<RessourceMappingMetadataInterface>({
    "@type": "ressourceMapping",
    getCollection: (): RessourceMapping[] => {
      return Object.values(ressourceMappingList)
    },

    getItem: (buildingType: JsonLdType): RessourceMapping | undefined => {
      return ressourceMappingList[buildingType] ?? undefined
    },

    persistItem: (game: RessourceMapping): void => {},

    removeItem: (iriSaveGame: JsonLdIri): void => {},
  })
