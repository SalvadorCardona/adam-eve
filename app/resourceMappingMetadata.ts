import { EntityResourceInterface } from "@/packages/game/entity/EntityResourceInterface"
import { InventoryResource } from "@/packages/game/inventory/InventoryItemInterface"
import {
  JsonLdIri,
  JsonLdType,
  JsonLdTypeContainerInterface,
} from "@/packages/jsonLd/jsonLd"
import { timberHouseEntityMetaData } from "@/app/entity/building/timberHouse/TimberHouseEntity"
import { treeEntityMetaData } from "@/app/entity/resource/tree/TreeEntity"
import { woodResourceMetadata } from "@/app/entity/resource/tree/woodResource"
import { goldResourceEntityResource } from "@/app/entity/resource/gold/goldResourceEntityResource"
import { goldResourceMetadata } from "@/app/entity/resource/gold/goldResource"
import { RepositoryInterface } from "@/packages/repository/repository"
import {
  createResource,
  MetadataInterface,
} from "@/packages/resource/ResourceInterface"
import { goldMineBuildMetaDataEntity } from "@/app/entity/resource/gold/GoldMineBuildingEntityResource"

interface ResourceMapping {
  entityMetaDataResource: EntityResourceInterface
  entityMetaDataBuilding: EntityResourceInterface
  resource: InventoryResource
}

const resourceMappingList: JsonLdTypeContainerInterface<ResourceMapping> = {
  [timberHouseEntityMetaData["@id"]]: {
    entityMetaDataResource: treeEntityMetaData,
    entityMetaDataBuilding: timberHouseEntityMetaData,
    resource: woodResourceMetadata,
  },
  [goldMineBuildMetaDataEntity["@id"]]: {
    entityMetaDataResource: goldResourceEntityResource,
    entityMetaDataBuilding: goldMineBuildMetaDataEntity,
    resource: goldResourceMetadata,
  },
}

export interface ResourceMappingMetadataInterface
  extends RepositoryInterface<ResourceMapping>, MetadataInterface {}

export const resourceMappingMetaData =
  createResource<ResourceMappingMetadataInterface>({
    "@id": "resourceMapping",
    getCollection: (): ResourceMapping[] => {
      return Object.values(resourceMappingList)
    },

    getItem: (buildingType: JsonLdType): ResourceMapping | undefined => {
      return resourceMappingList[buildingType] ?? undefined
    },

    persistItem: (game: ResourceMapping): void => {},

    removeItem: (iriSaveGame: JsonLdIri): void => {},
  })
