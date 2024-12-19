import { useContext } from "react"
import { GameContext, GameContextInterface } from "@/src/UI/provider/GameContext"

export default function useGameContext() {
  return useContext(GameContext) as Required<GameContextInterface>
}
