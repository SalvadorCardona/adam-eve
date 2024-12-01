import {
  BaseJsonLdInterface,
  jsonLdFactory,
  JsonTypedLdInterface,
} from "@/packages/utils/jsonLd/jsonLd"

export interface RessourceInterface extends BaseJsonLdInterface {
  quantity: number
}

export interface RessourceMetadataInterface extends JsonTypedLdInterface {
  factory: (payload: {
    ressource: Partial<RessourceInterface>
  }) => RessourceInterface
}

export function ressourceFactory(payload: {
  ressource: Partial<RessourceInterface>
}): RessourceInterface {
  // @ts-ignore
  const type: string = this["@type"] ? this["@type"] : "unkwon"

  return jsonLdFactory<RessourceInterface>(type, {
    quantity: 0,
    ...payload.ressource,
  })
}
