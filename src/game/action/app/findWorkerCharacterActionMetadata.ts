import { jsonLdFactory } from "@/src/utils/jsonLd/jsonLd"
import { ActionGameMetadataInterface } from "@/src/game/action/ActionGameMetadataInterface"

enum State {
  GoToTree = "GoToTree",
}

interface FindWorkerData {
  state: State
}

export const findWorkerCharacterActionMetadata: ActionGameMetadataInterface<FindWorkerData> =
  {
    ["@type"]: "action/findWorkerCharacter",
    onFrame: ({ action, game }) => {
      const data = action.data

      console.log("ok")
    },
    factory: (payload) => {
      const data: FindWorkerData = {
        state: State.GoToTree,
      }

      return jsonLdFactory(data["@type"], { data })
    },
  }
