import imageSource from "./house.glb?url"
import imageIcon from "./icon.png?url"
import { entityMedataFactory } from "@/src/game/entity/EntityMedataFactory"
import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"
import EntityInterface from "@/src/game/entity/EntityInterface"
import { woodRessourceMetadata } from "@/src/game/inventory/app/wood/woodRessource"

export const houseEntityMetaData: EntityMetaDataInterface = entityMedataFactory({
  asset: {
    model3d: imageSource,
    icon: imageIcon,
  },
  ["@type"]: "entity/building/house",
  defaultEntity: () => {
    const entity: Partial<EntityInterface> = {
      ressourceNeeded: {
        [woodRessourceMetadata["@type"]]: woodRessourceMetadata.factory({
          quantity: 5,
        }),
      },
      speed: 0.1,
      life: 50,
      size: {
        x: 2,
        y: 2,
        z: 2,
      },
      scale: {
        x: 0.3,
        y: 0.3,
        z: 0.3,
      },
    }

    return entity
  },
})
