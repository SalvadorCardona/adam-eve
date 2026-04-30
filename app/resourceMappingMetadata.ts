import { EntityResourceInterface } from "@/packages/game/entity/EntityResourceInterface"
import { InventoryResource } from "@/packages/game/inventory/InventoryResource"
import { JsonLdIri, JsonLdTypeContainerInterface } from "@/packages/jsonLd/jsonLd"
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
import { stoneResourceEntityResource } from "@/app/entity/resource/stone/stoneResourceEntityResource"
import { stoneMineBuildMetaDataEntity } from "@/app/entity/resource/stone/StoneMineBuildingEntityResource"
import { stoneResourceMetadata } from "@/app/inventory/stone/stoneResource"
import { ironResourceEntityResource } from "@/app/entity/resource/iron/ironResourceEntityResource"
import { ironMineBuildMetaDataEntity } from "@/app/entity/resource/iron/IronMineBuildingEntityResource"
import { ironResourceMetadata } from "@/app/inventory/iron/ironResource"

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
  [stoneMineBuildMetaDataEntity["@id"]]: {
    entityMetaDataResource: stoneResourceEntityResource,
    entityMetaDataBuilding: stoneMineBuildMetaDataEntity,
    resource: stoneResourceMetadata,
  },
  [ironMineBuildMetaDataEntity["@id"]]: {
    entityMetaDataResource: ironResourceEntityResource,
    entityMetaDataBuilding: ironMineBuildMetaDataEntity,
    resource: ironResourceMetadata,
  },
}

export interface ResourceMappingMetadataInterface
  extends MetadataInterface, RepositoryInterface<ResourceMapping> {}

export const resourceMappingMetaData =
  createResource<ResourceMappingMetadataInterface>({
    "@id": "resourceMapping",
    getCollection: (): ResourceMapping[] => {
      return Object.values(resourceMappingList)
    },

    getItem: (buildingType: JsonLdIri): ResourceMapping | undefined => {
      return resourceMappingList[buildingType] ?? undefined
    },

    persistItem: (game: ResourceMapping): void => {},

    removeItem: (iriSaveGame: JsonLdIri): void => {},
  })
