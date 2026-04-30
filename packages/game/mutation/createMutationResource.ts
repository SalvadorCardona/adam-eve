import {
  BaseGameResource,
  createResourceGame,
} from "@/packages/game/BaseGameResource"
import { MutationResourceInterface } from "@/packages/game/mutation/MutationResourceInterface"

export function createMutationResource(
  resource: Partial<BaseGameResource> & Partial<MutationResourceInterface>,
): MutationResourceInterface {
  const meta: Partial<MutationResourceInterface> = {
    "@type": "mutation",
    ...resource,
  }
  return createResourceGame(meta) as MutationResourceInterface
}
