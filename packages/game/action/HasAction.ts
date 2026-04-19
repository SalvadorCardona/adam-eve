import { ActionableInterface } from "@/packages/game/entity/ActionResourceInterface"

export function hasAction(sujet: ActionableInterface): boolean {
  return !!sujet.actions && Object.keys(sujet.actions).length > 0
}
